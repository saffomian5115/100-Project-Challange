import 'dotenv/config';
import mongoose from 'mongoose';
import User from './models/User.js';
import Car from './models/Car.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/car-market';

const SEED_USER = {
  name: 'CarMarket Demo',
  email: 'demo@carmarket.com',
  password: 'demo123',
  phone: '+92 300 1234567',
  role: 'seller',
};

const SEED_ADMIN = {
  name: 'Admin',
  email: 'admin@carmarket.com',
  password: 'admin123',
  phone: '+92 300 9876543',
  role: 'admin',
};

const SEED_CARS = [
  {
    title: '2022 Toyota Corolla Grande 1.6',
    description: 'Toyota Corolla Grande 1.6 in pristine condition with only 25,000 km. First owner with complete service history. Accident-free vehicle with all original parts. Fuel-efficient engine providing excellent mileage in city conditions. Features include power windows, air conditioning, and alloy wheels.',
    brand: 'Toyota',
    model: 'Corolla Grande',
    year: 2022,
    price: 4800000,
    mileage: 25000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'Used',
    location: 'Karachi, Sindh'
  },
  {
    title: '2021 Honda City 1.5 i-VTEC',
    description: 'Honda City 1.5 i-VTEC Aspire variant in immaculate condition. Single owner with proper maintenance records. Advanced safety features including ABS and airbags. Comfortable interior with premium fabric seats. Excellent fuel economy perfect for city commuting.',
    brand: 'Honda',
    model: 'City',
    year: 2021,
    price: 4200000,
    mileage: 32000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'Used',
    location: 'Lahore, Punjab'
  },
  {
    title: '2023 Suzuki Alto VXL',
    description: 'Brand new Suzuki Alto VXL 2023 model with zero mileage. Complete factory warranty available. Most fuel-efficient car in its category with modern features. Perfect for students and small families. Compact size ideal for city parking and narrow roads.',
    brand: 'Suzuki',
    model: 'Alto',
    year: 2023,
    price: 2200000,
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'Manual',
    condition: 'New',
    location: 'Islamabad'
  },
  {
    title: '2020 Toyota Fortuner 4x4',
    description: 'Toyota Fortuner 4x4 diesel variant in excellent condition. Powerful 2.8L engine with automatic transmission. Well-maintained with regular service history. Spacious 7-seater perfect for family trips. All-terrain capability suitable for Pakistani roads.',
    brand: 'Toyota',
    model: 'Fortuner',
    year: 2020,
    price: 11500000,
    mileage: 45000,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    condition: 'Used',
    location: 'Rawalpindi, Punjab'
  },
  {
    title: '2022 Suzuki Cultus VXL Auto',
    description: 'Suzuki Cultus VXL automatic transmission with low mileage. Single owner with complete documentation. Modern features including touchscreen infotainment system. Excellent condition inside and out. Reliable engine with good resale value.',
    brand: 'Suzuki',
    model: 'Cultus',
    year: 2022,
    price: 2800000,
    mileage: 18000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'Used',
    location: 'Faisalabad, Punjab'
  },
  {
    title: '2021 Honda Civic 1.5 Turbo',
    description: 'Honda Civic 1.5 Turbo Oriel model with premium features. Powerful turbocharged engine with smooth CVT transmission. Loaded with advanced technology and safety features. Maintained at authorized Honda service center. Elegant design with comfortable ride.',
    brand: 'Honda',
    model: 'Civic',
    year: 2021,
    price: 6500000,
    mileage: 28000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'Used',
    location: 'Karachi, Sindh'
  },
  {
    title: '2019 Toyota Hilux Revo V',
    description: 'Toyota Hilux Revo V double cabin pickup in perfect condition. Diesel engine with excellent torque and pulling power. Ideal for both commercial and personal use. Well-maintained with service records available. Durable and reliable for long journeys.',
    brand: 'Toyota',
    model: 'Hilux',
    year: 2019,
    price: 8500000,
    mileage: 60000,
    fuelType: 'Diesel',
    transmission: 'Manual',
    condition: 'Used',
    location: 'Quetta, Balochistan'
  },
  {
    title: '2023 Hyundai Tucson GLS',
    description: 'Hyundai Tucson GLS 2023 model with advanced features. Smartstream engine with excellent performance. Panoramic sunroof and leather seats included. Latest safety features and infotainment system. Perfect blend of luxury and practicality.',
    brand: 'Hyundai',
    model: 'Tucson',
    year: 2023,
    price: 9500000,
    mileage: 5000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'New',
    location: 'Lahore, Punjab'
  },
  {
    title: '2020 Suzuki Swift DLX',
    description: 'Suzuki Swift DLX model with excellent fuel efficiency. Perfect condition with regular maintenance. Compact yet spacious interior design. Easy to drive and park in crowded cities. Reliable engine with low maintenance costs.',
    brand: 'Suzuki',
    model: 'Swift',
    year: 2020,
    price: 2400000,
    mileage: 35000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    condition: 'Used',
    location: 'Peshawar, KPK'
  },
  {
    title: '2021 Toyota Yaris 1.3 ATIV',
    description: 'Toyota Yaris 1.3 ATIV automatic with premium features. Low mileage and single ownership. Advanced safety systems and comfortable seating. Excellent condition with no accidents. Fuel-efficient engine suitable for daily commuting.',
    brand: 'Toyota',
    model: 'Yaris',
    year: 2021,
    price: 3200000,
    mileage: 22000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'Used',
    location: 'Multan, Punjab'
  },
  {
    title: '2018 Honda BR-V i-VTEC',
    description: 'Honda BR-V 7-seater family vehicle in great condition. Well-maintained with service history available. Spacious interior with flexible seating arrangements. Good ground clearance for Pakistani roads. Reliable engine with decent fuel economy.',
    brand: 'Honda',
    model: 'BR-V',
    year: 2018,
    price: 3500000,
    mileage: 55000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    condition: 'Used',
    location: 'Karachi, Sindh'
  },
  {
    title: '2022 Suzuki Wagon R VXL',
    description: 'Suzuki Wagon R VXL tall boy design with spacious interior. Low mileage and excellent condition. Perfect for family use with ample storage space. Easy to drive and park in urban areas. Good fuel economy and low maintenance.',
    brand: 'Suzuki',
    model: 'Wagon R',
    year: 2022,
    price: 2600000,
    mileage: 15000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'Used',
    location: 'Islamabad'
  },
  {
    title: '2020 Toyota Prado VX',
    description: 'Toyota Land Cruiser Prado VX luxury SUV in excellent condition. Full option model with all premium features. Well-maintained at authorized service center. Powerful engine with 4x4 capability. Perfect for both city and off-road driving.',
    brand: 'Toyota',
    model: 'Land Cruiser Prado',
    year: 2020,
    price: 18500000,
    mileage: 40000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'Used',
    location: 'Lahore, Punjab'
  },
  {
    title: '2023 Kia Sportage EX',
    description: 'Kia Sportage EX 2023 model with modern design and features. Brand new with complete factory warranty. Advanced safety features and comfortable interior. Excellent fuel efficiency and smooth driving experience. Perfect family SUV for Pakistani roads.',
    brand: 'Kia',
    model: 'Sportage',
    year: 2023,
    price: 7800000,
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'New',
    location: 'Karachi, Sindh'
  },
  {
    title: '2019 Suzuki Mehran VX',
    description: 'Suzuki Mehran VX in good running condition. Most economical car for daily commuting. Simple mechanics with low maintenance costs. Perfect for students and first-time car buyers. Reliable engine with excellent spare parts availability.',
    brand: 'Suzuki',
    model: 'Mehran',
    year: 2019,
    price: 1200000,
    mileage: 70000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    condition: 'Used',
    location: 'Rawalpindi, Punjab'
  },
  {
    title: '2021 Honda Accord 2.4',
    description: 'Honda Accord 2.4 luxury sedan in pristine condition. Full option model with premium features. Maintained at authorized Honda service center. Smooth driving experience with comfortable ride. Elegant design with advanced technology.',
    brand: 'Honda',
    model: 'Accord',
    year: 2021,
    price: 10500000,
    mileage: 25000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'Used',
    location: 'Islamabad'
  },
  {
    title: '2022 Suzuki Bolan 1300cc',
    description: 'Suzuki Bolan 1300cc commercial vehicle in excellent condition. Perfect for business and family use. Spacious interior with removable seats. Reliable engine with good load capacity. Well-maintained with service history available.',
    brand: 'Suzuki',
    model: 'Bolan',
    year: 2022,
    price: 1800000,
    mileage: 30000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    condition: 'Used',
    location: 'Faisalabad, Punjab'
  },
  {
    title: '2020 Toyota Vitz 1.0',
    description: 'Toyota Vitz imported car in excellent condition. Low mileage and well-maintained. Fuel-efficient 1.0L engine perfect for city driving. Compact size ideal for parking and narrow streets. Reliable Japanese engineering with good resale value.',
    brand: 'Toyota',
    model: 'Vitz',
    year: 2020,
    price: 2800000,
    mileage: 20000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'Used',
    location: 'Lahore, Punjab'
  },
  {
    title: '2023 MG HS 1.5 Turbo',
    description: 'MG HS 1.5 Turbo luxury SUV brand new condition. Latest model with advanced technology features. Premium interior with leather seats and sunroof. Excellent safety ratings and comfortable ride. Perfect combination of style and performance.',
    brand: 'MG',
    model: 'HS',
    year: 2023,
    price: 8800000,
    mileage: 2000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    condition: 'New',
    location: 'Karachi, Sindh'
  },
  {
    title: '2021 Suzuki Jimny 4x4',
    description: 'Suzuki Jimny compact 4x4 in excellent condition. Perfect for off-road adventures and city driving. Low mileage with single ownership. Modern features with retro design appeal. Excellent fuel economy and easy to maneuver.',
    brand: 'Suzuki',
    model: 'Jimny',
    year: 2021,
    price: 5200000,
    mileage: 15000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    condition: 'Used',
    location: 'Islamabad'
  }
];

// Realistic car image URLs (replace with actual hosted images if needed)
const CAR_IMAGES = [
  'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1549927681-0b673b8243ab?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1566474353607-36c7d4b3e3d5?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1579353977829-6c8c6b6b8b0b?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1549927681-0b673b8243ab?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1566474353607-36c7d4b3e3d5?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1579353977829-6c8c6b6b8b0b?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=400&fit=crop'
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');

    let user = await User.findOne({ email: SEED_USER.email });
    if (!user) {
      user = await User.create(SEED_USER);
      console.log('Created seed user:', user.email);
    } else {
      console.log('Seed user already exists:', user.email);
    }

    let adminUser = await User.findOne({ email: SEED_ADMIN.email });
    if (!adminUser) {
      adminUser = await User.create(SEED_ADMIN);
      console.log('Created admin user:', adminUser.email, '(admin@carmarket.com / admin123)');
    } else {
      console.log('Admin user already exists:', adminUser.email);
    }

    const existingCount = await Car.countDocuments({ isActive: true });
    if (existingCount >= 20) {
      console.log('Already have', existingCount, 'cars. Skipping seed.');
    } else {
      const carsToCreate = SEED_CARS.slice(0, 20 - existingCount).map((car, index) => ({
        ...car,
        seller: user._id,
        contactEmail: user.email,
        contactPhone: user.phone,
        images: [CAR_IMAGES[index % CAR_IMAGES.length]],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      await Car.insertMany(carsToCreate);
      console.log('Created', carsToCreate.length, 'cars. Total active:', await Car.countDocuments({ isActive: true }));
    }
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();