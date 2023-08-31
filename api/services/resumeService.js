const { resumeDao } = require("../models");

const getAllResumes = async (user) => {
  return await resumeDao.getAllResumes(user.id);
};

const createResume = async (
  userId,
  birthday,
  phoneNumber,
  title,
  display,
  githubUrl,
  notionUrl,
  blogUrl
) => {
  return await resumeDao.createResume(
    userId,
    birthday,
    phoneNumber,
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

const updateResume = async (
  resumeId,
  userId,
  birthday,
  phoneNumber,
  title,
  display,
  githubUrl,
  notionUrl,
  blogUrl
) => {
  return await resumeDao.updateResume(
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
};

const updateEducation = async (resumeId, educations) => {
  return await resumeDao.updateEducation(resumeId, educations);
};

const updateCareer = async (resumeId, careers) => {
  return await resumeDao.updateCareer(resumeId, careers);
};

const updateProject = async (resumeId, projects) => {
  return await resumeDao.updateProject(resumeId, projects);
};

const updateAddFile = async (resumeId, addfiles) => {
  return await resumeDao.updateAddFile(resumeId, addfiles);
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
  updateResume,
  updateEducation,
  updateCareer,
  updateProject,
  updateAddFile,
  deleteResume,
  deleteAddFile,
};
