CREATE TABLE `donors` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`checkout_session_id` varchar(500),
	`name` varchar(256),
	`email` varchar(256),
	`phone` varchar(11),
	`country` varchar(256),
	`postal_code` varchar(256),
	`address` varchar(500),
	`amount` int,
	`selected_project` varchar(100),
	`is_public` boolean,
	`display_name` varchar(300),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `donors_id` PRIMARY KEY(`id`)
);
