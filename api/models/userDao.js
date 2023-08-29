const dataSource = require("./dataSource");

const createUser = async (
  email,
  username,
  hashedPassword,
  agreement,
  privateDataPeriod
) => {
  try {
    const result = await dataSource.query(
      `
        INSERT INTO users (
          email, 
          username, 
          password,
          agreement,
          private_data_period
        ) VALUES (
          ?,
          ?,
          ?,
          ?,
          ?
        )
      `,
      [email, username, hashedPassword, agreement, privateDataPeriod]
    );

    return result;
  } catch {
    const error = new Error("dataSource Error #createUser");
    error.statusCode = 400;

    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const [result] = await dataSource.query(
      `
        SELECT
          id,
          email,
          username,
          password
        FROM users
        WHERE email = ?
      `,
      [email]
    );

    return result;
  } catch {
    const error = new Error("dataSource Error #getUserByEmail");
    error.statusCode = 400;

    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const [result] = await dataSource.query(
      `
        SELECT 
          id,
          email,
          username,
          password
          FROM users
          WHERE id = ?
      `,
      [id]
    );

    return result;
  } catch {
    const error = new Error("dataSource Error #getUserById");
    error.statusCode = 400;

    throw error;
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};
