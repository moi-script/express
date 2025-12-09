
// Think of Mongoose as "The Translator."
// You speak: JavaScript Objects.
// Database speaks: BSON (Binary JSON).
// Mongoose: Translates between the two and enforces rules (Schemas).



// the package
// npm install mongoose dotenv



// The Secret Keeper (.env)
// # .env file
// PORT=3000
// MONGO_URI=


// The Connector

// src/config/db.js
// const mongoose = require('mongoose');

// mongoose instead of MongoClient from mongoDb
const connectDB = async () => {
  try {
    // 1. Attempt to connect
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // 2. Log success (cyan color for visibility is a nice touch if you use 'colors' package, but plain text works)
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // 3. Handle failure
    console.error(`❌ Error: ${error.message}`);
    process.exit(1); // Stop the server if DB fails. No point running without it.
  }
};

// module.exports = connectDB;




//: The Entry Point (server.js or app.js)

// server.js
require('dotenv').config(); // 1. Load the secrets FIRST
const express = require('express');
const connectDB = require('./src/config/db'); // 2. Import the connector

const app = express();

// 3. Connect to Database
connectDB();

// ... your middleware and routes ...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


