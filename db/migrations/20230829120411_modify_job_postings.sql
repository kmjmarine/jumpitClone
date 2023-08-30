-- migrate:up
USE JUMPIT;
ALTER TABLE job_postings
ADD job_types_ids varchar(1000) NOT NULL;
-- migrate:down

