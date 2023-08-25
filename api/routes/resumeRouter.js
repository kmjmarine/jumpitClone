const express = require("express");

const { resumeController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

const router = express.Router();
router.get("", loginRequired, resumeController.getAllResumes);
router.post("", loginRequired, resumeController.createResume);

module.exports = router;
