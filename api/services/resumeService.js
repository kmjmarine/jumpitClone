const { resumeDao } = require("../models");

const getAllResumes = async (user) => {
  return await resumeDao.getAllResumes(user.id);
};

const createResume = async (
  userId,
  title,
  display,
  githubUrl,
  notionUrl,
  blogUrl
) => {
  return await resumeDao.createResume(
    userId,
    title,
    display,
    githubUrl,
    notionUrl,
    blogUrl
  );
};

const getSingleResume = async (user, resumeId) => {
  return await resumeDao.getSingleResume(user.id, resumeId);
};

const createEducation = async (resumeId, educations) => {
  return await resumeDao.createEducation(resumeId, educations);
};

const createCareer = async (resumeId, careers) => {
  return await resumeDao.createCareer(resumeId, careers);
};

const createProject = async (resumeId, projects) => {
  return await resumeDao.createProject(resumeId, projects);
};

const createAddFile = async (resumeId, addfiles) => {
  return await resumeDao.createAddFile(resumeId, addfiles);
};

const deleteResume = async (userId, resumeId) => {
  return await resumeDao.deleteResume(userId, resumeId);
};

const deleteAddFile = async (resumeId, addfiles) => {
  return await resumeDao.deleteAddFile(resumeId, addfiles);
};

module.exports = {
  getAllResumes,
  getSingleResume,
  createResume,
  createEducation,
  createCareer,
  createProject,
  createAddFile,
  deleteResume,
  deleteAddFile,
};
