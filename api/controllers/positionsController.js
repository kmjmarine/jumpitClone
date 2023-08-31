const { positionsService } = require("../services");
const { catchAsync } = require("../utils/error");

const getDynamicJobPage = catchAsync(async (req, res) => {
  const jobCategories = req.query.jobCategory;
  const ordering = req.query.sort;

  const jobTypes = await positionsService.getAllJobTypes();
  const jobPostings = await positionsService.getDynamicJobPage(
    jobCategories,
    ordering
  );

  res.status(200).json({ jobTypes: jobTypes, jobPostings: jobPostings });
});

const getJobPostingDetail = catchAsync(async (req, res) => {
  const { jobpostingId } = req.params;

  const jobPosingDetail = await positionsService.getJobPostingDetail(
    jobpostingId
  );

  res.status(200).json({ data: jobPosingDetail });
});

module.exports = {
  getJobPostingDetail,
  getDynamicJobPage,
};
