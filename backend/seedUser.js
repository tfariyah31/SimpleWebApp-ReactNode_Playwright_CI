// backend/seedUsers.js
const mongoose = require('mongoose');
const User = require('./models/User'); 


const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    

    await User.create([
      {
        name : 'usera',
        username: 'User A',
        email : 'usera@gmail.com',
        password: 'password',
      },
    ]);

    console.log('User seeded');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seed();
