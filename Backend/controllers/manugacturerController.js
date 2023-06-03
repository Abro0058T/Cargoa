const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");

exports.registerManufacturer = async (req, res, next) => {
  const { name, email, password, address } = req.body;
  const manufacturer = await User.create({
    name,
    password,
    email,
    address,
    type: "manufacturer",
    messages: ["hello"],
  });
  console.log(manufacturer);
  res.status(200).json({
    success: true,
    message: "Registered",
  });
};

exports.loginManufacturer = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return next(new ErrorHandler(
 "Please enter correct email or password",
 400,
    ))
  }
  console.log("i am here loginmanufacturercontroller");
  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  if (!user) {
    return next(new ErrorHandler(  "Invalid Email or Password",401 ));
  }
  if (user.type != "manufacturer") {
    return next(new ErrorHandler( "No such manufacturer exist ",  401 ));
  }
  if (password != user.password) {
    return next( new ErrorHandler ( "Invalid Email or password",  401 ));
  }

  res.status(200).json({
    success: true,
    user,
  });
};

exports.getMessages = async (req, res, next) => {
  //   const { _id } = req.user;
  //   console.log(req.body.user._id)
  const user = await User.findById(req.body.user._id);
  res.status(200).json({
    success: true,
    message: user.messages,
  });
};

exports.sendMessage = async (req, res, next) => {
  const { to, order, user } = req.body;

  const sender = await User.findOneAndUpdate(
    { name: to },
    { $push: { messages: order } }
  );
  await User.findOneAndUpdate({ name: user }, { $push: { messages: order } });
  if (sender == null) {
    res.status(200).json({
      success: true,
      message: "Please enter correct name of transporter",
    });
  }
  res.status(200).json({
    success: true,
  });
};

//Need to test this
exports.getMessageDetails = async (req, res, next) => {
  const { orderID, id } = req.body;
  const user = await User.findById(req.body.user._id);
  const messageDetails = user.messages.filter((message) => {
    message.orderID == orderID;
  });
  res.status(200).json({
    success: true,
    messageDetails,
  });
};
//9953059226
