CREATE TABLE `donors` (
	`donor_id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`donor_external_id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(15) NOT NULL,
	`country_code` varchar(2) NOT NULL,
	`postal_code` varchar(10) NOT NULL,
	`address` varchar(255) NOT NULL,
	`is_public` tinyint unsigned NOT NULL DEFAULT 0,
	`display_name` varchar(255),
	`corporate_no` varchar(20),
	`message` text,
	`stripe_webhook_customer_object` json,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `donors_donor_id` PRIMARY KEY(`donor_id`),
	CONSTRAINT `donors_donor_external_id_unique` UNIQUE(`donor_external_id`),
	CONSTRAINT `donors_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `transaction` (
	`transaction_id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`donation_id` varchar(15) NOT NULL,
	`donor_id` bigint unsigned NOT NULL,
	`donor_external_id` varchar(36) NOT NULL,
	`donation_project` varchar(50) NOT NULL,
	`amount` int NOT NULL,
	`currency` varchar(3) NOT NULL,
	`type` varchar(10) NOT NULL,
	`is_cancelled` tinyint DEFAULT 0,
	`tax_deduction_certificate_url` varchar(1023) NOT NULL,
	`stript_webhook_object` json NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `transaction_transaction_id` PRIMARY KEY(`transaction_id`),
	CONSTRAINT `transaction_donation_id_unique` UNIQUE(`donation_id`)
);
--> statement-breakpoint
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_donor_id_donors_donor_id_fk` FOREIGN KEY (`donor_id`) REFERENCES `donors`(`donor_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `donor_external_id_idx` ON `donors` (`donor_external_id`);--> statement-breakpoint
CREATE INDEX `donor_id_idx` ON `transaction` (`donor_id`);--> statement-breakpoint
CREATE INDEX `donation_id_idx` ON `transaction` (`donation_id`);