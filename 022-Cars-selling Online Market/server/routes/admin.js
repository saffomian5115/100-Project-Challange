import express from 'express';
import User from '../models/User.js';
import Car from '../models/Car.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.use(protect, admin);

// GET /api/admin/users - list all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 }).lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// PATCH /api/admin/users/:id/freeze - freeze/unfreeze user
router.patch('/users/:id/freeze', async (req, res) => {
  try {
    const target = await User.findById(req.params.id);
    if (!target) return res.status(404).json({ message: 'User not found' });
    if (target.role === 'admin') return res.status(403).json({ message: 'Cannot freeze admin' });
    target.isFrozen = !target.isFrozen;
    await target.save();
    const user = await User.findById(target._id).select('-password').lean();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// DELETE /api/admin/users/:id - delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const target = await User.findById(req.params.id);
    if (!target) return res.status(404).json({ message: 'User not found' });
    if (target.role === 'admin') return res.status(403).json({ message: 'Cannot delete admin' });
    await User.findByIdAndDelete(req.params.id);
    await Car.updateMany({ seller: req.params.id }, { isActive: false });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// PATCH /api/admin/users/:id - modify user (name, email, phone, role)
router.patch('/users/:id', async (req, res) => {
  try {
    const target = await User.findById(req.params.id);
    if (!target) return res.status(404).json({ message: 'User not found' });
    const { name, email, phone, role } = req.body;
    if (name !== undefined) target.name = name;
    if (email !== undefined) target.email = email;
    if (phone !== undefined) target.phone = phone;
    if (role !== undefined && role !== 'admin') target.role = role;
    await target.save();
    const user = await User.findById(target._id).select('-password').lean();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// GET /api/admin/cars - list all cars (including inactive)
router.get('/cars', async (req, res) => {
  try {
    const cars = await Car.find({}).populate('seller', 'name email phone').sort({ createdAt: -1 }).lean();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// PATCH /api/admin/cars/:id - modify any car
router.patch('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    const allowed = ['title', 'description', 'brand', 'model', 'year', 'price', 'mileage', 'fuelType', 'transmission', 'condition', 'location', 'isActive'];
    for (const key of allowed) {
      if (req.body[key] !== undefined) car[key] = req.body[key];
    }
    await car.save();
    const updated = await Car.findById(car._id).populate('seller', 'name email phone').lean();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// DELETE /api/admin/cars/:id - deactivate car (admin)
router.delete('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    car.isActive = false;
    await car.save();
    res.json({ message: 'Car deactivated' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

export default router;
