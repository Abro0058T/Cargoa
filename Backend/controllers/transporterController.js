const User = require("../models/userModel");

exports.registerTransporter = async (req, res, next) => {
  const { name, email, password, address } = req.body;
  const manufacturer = await User.create({
    name,
    password,
    email,
    address,
    type: "transporter",
    messages: ["hello"],
  });
  console.log(manufacturer);
  res.status(200).json({
    success: true,
    message: "Registered",
  });
};

exports.loginTransporter = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "Please enter correct email or password",
    });
  }
  const user = await User.findOne({ email }).select("+password");
  console.log(user)
  if (!user) {
    res.status(401).json({
      success: true,
      message: "Invalid Email or Password",
    });
  }
  if (password != user.password) {
    if (user.type != "transporter") {
      [
        res.status(401).json({
          success: true,
          message: "No such transporter exist ",
        }),
      ];
    }
    res.status(401).json({
      success: true,
      message: "Invalid Email or password",
    });
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
  const { price ,description,from,orderID  } = req.body;

  const sender = await User.findOne(
    { name: from }
  );
  const order=sender.messages.filter((messages)=>messages.orderID==orderID)
  const transporter={price:price,description:description}
  const update=await User.findOneAndUpdate({name:from},{})
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
// test> db.data.updateOne(

// 	// $elemMatch finds docs containing an array with a matching element
// 	{
// 		"trees": { "$elemMatch": { "poken": 5 }}
// 	},

// 	// Positional operator $ is a placeholder for the first matching array element
// 	{
// 		"$set": { "trees.$.poken": 7 }
// 	}
// );
// {

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
