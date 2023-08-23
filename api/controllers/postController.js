const { postService } = require("../services");
const { catchAsync } = require("../utils/error");

const getAllPosts = catchAsync(async (req, res) => {
  const user = req.user;

  const posts = await postService.getAllPosts(user);

  res.status(200).json({ data: posts });
});

const getSinglePost = catchAsync(async (req, res) => {
  const user = req.user;
  const { postId } = req.params;

  const posts = await postService.getSinglePost(user, postId);

  res.status(200).json({ data: posts });
});

const getPosts = catchAsync(async (req, res) => {
  const user = req.user;

  const posts = await postService.getPostsByUser(user);

  res.status(200).json({ data: posts });
});

const createPost = catchAsync(async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;

  if (!content) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;

    throw error;
  }

  const insertId = await postService.createPost(content, userId);

  res.status(201).json({ insertId });
});

const updatePost = catchAsync(async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;
  const userId = req.user.id;

  const post = await postService.updatePost(content, userId, postId);

  res.status(200).json({ post });
});

const deletePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  await postService.deletePost(postId, userId);

  res.status(204).send();
});

module.exports = {
  getAllPosts,
  getPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
};
