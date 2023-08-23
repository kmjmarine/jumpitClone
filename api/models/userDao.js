const dataSource = require("./dataSource");

const createUser = async (
  email,
  username,
  hashedPassword,
  agreement1,
  agreement2,
  agreement3,
  agreement4,
  privateDataPeriod
) => {
  try {
    const result = await dataSource.query(
      `
        INSERT INTO users (
          email, 
          username, 
          password,
          agreement1,
          agreement2,
          agreement3,
          agreement4,
          private_data_period
        ) VALUES (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?
        )
      `,
      [
        email,
        username,
        hashedPassword,
        agreement1,
        agreement2,
        agreement3,
        agreement4,
        privateDataPeriod,
      ]
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
          nickname,
          email,
          password,
          profile_image AS profileImage
          FROM users
          WHERE id = ?
      `,
      [id]
    );

    return result;
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};
