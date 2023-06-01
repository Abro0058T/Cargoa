const User = require("../models/userModel");

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
  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "Please enter correct email or password",
    });
  }
  const user = await User.findOne({ email }).select("+password");
  if (user.type != "manufacturer") {
    [
      res.status(401).json({
        success: true,
        message: "No such manufacturer exist ",
      }),
    ];
  }
  if (!user) {
    res.status(401).json({
      success: true,
      message: "Invalid Email or Password",
    });
  }
  if (password != user.password) {
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
    const {to,order,user}=req.body

    const sender=await User.findOneAndUpdate({name:to},{$push:{messages:order}})
    await User.findOneAndUpdate({name:user},{$push:{messages:order}})
    if(sender==null){
        res.status(200).json({
            success:true,
            message:"Please enter correct name of transporter"
        })
    }
    res.status(200).json({
    success: true,
  });
};

//Need to test this 
exports.getMessageDetails=async (req,res,next)=>{
  const {orderID,id}=req.body
  const user = await User.findById(req.body.user._id);
  const messageDetails= user.messages.filter((message)=>{
    message.orderID==orderID
  })
  res.status(200).json({
    success:true,
    messageDetails
  })
}
//9953059226