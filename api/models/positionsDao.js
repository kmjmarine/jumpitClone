const dataSource = require("./dataSource");

const getAllJobTypes = async () => {
  try {
    const data = await dataSource.query(
      `
      SELECT 
      ordering AS jobTypeId,
      title AS jobTypeTitle
      FROM job_types
      ORDER BY ordering ASC
     `
    );
    return data;
  } catch {
    const error = new Error("dataSource Error #getAllJobTypes");
    error.statusCode = 400;

    throw error;
  }
};

const getAllJobPostings = async () => {
  try {
    const data = await dataSource.query(
      `
      SELECT 
      j.id AS jobpostingId,
      c.name AS companyName,
      c.image AS companyImage,
      j.title AS jobPostingTitle,
      j.career,
      j.work_area AS workArea
      FROM job_postings j LEFT JOIN companies c 
      ON j.company_id = c.id
      ORDER BY j.id DESC
     `
    );
    return data;
  } catch {
    const error = new Error("dataSource Error #getAllJobPostings");
    error.statusCode = 400;

    throw error;
  }
};

const getJobPostingDetail = async (jobpostingId) => {
  try {
    const data = await dataSource.query(
      `
        SELECT j.id AS jobPostingId,
        j.title,
        c.name AS companyName,
        j.role,
        j.qualifications,
        j.preffered_skills AS prefferdSkills,
        j.benefits,
        j.career, 
        j.education,
        j.deadline,
        j.work_area AS workArea,
        c.image AS companyImage
        FROM job_postings j LEFT JOIN companies c
        ON j.company_id = c.id
        WHERE j.id = ?
        ORDER BY j.company_id, c.id;
      `,
      [jobpostingId]
    );
    return data;
  } catch {
    const error = new Error("dataSource Error #getJobPostingDetail");
    error.statusCode = 400;

    throw error;
  }
};

const updateJobPostingHits = async (jobpostingId) => {
  try {
    const data = await dataSource.query(
      `
      UPDATE job_postings SET hits = hits + 1 WHERE id = ?;
      `,
      [jobpostingId]
    );
    return data;
  } catch {
    const error = new Error("dataSource Error #updateJobPostingHits");
    error.statusCode = 400;

    throw error;
  }
};

module.exports = {
  getAllJobTypes,
  getAllJobPostings,
  getJobPostingDetail,
  updateJobPostingHits,
};
