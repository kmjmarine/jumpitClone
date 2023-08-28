const { resumeDao } = require("../models");

const getAllResumes = async (user) => {
  return await resumeDao.getAllResumes(user.id);
};

const createResume = async (userId, display, githubUrl, notionUrl, blogUrl) => {
  return await resumeDao.createResume(
    userId,
    display,
    githubUrl,
    notionUrl,
    blogUrl
  );
};

const createEducation = async (resumeId, educations) => {
  return await resumeDao.createEducation(resumeId, educations);
};

module.exports = {
  getAllResumes,
  createResume,
  createEducation,
};
