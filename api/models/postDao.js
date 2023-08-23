const dataSource = require('./dataSource');

const getAllPosts = async (userId) => {
  try {
    const data =  await dataSource.query(
      `
      SELECT
        t.id AS postId,
        u.nickname AS userName,
        u.profile_image AS profileImage,
        t.content,
        EXISTS (SELECT 1 FROM likes l WHERE l.user_id = ? AND l.thread_id = t.id) AS isLiked,
        COALESCE(c.likeCount, 0) AS likeCount,
        t.updated_at AS createdAt,
        CASE WHEN u.id = ? THEN 1 ELSE 0 END AS isMyPost
      FROM threads t
      LEFT JOIN users u ON t.user_id = u.id
      LEFT JOIN likes l ON l.thread_id = t.id AND l.user_id = u.id
      LEFT JOIN (
          SELECT thread_id, COUNT(thread_id) AS likeCount FROM likes GROUP BY thread_id
      ) c ON c.thread_id = t.id
      ORDER BY t.id DESC;
     `,
     [ userId, userId ]
  );
    return data
  } catch {
    const error = new Error('dataSource Error');
    error.statusCode = 400;

    throw error;
  }
};

const getAllPostsByUserId = async (userId) => {
  try {
    const results = await dataSource.query(
      `
      SELECT
        t.id AS postId,
        u.nickname AS userName,
        u.profile_image AS profileImage,
        u.id = ? AS isMyPost,
        t.content,
        EXISTS (SELECT 1 FROM likes l WHERE l.user_id = ? AND l.thread_id = t.id) AS isLiked,
        CAST(COALESCE(c.likeCount, 0) AS UNSIGNED) AS likeCount,
        CAST(COALESCE(cc.commentsCount, 0) AS UNSIGNED) AS commentsCount,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'commentId', cm.id,
                'userName', cu.nickname,
                'comment', cm.content,
                'isMyReply', CAST(CASE WHEN cu.id = ? THEN 1 ELSE 0 END AS UNSIGNED),
                'createdAt', cm.created_at
            )
        ) AS comments,
        t.created_at AS createdAt
      FROM threads AS t
      JOIN users AS u ON t.user_id = u.id
      LEFT JOIN likes l ON l.thread_id = t.id AND l.user_id = u.id
      LEFT JOIN (
          SELECT thread_id, COUNT(thread_id) AS likeCount FROM likes GROUP BY thread_id
      ) AS c ON c.thread_id = t.id
      LEFT JOIN (
          SELECT thread_id, COUNT(thread_id) AS commentsCount FROM comments GROUP BY thread_id
      ) AS cc ON cc.thread_id = t.id
      LEFT JOIN comments AS cm ON t.id = cm.thread_id
      JOIN users AS cu ON cm.user_id = cu.id
      GROUP BY t.id;
      `,
      [userId, userId, userId]
    );

    return results;
  } catch {
    const error = new Error('dataSource Error');
    error.statusCode = 400;

    throw error;
  }
};

const getPostById = async (userId, postId) => {
  try {
    const [result] = await dataSource.query( 
      `
      SELECT
        t.id,
        t.content,
        u.id userId,
        u.profile_image AS profileImage,
        u.nickname
      FROM threads t
      INNER JOIN users u ON u.id = t.user_id
      WHERE u.id = ? AND t.id = ?
      `,
      [userId, postId]
     );
    return result;
  } catch (err) {
    console.log(err)
    const error = new Error('dataSource Error');
    error.statusCode = 400;
    throw error;
  }
};

const createPost = async (content, userId) => {
  try {
    const result = await dataSource.query(
      `
        INSERT INTO threads (
          content,
          user_id
        ) VALUES (
          ?,
          ?
        )
      `,
      [ content, userId ]
    );

    return result.insertId;
  } catch {
    const error = new Error('dataSource Error');
    error.statusCode = 400;

    throw error;
  }
};

const updatePost = async (content, userId, postId) => {
  try {
    const updatePost = await dataSource.query(
      `
        UPDATE threads
        SET 
          content=?
        WHERE id= ? AND user_id = ?
      `,
      [content, postId, userId]
    );

    const updatedRows = updatePost.affectedRows;

    if (updatedRows !== 1)
      throw new Error('UNEXPECTED_NUMBER_OF_RECORDS_UPDATED');

    const [result] = await dataSource.query(
      `
        SELECT
          t.id,
          t.content,
          u.id userId,
          u.nickname
          FROM threads t
          INNER JOIN users u ON u.id = t.user_id
          WHERE u.id = ? AND t.id = ?
      `,
      [userId, postId]
    );
    return result;
  } catch (err) {
    console.log(err)
    const error = new Error('dataSource Error');
    error.statusCode = 400;

    throw error;
  }
};

const deletePost = async (postId, userId) => {
  try {
    const result = await dataSource.query(
      `
      DELETE FROM threads WHERE id IN (?) AND user_id = ?
    `,
      [postId, userId]
    );

    const deletedRows = result.affectedRows;

    if (deletedRows !== 0 && deletedRows !== 1)
      throw new Error('UNEXPECTED_NUMBER_OF_RECORDS_DELETED');

    return deletedRows;
  } catch {
    const error = new Error('dataSource Error');
    error.statusCode = 400;

    throw error;
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  getAllPostsByUserId,
  createPost,
  updatePost,
  deletePost,
};
