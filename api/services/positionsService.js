const { positionsDao } = require("../models");

const getAllJobTypes = async () => {
  return await positionsDao.getAllJobTypes();
};

const getDynamicJobPage = async (jobCategories, ordering) => {
  return await positionsDao.getDynamicJobPage(jobCategories, ordering);
};

const getJobPostingDetail = async (jobpostingId) => {
  await positionsDao.updateJobPostingHits(jobpostingId);
  return await positionsDao.getJobPostingDetail(jobpostingId);
};

module.exports = {
  getAllJobTypes,
  getDynamicJobPage,
  getJobPostingDetail,
};
