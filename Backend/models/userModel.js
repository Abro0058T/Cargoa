const mongoose=require("mongoose")
const validator=require("validator")
//Registation Schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter the name"],
},
email:{
    type:String,
    require:[true,"Please enter the email"],
    validate:[validator.isEmail,"Please enter a valid email"]
},
password: {
    type: String,
    required: [true, "Please enter your password"],
    select: false,
  },
  address:{
    type:String,
    require:[true,"Please enter the address"]
  },
  type:{
    type:String
  },
  messages:{
    type:Array
  }
})

module.exports=mongoose.model("Manufacturers",userSchema)