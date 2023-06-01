const express = require("express");

const {registerManufacturer,loginManufacturer, getMessages,sendMessage, getMessageDetails} =require("../controllers/manugacturerController.js"
)

const router = express.Router();

router.route("/register").post(registerManufacturer)
router.route("/login").post(loginManufacturer)
router.route("/getMessages").get(getMessages)
router.route("/sendMessage").post(sendMessage)
router.route('/messageDetails/:id').get(getMessageDetails)
module.exports
=router