const express = require("express");
const { positionsController } = require("../controllers");
const router = express.Router();

router.get("", positionsController.getAllJobData);
router.get("/:jobpostingId", positionsController.getJobPostingDetail);
router.get("", positionsController.getSortByNewest);

module.exports = router;
