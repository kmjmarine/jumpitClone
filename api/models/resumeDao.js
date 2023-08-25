const dataSource = require("./dataSource");

const getAllResumes = async (userId) => {
  try {
    const data = await dataSource.query(
      `
      SELECT
        r.id AS resumeId,
        r.title,
        r.display,
        DATE_FORMAT(r.created_at, '%Y.%m.%d') AS createdAt
      FROM resumes r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE u.id = ?
      ORDER BY r.id DESC;
     `,
      [userId]
    );
    return data;
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

const createResume = async (userId, display, githubUrl, notionUrl, blogUrl) => {
  try {
    const createResume = await dataSource.query(
      `
        INSERT INTO resumes (
          user_id,
          display,
          github_url,
          notion_url,
          blog_url
        ) VALUES (
          ?,
          ?,
          ?,
          ?,
          ?
        );
      `,
      [userId, display, githubUrl, notionUrl, blogUrl]
    );

    return createResume.insertId;
  } catch (err) {
    console.log(err);
    const error = new Error("dataSource Error #createResume");
    error.statusCode = 400;

    throw error;
  }
};

const createEducation = async (resuemeId, educations) => {
  const educationsQuery = [];
  educations.forEach((item) => {
    educationsQuery.push(`(
      '${resuemeId}'
      '${item.graduatedYear}',
      '${item.graduatedMonth}',
      '${item.schoolType}',
      '${item.schoolName}',
    )`);
  });

  try {
    const createEducations = await dataSource.query(
      `
        INSERT INTO resume_education (resume_id, graduated_year, graduated_month, school_type, school_name) 
        VALUES 
        ${educationsQuery.join()};
      `
    );

    return createEducations.insertId;
  } catch (err) {
    console.log(err);
    const error = new Error("dataSource Error #createEducation");
    error.statusCode = 400;

    throw error;
  }
};

module.exports = {
  getAllResumes,
  createResume,
  createEducation,
};
