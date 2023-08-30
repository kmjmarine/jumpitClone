-- migrate:up
USE JUMPIT;

UPDATE job_postings SET job_types_ids = "1,2,3" WHERE id = 1;
UPDATE job_postings SET job_types_ids = "3,6,9" WHERE id = 2;
UPDATE job_postings SET job_types_ids = "4,5,10" WHERE id = 3;
UPDATE job_postings SET job_types_ids = "7,13,15" WHERE id = 4;
UPDATE job_postings SET job_types_ids = "8,16,18,19,21" WHERE id = 5;
UPDATE job_postings SET job_types_ids = "4,19" WHERE id = 6;
UPDATE job_postings SET job_types_ids = "6,13,20" WHERE id = 7;
UPDATE job_postings SET job_types_ids = "9,11" WHERE id = 8;
UPDATE job_postings SET job_types_ids = "12,18" WHERE id = 9;
UPDATE job_postings SET job_types_ids = "13,14" WHERE id = 10;
UPDATE job_postings SET job_types_ids = "4,9,21" WHERE id = 11;
UPDATE job_postings SET job_types_ids = "7,8,11" WHERE id = 12;
UPDATE job_postings SET job_types_ids = "8,15,18" WHERE id = 13;
UPDATE job_postings SET job_types_ids = "10,15,16,17,20" WHERE id = 14;
UPDATE job_postings SET job_types_ids = "1,3,5" WHERE id = 15;
UPDATE job_postings SET job_types_ids = "1,2,6,9,11" WHERE id = 16;
UPDATE job_postings SET job_types_ids = "7,8,16" WHERE id = 17;
UPDATE job_postings SET job_types_ids = "3,10,20" WHERE id = 18;
UPDATE job_postings SET job_types_ids = "11,12,17" WHERE id = 19;
UPDATE job_postings SET job_types_ids = "2,5,8" WHERE id = 20;
UPDATE job_postings SET job_types_ids = "5,8,14" WHERE id = 21;


-- migrate:down

