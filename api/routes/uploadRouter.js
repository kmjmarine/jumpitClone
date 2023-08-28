const express = require("express");
const { uploadController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.post("/", loginRequired, uploadController.upload);

module.exports = router;
