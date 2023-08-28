const { positionsService } = require("../services");
const { catchAsync } = require("../utils/error");

const getAllJobData = catchAsync(async (req, res) => {
  const jobTypes = await positionsService.getAllJobTypes();
  const jobPostings = await positionsService.getAllJobPostings();

  res.status(200).json({ jobTypes: jobTypes, jobPostings: jobPostings });
});

const getJobPostingDetail = catchAsync(async (req, res) => {
  const { jobpostingId } = req.params;

  const jobposingdetail = await positionsService.getJobPostingDetail(
    jobpostingId
  );

  res.status(200).json({ data: jobposingdetail });
});

module.exports = {
  getAllJobData,
  getJobPostingDetail,
};
