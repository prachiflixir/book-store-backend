const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const config = require("./config/config");
const upload = require("express-fileupload");
// require('dotenv').config();


// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(upload());

app.use(bodyParser.urlencoded({
  limit: "500mb",
  extended: true
}));
app.use(bodyParser.json({limit: "500mb"}));

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
const appRouter = require("./app/routes/app.routes");
appRouter.initialize(app);
/* Request Middleware */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Headers", "token");
  res.header("Access-Control-Max-Age", "10000");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.set("view engine", "jade");
app.use(express.static(path.join(__dirname, "public")));

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(config.dbUrl)
  .then(() => {
    console.log("Successfully connected to the database:", config.dbUrl);
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
// listen for abc
app.listen(config.serverPort, () => {
  console.log("Server is listening on port ", config.serverPort);
});



// // Server Port
// // const PORT = config.serverPort2;

// // // Home route
// // app.get('/hello', (req, res) => {
// //   console.log('sent',req,res)
// //     res.send(`Hello World.!`);
// // });

// // const WA = require('./app/helpers/whatsapp.helper');

// // // Route for WhatsApp
// app.post('/whatsapp', async (req, res) => {
// console.log("req.bodyreq.body",req.body)
//     let message = req.body.message;
//     let senderID = req.body.from;
//     console.log("Receiver msg",req.body.Body);
//     console.log("message8",message);
//     console.log("senderID7",senderID);

//     // Write a function to send message back to WhatsApp
//     await WA.sendMessage(message, senderID);

// });

// // // Start the server
// // app.listen(PORT, () => {
// //     console.log(`Server is up and running at ${PORT}`);
// // });
module.exports = app;