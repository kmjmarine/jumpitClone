const { resumeService } = require("../services");
const { catchAsync } = require("../utils/error");

const getAllResumes = catchAsync(async (req, res) => {
  const user = req.user;
  const resumes = await resumeService.getAllResumes(user);

  res.status(200).json({ data: resumes });
});

const createResume = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { display, githubUrl, notionUrl, blogUrl } = req.body;
  const { educations } = "";

  if (!userId) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;

    throw error;
  }

  const resumeId = await resumeService.createResume(
    userId,
    display,
    githubUrl,
    notionUrl,
    blogUrl
  );

  const education = {
    graduatedYear: "2023",
    graduatedMonth: "10",
    schoolType: "중학교",
    schoolName: "대전중학교",
  };
  educations.push(education);

  if (resumeId && educations) {
    await resumeService.createEducation(resumeId, educations);
  }

  res.status(201).json({ resumeId });
});

module.exports = {
  getAllResumes,
  createResume,
};
