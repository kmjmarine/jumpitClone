const express = require("express");
const { resumeController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.get("", loginRequired, resumeController.getAllResumes);
router.get("/:resumeId", loginRequired, resumeController.getSingleResume);
router.post("", loginRequired, resumeController.createResume);
router.patch("/:resumeId", loginRequired, resumeController.updateResume);
router.delete("/:resumeId", loginRequired, resumeController.deleteResume);
router.delete(
  "/addfiles/:resumeId/:fileId",
  loginRequired,
  resumeController.deleteAddFile
);

module.exports = router;
