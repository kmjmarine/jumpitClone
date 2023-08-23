const jwt = require("jsonwebtoken");
const { userService } = require("../services");

const loginRequired = async (req, res, next) => {
  try {
    // 1) Getting token and check of it's there
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjkyNTEyMTA2LCJleHAiOjE2OTMyODk3MDZ9.1k7NR3pPquNQMFg5iF_fQ1VUnRFIXurJ2iC9MZJ6CT4"; //req.headers.authorization;

    if (!accessToken) {
      const error = new Error("NEED_ACCESS_TOKEN");
      error.statusCode = 401;

      return res.status(error.statusCode).json({ message: error.message });
    }

    // 2) Verification token
    const payload = await jwt.verify(accessToken, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const user = await userService.getUserById(payload.id);

    if (!user) {
      const error = new Error("USER_DOES_NOT_EXIST");
      error.statusCode = 404;

      return res.status(error.statusCode).json({ message: error.message });
    }

    // 4) GRANT ACCESS
    req.user = user;
    next();
  } catch {
    const error = new Error("INVALID_ACCESS_TOKEN");
    error.statusCode = 401;

    return res.status(error.statusCode).json({ message: error.message });
  }
};
module.exports = { loginRequired };
