const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");

//config
dotenv.config({ path: "config/config.env" });
const cors = require("cors");

const corsOptions = {
  credentials: true,
  ///..other options
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cookieParser());


const transporter=require("./routers/transporterRoute");
const manufacturer=require("./routers/manufactureRoute");

app.use("/transporter/v1",transporter)
app.use("/manufacturer/v1",manufacturer)

module.exports = app;
