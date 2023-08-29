-- migrate:up
CREATE TABLE `resume_education` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `resume_id` INTEGER NOT NULL,
  `graduated_year` CHAR(4) NOT NULL,
  `graduated_month` CHAR(2) NOT NULL,
  `school_type` VARCHAR(50) NOT NULL,
  `school_name` VARCHAR(50) NOT NULL,
  CONSTRAINT resume_education_resume_id_fkey FOREIGN KEY (resume_id) REFERENCES resumes (id)
);

-- migrate:down
DROP TABLE `resume_education`


