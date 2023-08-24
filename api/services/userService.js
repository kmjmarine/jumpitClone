const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { userDao } = require("../models");

const hashPassword = async (plaintextPassword) => {
  const saltRounds = 10;

  return await bcrypt.hash(plaintextPassword, saltRounds);
};

const getUserById = async (id) => {
  return await userDao.getUserById(id);
};

const signUp = async (
  email,
  username,
  password,
  agreement1,
  agreement2,
  agreement3,
  agreement4,
  privateDataPeriod
) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;

  if (!emailRegex.test(email)) {
    const error = new Error("EMAIL_VALIDATION_ERROR");
    error.statusCode = 400;

    throw error;
  }

  if (!passwordRegex.test(password)) {
    const error = new Error("PASSWORD_VALIDATION_ERROR");
    error.statusCode = 400;

    throw error;
  }

  const hashedPassword = await hashPassword(password);
  const createUser = await userDao.createUser(
    email,
    username,
    hashedPassword,
    agreement1,
    agreement2,
    agreement3,
    agreement4,
    privateDataPeriod
  );
  return createUser;
};

const preSignIn = async (email) => {
  const user = await userDao.getUserByEmail(email);

  if (!user) {
    const error = new Error(`INVALID_USER`);
    error.statusCode = 401;

    throw error;
  }

  return email;
};

const signIn = async (email, password) => {
  const user = await userDao.getUserByEmail(email);

  if (!user) {
    const error = new Error("INVALID_USER");
    error.statusCode = 401;

    throw error;
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    const error = new Error("INVALID_USER");
    error.statusCode = 401;

    throw error;
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return accessToken;
};

module.exports = {
  signUp,
  signIn,
  preSignIn,
  getUserById,
};
