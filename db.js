const mongoose = require("mongoose");

// import .env configuration.
require('dotenv').config();

// database for live server
const mongoURI = process.env.MONGODB_URL; 

//Define the mongodb connection url.  //local database created data eith your ndatabase name.
//const mongoURI = process.env.MONGODB_URL_LOCAL;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

    const db = mongoose.connection;

  db.on('connected', () =>{
    console.log("connected to MongoDB Server");
  })

  db.on('error', (err) =>{
    console.log("MongoDB connection error:",err);
  })

  db.on('disconnected', () =>{
    console.log("MongoDB Disconnected.");
  })

module.exports = db;