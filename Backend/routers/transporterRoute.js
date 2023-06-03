

const express = require("express");
const { registerTransporter, loginTransporter, getMessages, sendMessages, getMessageDetails } = require("../controllers/transporterController");


const router = express.Router();


router.route("/register").post(registerTransporter)
router.route("/login").post(loginTransporter)
router.route("/getMessages").get(getMessages)
// router.route("/sendMessages").post(sendMessages)
router.route("/getMessageDetails").get(getMessageDetails)

module.exports=router