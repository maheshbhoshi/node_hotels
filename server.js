const express = require("express");
const app = express();
// const {getMongoDBConnection}  = require("./db-connection");

const db  = require("./db"); // database connection rrequired.



// // import body parser middlwe ware.
const bodyparser = require('body-parser');
app.use(bodyparser.json());  // req.body


// import the routes files.
const personRoutes = require("./routes/PersonRoutes.js");
// use the routes
app.use('/person',personRoutes);


// import the routes files.
const MenuRoutes = require("./routes/MenuRoutes.js");
// use the routes
app.use('/menu',MenuRoutes);


// sever is started.
app.listen(3000 , () =>{
    console.log('Listening on port 3000');
})
