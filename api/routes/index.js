const express = require("express");
const router = express.Router();

const positionsRouter = require("./positionsRouter");

router.use("/positions", positionsRouter);

module.exports = router;
