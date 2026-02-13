import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Car from '../models/Car.js';
import { protect, optionalAuth } from '../middleware/auth.js';
import { uploadCarImages } from '../middleware/upload.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = express.Router();

const parseCarBody = (body) => {
  const num = (v) => (v === '' || v === undefined ? undefined : Number(v));
  return {
    title: body.title,
    description: body.description,
    brand: body.brand,
    model: body.model,
    year: num(body.year),
    price: num(body.price),
    mileage: num(body.mileage),
    fuelType: body.fuelType,
    transmission: body.transmission,
    condition: body.condition || 'Used',
    location: body.location || '',
    contactEmail: body.contactEmail || '',
    contactPhone: body.contactPhone || '',
  };
};

const getImagePaths = (files) => {
  if (!files || !files.length) return [];
  return files.map((f) => '/uploads/cars/' + path.basename(f.filename));
};

const isMultipart = (req) => (req.headers['content-type'] || '').includes('multipart/form-data');

// GET /api/cars - list all (with optional filters)
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { brand, minPrice, maxPrice, year, fuelType, transmission, search, page = 1, limit = 12 } = req.query;
    const query = { isActive: true };
    if (brand) query.brand = new RegExp(brand, 'i');
    if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };
    if (year) query.year = Number(year);
    if (fuelType) query.fuelType = fuelType;
    if (transmission) query.transmission = transmission;
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { brand: new RegExp(search, 'i') },
        { model: new RegExp(search, 'i') },
      ];
    }
    const skip = (Number(page) - 1) * Number(limit);
    const [cars, total] = await Promise.all([
      Car.find(query).populate('seller', 'name email phone').sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
      Car.countDocuments(query),
    ]);
    res.json({ cars, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// GET /api/cars/featured
router.get('/featured', async (req, res) => {
  try {
    const cars = await Car.find({ isActive: true }).populate('seller', 'name').sort({ createdAt: -1 }).limit(6).lean();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// GET /api/cars/my/listings (protected) - must be before /:id
router.get('/my/listings', protect, async (req, res) => {
  try {
    const cars = await Car.find({ seller: req.user._id, isActive: true }).sort({ createdAt: -1 }).lean();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// GET /api/cars/:id
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('seller', 'name email phone').lean();
    if (!car) return res.status(404).json({ message: 'Car not found' });
    if (!car.isActive) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// POST /api/cars (protected) - accepts JSON or multipart/form-data with images
router.post('/', protect, (req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  if (contentType.includes('multipart/form-data')) {
    uploadCarImages(req, res, (err) => {
      if (err) return res.status(400).json({ message: err.message || 'Upload error' });
      next();
    });
  } else next();
}, async (req, res) => {
  try {
    const body = isMultipart(req)
      ? { ...parseCarBody(req.body), images: getImagePaths(req.files), seller: req.user._id }
      : { ...req.body, seller: req.user._id };
    const car = await Car.create(body);
    const populated = await Car.findById(car._id).populate('seller', 'name email phone');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// PUT /api/cars/:id (protected, owner only) - accepts JSON or multipart with images
router.put('/:id', protect, (req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  if (contentType.includes('multipart/form-data')) {
    uploadCarImages(req, res, (err) => {
      if (err) return res.status(400).json({ message: err.message || 'Upload error' });
      next();
    });
  } else next();
}, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    const isOwner = car.seller.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to edit this car' });
    }
    if (isMultipart(req)) {
      const parsed = parseCarBody(req.body);
      const newPaths = getImagePaths(req.files);
      const existing = (typeof req.body.existingImages === 'string' && req.body.existingImages)
        ? JSON.parse(req.body.existingImages) : (car.images || []);
      Object.assign(car, parsed, { images: [...existing, ...newPaths] });
    } else {
      Object.assign(car, req.body);
    }
    await car.save();
    const updated = await Car.findById(car._id).populate('seller', 'name email phone');
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// DELETE /api/cars/:id (protected, owner only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    const isOwner = car.seller.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this car' });
    }
    car.isActive = false;
    await car.save();
    res.json({ message: 'Car removed' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

export default router;
