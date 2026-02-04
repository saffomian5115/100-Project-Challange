import 'dotenv/config';
import mongoose from 'mongoose';
import User from './models/User.js';
import Car from './models/Car.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/car-market';

const SEED_USER = {
  name: 'CarMarket Demo',
  email: 'demo@carmarket.com',
  password: 'demo123',
  phone: '+1 555-0100',
  role: 'seller',
};

const SEED_CARS = [
  { title: '2022 Toyota Camry SE', description: 'Well maintained sedan, single owner. Full service history.', brand: 'Toyota', model: 'Camry', year: 2022, price: 26500, mileage: 18000, fuelType: 'Petrol', transmission: 'Automatic', condition: 'Used', location: 'New York, NY' },
  { title: '2021 Honda Civic LX', description: 'Fuel efficient and reliable. No accidents.', brand: 'Honda', model: 'Civic', year: 2021, price: 22900, mileage: 24000, fuelType: 'Petrol', transmission: 'Manual', condition: 'Used', location: 'Los Angeles, CA' },
  { title: '2023 Tesla Model 3', description: 'Long range, autopilot. Like new.', brand: 'Tesla', model: 'Model 3', year: 2023, price: 42000, mileage: 5000, fuelType: 'Electric', transmission: 'Automatic', condition: 'Certified', location: 'San Francisco, CA' },
  { title: '2020 Ford F-150 XLT', description: 'Powerful V6, towing package. Great for work or family.', brand: 'Ford', model: 'F-150', year: 2020, price: 38500, mileage: 42000, fuelType: 'Petrol', transmission: 'Automatic', condition: 'Used', location: 'Houston, TX' },
  { title: '2022 BMW 330i', description: 'Luxury sedan, premium package. Sporty and comfortable.', brand: 'BMW', model: '330i', year: 2022, price: 44500, mileage: 12000, fuelType: 'Petrol', transmission: 'Automatic', condition: 'Certified', location: 'Miami, FL' },
  { title: '2021 Chevrolet Malibu', description: 'Spacious midsize sedan. Clean interior.', brand: 'Chevrolet', model: 'Malibu', year: 2021, price: 21500, mileage: 28000, fuelType: 'Petrol', transmission: 'Automatic', condition: 'Used', location: 'Chicago, IL' },
  { title: '2023 Hyundai Tucson Hybrid', description: 'Hybrid SUV, excellent fuel economy. Warranty remaining.', brand: 'Hyundai', model: 'Tucson', year: 2023, price: 35500, mileage: 8000, fuelType: 'Hybrid', transmission: 'Automatic', condition: 'New', location: 'Seattle, WA' },
  { title: '2019 Nissan Altima 2.5 S', description: 'Reliable daily driver. Recently serviced.', brand: 'Nissan', model: 'Altima', year: 2019, price: 18900, mileage: 55000, fuelType: 'Petrol', transmission: 'Automatic', condition: 'Used', location: 'Phoenix, AZ' },
  { title: '2022 Kia Sportage EX', description: 'Compact SUV with plenty of features. One owner.', brand: 'Kia', model: 'Sportage', year: 2022, price: 28900, mileage: 15000, fuelType: 'Petrol', transmission: 'Automatic', condition: 'Used', location: 'Denver, CO' },
  { title: '2020 Mercedes-Benz C300', description: 'Premium sedan, loaded. Immaculate condition.', brand: 'Mercedes-Benz', model: 'C300', year: 2020, price: 38500, mileage: 32000, fuelType: 'Petrol', transmission: 'Automatic', condition: 'Certified', location: 'Boston, MA' },
  { title: '2021 Mazda CX-5 Touring', description: 'Fun to drive SUV. Great safety ratings.', brand: 'Mazda', model: 'CX-5', year: 2021, price: 27800, mileage: 22000, fuelType: 'Petrol', transmission: 'Automatic', condition: 'Used', location: 'Atlanta, GA' },
  { title: '2022 Volkswagen Jetta GLI', description: 'Sporty compact sedan. Manual transmission.', brand: 'Volkswagen', model: 'Jetta', year: 2022, price: 29900, mileage: 14000, fuelType: 'Petrol', transmission: 'Manual', condition: 'Used', location: 'Philadelphia, PA' },
  { title: '2023 Subaru Outback Premium', description: 'AWD wagon. Perfect for adventure. Low miles.', brand: 'Subaru', model: 'Outback', year: 2023, price: 34500, mileage: 6000, fuelType: 'Petrol', transmission: 'Automatic', condition: 'Certified', location: 'Portland, OR' },
  { title: '2019 Jeep Wrangler Unlimited', description: 'Iconic 4x4. Soft top. Ready for trails.', brand: 'Jeep', model: 'Wrangler', year: 2019, price: 36500, mileage: 38000, fuelType: 'Petrol', transmission: 'Manual', condition: 'Used', location: 'Dallas, TX' },
  { title: '2020 Toyota RAV4 Hybrid', description: 'Best-selling hybrid SUV. Very efficient.', brand: 'Toyota', model: 'RAV4', year: 2020, price: 32500, mileage: 35000, fuelType: 'Hybrid', transmission: 'Automatic', condition: 'Used', location: 'Detroit, MI' },
  { title: '2021 Audi A4 Premium', description: 'Quattro AWD. Tech package. Well cared for.', brand: 'Audi', model: 'A4', year: 2021, price: 39500, mileage: 20000, fuelType: 'Petrol', transmission: 'Automatic', condition: 'Certified', location: 'Washington, DC' },
  { title: '2022 Hyundai Ioniq 5', description: 'Electric crossover. Fast charging. Long range.', brand: 'Hyundai', model: 'Ioniq 5', year: 2022, price: 48500, mileage: 9000, fuelType: 'Electric', transmission: 'Automatic', condition: 'Used', location: 'Austin, TX' },
  { title: '2019 Honda CR-V EX', description: 'Practical family SUV. Honda reliability.', brand: 'Honda', model: 'CR-V', year: 2019, price: 26800, mileage: 48000, fuelType: 'Petrol', transmission: 'Automatic', condition: 'Used', location: 'Minneapolis, MN' },
  { title: '2020 Ford Mustang GT', description: 'V8 power. Performance pack. Sounds amazing.', brand: 'Ford', model: 'Mustang', year: 2020, price: 42500, mileage: 25000, fuelType: 'Petrol', transmission: 'Manual', condition: 'Used', location: 'Las Vegas, NV' },
  { title: '2023 Toyota Corolla LE', description: 'Brand new, never titled. Full factory warranty.', brand: 'Toyota', model: 'Corolla', year: 2023, price: 23900, mileage: 0, fuelType: 'Petrol', transmission: 'Automatic', condition: 'New', location: 'Charlotte, NC' },
];

const placeholderImage = (n) => `https://placehold.co/800x400/1a1a2e/eee?text=Car+${n}`;

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

    const existingCount = await Car.countDocuments({ isActive: true });
    if (existingCount >= 20) {
      console.log('Already have', existingCount, 'cars. Skipping seed.');
    } else {

    const toCreate = SEED_CARS.slice(0, 20 - existingCount).map((c, i) => ({
      ...c,
      seller: user._id,
      contactEmail: user.email,
      contactPhone: user.phone,
      images: [placeholderImage(existingCount + i + 1)],
      isActive: true,
    }));

    await Car.insertMany(toCreate);
      console.log('Created', toCreate.length, 'cars. Total active:', await Car.countDocuments({ isActive: true }));
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
