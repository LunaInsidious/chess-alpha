-- CreateTable
CREATE TABLE `users` (
  `user_id` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_to_update` varchar(255) DEFAULT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `user_type` varchar(255) NOT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_users_email` (`email`);
COMMIT;


CREATE TABLE `user_details` (
  `user_detail_id` varchar(30) NOT NULL,
  `user_id` varchar(30) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

ALTER TABLE `user_details`
  ADD PRIMARY KEY (`user_detail_id`),
  ADD KEY `fk_users_user_detail` (`user_id`);

ALTER TABLE `user_details`
  ADD CONSTRAINT `fk_users_user_detail` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;
