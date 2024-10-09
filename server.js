const express = require("express");
const app = express();

// import .env configuration.
require('dotenv').config();
// const {getMongoDBConnection}  = require("./db-connection");


const db  = require("./db"); // database connection rrequired.

// // import body parser middlwe ware.
const bodyparser = require('body-parser');
app.use(bodyparser.json());  // req.body

// PORT ENV file checked 
const PORT = process.env.PORT || 3000;


// import the routes files.
const personRoutes = require("./routes/PersonRoutes.js");
// import the routes files.
const MenuRoutes = require("./routes/MenuRoutes.js");
// use the routes
app.use('/person',personRoutes);
// use the routes
app.use('/menu',MenuRoutes);


// sever is started.
app.listen(PORT , () =>{
    console.log('Listening on port 3000');
})
