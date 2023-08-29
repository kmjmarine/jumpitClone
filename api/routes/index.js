const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const resumeRouter = require("./resumeRouter");
const uploadRouter = require("./uploadRouter");

router.use("/users", userRouter);
router.use("/resumes", resumeRouter);
router.use("/uploads", uploadRouter);

module.exports = router;
