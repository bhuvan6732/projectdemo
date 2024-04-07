const express = require("express");
const router = express.Router();
const controller = require("./../controller/loginController");

router.post("/login", controller.logIn);
router.post("/signUp", controller.signUp);

module.exports = router;
