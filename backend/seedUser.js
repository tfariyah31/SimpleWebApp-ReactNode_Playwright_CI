const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');


dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear existing test users
    await User.deleteMany({ 
      $or: [
        { username: 'usera' },
        { email: 'usera@gmail.com' }
      ]
    });

    // Create user WITHOUT hashing here (let the model's pre-save handle it)
    const user = new User({
      name: 'User A',
      username: 'usera',
      email: 'usera@gmail.com',
      password: 'password' // Will be auto-hashed by pre-save hook
    });

    await user.save(); // This triggers the pre-save hashing

    // Verify the user was created with hashed password
    const dbUser = await User.findOne({ username: 'usera' }).lean();
    if (!dbUser) throw new Error('User not found in database');

    console.log('✅ User seeded successfully');
    console.log('Username:', dbUser.username);
    console.log('Email:', dbUser.email);
    console.log('Password (hashed):', dbUser.password);
    console.log('isBlocked:', dbUser.isBlocked);

    // Verify password can be compared
    const isMatch = await bcrypt.compare('password', dbUser.password);
    console.log('Password comparison test:', isMatch ? '✅ PASS' : '❌ FAIL');

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seed();