const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const resumeRouter = require("./resumeRouter");

router.use("/users", userRouter);
router.use("/resumes", resumeRouter);

module.exports = router;
