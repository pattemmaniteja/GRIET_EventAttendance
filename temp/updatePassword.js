require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Faculty and Club models (adjust based on your schema)
const {Faculty , Club} = require("../models/user.js");

async function updatePasswords() {
    // Update Faculty passwords
    const faculties = await Faculty.find();
    for (let faculty of faculties) {
        const hashedPassword = await bcrypt.hash(faculty.password, 10);
        faculty.password = hashedPassword;
        await faculty.save();
        console.log(`Faculty ${faculty.mail} password updated.`);
    }

    // Update Club passwords
    const clubs = await Club.find();
    for (let club of clubs) {
        const hashedPassword = await bcrypt.hash(club.password, 10);
        club.password = hashedPassword;
        await club.save();
        console.log(`Club ${club.mail} password updated.`);
    }

    console.log("Passwords updated successfully!");
    mongoose.connection.close();
}

// Run the update function
updatePasswords().catch(err => {
    console.error(err);
    mongoose.connection.close();
});
