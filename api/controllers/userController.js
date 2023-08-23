const { userService } = require("../services");
const { catchAsync } = require("../utils/error");

const signUp = catchAsync(async (req, res) => {
  const {
    email,
    username,
    password,
    agreement1,
    agreement2,
    agreement3,
    agreement4,
    privateDataPeriod,
  } = req.body;

  if (!email || !username || !password || !privateDataPeriod) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;

    throw error;
  }

  const createUser = await userService.signUp(
    email,
    username,
    password,
    agreement1,
    agreement2,
    agreement3,
    agreement4,
    privateDataPeriod
  );

  res.status(201).json({ message: "user is created" });
});

const preSignIn = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userService.preSignIn(email);

    res.status(200).json({ message: "user is confirmed" });
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const accessToken = await userService.signIn(email, password);

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

module.exports = {
  signUp,
  preSignIn,
  signIn,
};
