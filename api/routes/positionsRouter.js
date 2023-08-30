const express = require("express");
const { positionsController } = require("../controllers");
const router = express.Router();

router.get("", positionsController.getDynamicJobPage);
router.get("/:jobpostingId", positionsController.getJobPostingDetail);

module.exports = router;
