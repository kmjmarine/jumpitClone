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

const getSingleResume = async (userId, resumeId) => {
  try {
    const result = await dataSource.query(
      `
      SELECT 
        r.id AS resumeId, 
        u.email, 
        u.birthday, 
        u.phone_number, 
        r.title, 
        r.display, 
        r.github_url, 
        r.notion_url, 
        r.blog_url,
        e.resume_education, 
        c.resume_career, 
        p.resume_project, 
        a.resume_addfile
      FROM resumes r INNER JOIN users u ON r.user_id = u.id
      LEFT JOIN (
        SELECT 
          resume_id,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              "graduatedYear", graduated_year, 
              "graduatedMonth", graduated_month, 
              "schoolType", school_type, 
              "schoolName", school_name  
            )  
          ) AS resume_education
        FROM resume_education GROUP BY resume_id
        ) e ON r.id = e.resume_id 
          LEFT JOIN (
        SELECT 
          resume_id,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              "startYear", start_year, 
              "startMonth", start_month, 
              "endYear", end_year, 
              "endMonth", end_month,
                        "companyName", company_name,
                        "division", division,
                        "role", role,
                        "developer", developer
            )  
          ) AS resume_career
        FROM resume_career GROUP BY resume_id
        ) c ON r.id = c.resume_id 
          LEFT JOIN (
        SELECT 
          resume_id,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              "startYear", start_year, 
              "startMonth", start_month, 
              "endYear", end_year, 
              "endMonth", end_month,
                        "projectName", project_name,
                        "repository_link", repository_link
            )  
          ) AS resume_project
        FROM resume_project GROUP BY resume_id
        ) p ON r.id = p.resume_id 
          LEFT JOIN (
        SELECT 
          resume_id,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              "fileId", id,
              "originFilename", origin_file_name, 
              "UploadedFilename", uploaded_file_name, 
              "fileUrl", file_url
            )  
          ) AS resume_addfile
        FROM resume_addfile GROUP BY resume_id
        ) a ON r.id = a.resume_id 
      WHERE r.id = ? AND u.id = ?
      `,
      [resumeId, userId]
    );
    return result;
  } catch {
    const error = new Error("dataSource Error #getSingleResume");
    error.statusCode = 400;
    throw error;
  }
};

const createResume = async (
  userId,
  title,
  display,
  githubUrl,
  notionUrl,
  blogUrl
) => {
  try {
    const createResume = await dataSource.query(
      `
        INSERT INTO resumes (
          user_id,
          title,
          display,
          github_url,
          notion_url,
          blog_url
        ) VALUES (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?
        );
      `,
      [userId, title, display, githubUrl, notionUrl, blogUrl]
    );

    return createResume.insertId;
  } catch (err) {
    console.log(err);
    const error = new Error("dataSource Error #createResume");
    error.statusCode = 400;

    throw error;
  }
};

const createEducation = async (resumeId, educations) => {
  const educationsQueryValues = educations.map((item) => [
    resumeId,
    item.graduatedYear,
    item.graduatedMonth,
    item.schoolType,
    item.schoolName,
  ]);

  try {
    const createEducations = await dataSource.query(
      `
        INSERT INTO resume_education (
          resume_id, 
          graduated_year, 
          graduated_month, 
          school_type, 
          school_name
        ) 
        VALUES 
        ?
      `,
      [educationsQueryValues]
    );

    return createEducations.insertId;
  } catch {
    const error = new Error("dataSource Error #createEducation");
    error.statusCode = 400;

    throw error;
  }
};

const createCareer = async (resumeId, careers) => {
  const careersQueryValues = careers.map((item) => [
    resumeId,
    item.startYear,
    item.startMonth,
    item.endYear,
    item.endMonth,
    item.companyName,
    item.division,
    item.role,
    item.developer,
  ]);

  try {
    const createCareers = await dataSource.query(
      `
        INSERT INTO resume_career (
          resume_id, 
          start_year, 
          start_month, 
          end_year, 
          end_month, 
          company_name, 
          division, 
          role, 
          developer
        ) 
        VALUES 
        ?
      `,
      [careersQueryValues]
    );

    return createCareers.insertId;
  } catch {
    const error = new Error("dataSource Error #createCareer");
    error.statusCode = 400;

    throw error;
  }
};

const createProject = async (resumeId, projects) => {
  const projectsQueryValues = projects.map((item) => [
    resumeId,
    item.startYear,
    item.startMonth,
    item.endYear,
    item.endMonth,
    item.projectName,
    item.repositoryLink,
  ]);

  try {
    const createProjects = await dataSource.query(
      `
        INSERT INTO resume_project (
          resume_id, 
          start_year, 
          start_month, 
          end_year, 
          end_month, 
          project_name, 
          repository_link
        ) 
        VALUES 
        ?
      `,
      [projectsQueryValues]
    );

    return createProjects.insertId;
  } catch {
    const error = new Error("dataSource Error #createProject");
    error.statusCode = 400;

    throw error;
  }
};

const createAddFile = async (resumeId, addfiles) => {
  const addfilesQueryValues = addfiles.map((item) => [
    resumeId,
    item.fileInput,
    item.fileInput,
    `/static/upload/${item.fileInput}`,
  ]);

  try {
    const createAddFiles = await dataSource.query(
      `
        INSERT INTO resume_addfile (
          resume_id, 
          origin_file_name, 
          uploaded_file_name, 
          file_url
        ) 
        VALUES 
        ?
      `,
      [addfilesQueryValues]
    );

    return createAddFiles.insertId;
  } catch {
    const error = new Error("dataSource Error #createAddFile");
    error.statusCode = 400;

    throw error;
  }
};

const deleteResume = async (userId, resumeId) => {
  try {
    const result = await dataSource.query(
      `
      DELETE FROM resumes WHERE user_id = ? AND id = ?
      `,
      [userId, resumeId]
    );

    const deletedRows = result.affectedRows;

    if (deletedRows !== 0 && deletedRows !== 1)
      throw new Error("UNEXPECTED_NUMBER_OF_RECORDS_DELETED");

    return deletedRows;
  } catch {
    const error = new Error("dataSource Error #deleteAddFile");
    error.statusCode = 400;

    throw error;
  }
};

const deleteAddFile = async (resumeId, fileId) => {
  try {
    const result = await dataSource.query(
      `
      DELETE FROM resume_addfile WHERE id = ? AND resume_id = ?
      `,
      [fileId, resumeId]
    );

    const deletedRows = result.affectedRows;

    if (deletedRows !== 0 && deletedRows !== 1)
      throw new Error("UNEXPECTED_NUMBER_OF_RECORDS_DELETED");

    return deletedRows;
  } catch {
    const error = new Error("dataSource Error #deleteAddFile");
    error.statusCode = 400;

    throw error;
  }
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
