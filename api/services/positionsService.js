const { positionsDao } = require("../models");

const getAllJobTypes = async () => {
  return await positionsDao.getAllJobTypes();
};

const getAllJobPostings = async () => {
  return await positionsDao.getAllJobPostings();
};

const getJobPostingDetail = async (jobpostingId) => {
  await positionsDao.updateJobPostingHits(jobpostingId);
  return await positionsDao.getJobPostingDetail(jobpostingId);
};

module.exports = {
  getAllJobTypes,
  getAllJobPostings,
  getJobPostingDetail,
};
