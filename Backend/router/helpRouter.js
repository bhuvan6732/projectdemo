const express = require("express");
const router = express.Router();
const controller = require("./../controller/helpController");
const { verifyToken } = require("../Middleware/Token");
const { upload } = require("../Middleware/footage");

router.post("/", verifyToken, controller.help);
router.post("/upload", upload.single("footage"), controller.upload);

module.exports = router;
