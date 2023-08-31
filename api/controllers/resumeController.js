const { resumeService } = require("../services");
const { catchAsync } = require("../utils/error");

const getAllResumes = catchAsync(async (req, res) => {
  const user = req.user;
  const resumes = await resumeService.getAllResumes(user);

  res.status(200).json({ data: resumes });
});

const getSingleResume = catchAsync(async (req, res) => {
  const user = req.user;
  const { resumeId } = req.params;

  const resume = await resumeService.getSingleResume(user, resumeId);

  res.status(200).json({ data: resume });
});

const createResume = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const {
    birthday,
    phoneNumber,
    title,
    display,
    githubUrl,
    notionUrl,
    blogUrl,
    resumeEducation,
    resumeCareer,
    resumeProject,
    resumeAddFile,
  } = req.body;

  if (!userId) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;

    throw error;
  }

  const resumeId = await resumeService.createResume(
    userId,
    birthday,
    phoneNumber,
    title,
    display,
    githubUrl,
    notionUrl,
    blogUrl
  );

  const createSectionIfDataExists = async (data, createFunction) => {
    if (resumeId && data) {
      await createFunction(resumeId, data);
    }
  };

  await createSectionIfDataExists(
    resumeEducation,
    resumeService.createEducation
  );
  await createSectionIfDataExists(resumeCareer, resumeService.createCareer);
  await createSectionIfDataExists(resumeProject, resumeService.createProject);
  await createSectionIfDataExists(resumeAddFile, resumeService.createAddFile);

  res.status(201).json({ resumeId });
});

const updateResume = catchAsync(async (req, res) => {
  const { resumeId } = req.params;
  const userId = req.user.id;
  const {
    birthday,
    phoneNumber,
    title,
    display,
    githubUrl,
    notionUrl,
    blogUrl,
    resumeEducation,
    resumeCareer,
    resumeProject,
    resumeAddFile,
  } = req.body;

  if (!userId) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;

    throw error;
  }

  await resumeService.updateResume(
    resumeId,
    userId,
    birthday,
    phoneNumber,
    title,
    display,
    githubUrl,
    notionUrl,
    blogUrl
  );

  const updateSectionIfDataExists = async (data, updateFunction) => {
    if (resumeId && data) {
      await updateFunction(resumeId, data);
    }
  };

  await updateSectionIfDataExists(
    resumeEducation,
    resumeService.updateEducation
  );
  await updateSectionIfDataExists(resumeCareer, resumeService.updateCareer);
  await updateSectionIfDataExists(resumeProject, resumeService.updateProject);
  await updateSectionIfDataExists(resumeAddFile, resumeService.updateAddFile);

  res.status(200).json({ resumeId });
});

const deleteResume = catchAsync(async (req, res) => {
  const { resumeId } = req.params;
  const userId = req.user.id;

  await resumeService.deleteResume(userId, resumeId);

  res.status(204).send();
});

const deleteAddFile = catchAsync(async (req, res) => {
  const { resumeId, fileId } = req.params;

  await resumeService.deleteAddFile(resumeId, fileId);

  res.status(204).send();
});

module.exports = {
  getAllResumes,
  getSingleResume,
  createResume,
  updateResume,
  deleteResume,
  deleteAddFile,
};
