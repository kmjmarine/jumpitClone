-- migrate:up
CREATE TABLE `resumes` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL,
  `display` TINYINT NOT NULL DEFAULT false,
  `github_url` VARCHAR(200),
  `notion_url` VARCHAR(200),
  `blog_url` VARCHAR(200),
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT resumes_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id)
);

-- migrate:down
DROP TABLE `resumes`

