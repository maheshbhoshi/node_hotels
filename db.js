const mongoose = require("mongoose");

//Define the mongodb connection url.
const mongoURI = "mongodb://127.0.0.1:27017/hotels"; // created data eith your ndatabase name.

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