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

const getDynamicJobPage = async (jobCategories, ordering) => {
  try {
    let jobTypeQuery = "";
    if (jobCategories != undefined) {
      jobTypeQuery = `WHERE job_type_id IN (${jobCategories})`;
    }

    const orderingSwitch = async (ordering) => {
      switch (ordering) {
        case "reg_dt":
          return `ORDER BY j.created_at DESC`;
        case "popular":
          return `ORDER BY j.hits DESC, j.id DESC`;
        default:
          return `ORDER BY j.id DESC`;
      }
    };
    const orderingQuery = await orderingSwitch(ordering);

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
      INNER JOIN
		  (	
			  SELECT job_posting_id
			  FROM job_posting_job_types ${jobTypeQuery}
        GROUP BY job_posting_id
		  ) jt
      ON jt.job_posting_id = j.id
      ${orderingQuery}     
      `
    );
    return data;
  } catch (err) {
    console.log(err);
    const error = new Error("dataSource Error #getDynamicJobPage");
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
  getDynamicJobPage,
  getAllJobPostings,
  getJobPostingDetail,
  updateJobPostingHits,
};
