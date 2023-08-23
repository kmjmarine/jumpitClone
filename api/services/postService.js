const { postDao } = require('../models');

const getAllPosts = async (user) => {
  return await postDao.getAllPosts(user.id);
};

const getSinglePost= async (user, postId) => {
  return await postDao.getPostById(user.id, postId);
};

const getPostsByUser = async (user) => {
  return await postDao.getAllPostsByUserId(user.id);
};

const createPost = async (content, userId) => {
  return await postDao.createPost(content, userId);
};

const updatePost = async (content, userId, postId) => {
  const post = await postDao.getPostById(postId);

  return await postDao.updatePost(
    content ? content : post.content,
    userId,
    postId
  );
};

const deletePost = async (postId, userId) => {
  return await postDao.deletePost(postId, userId);
};

module.exports = {
  getAllPosts,
  getSinglePost,
  getPostsByUser,
  createPost,
  updatePost,
  deletePost,
};
