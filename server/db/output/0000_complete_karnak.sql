CREATE TABLE `donor` (
	`donor_id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`donor_external_id` varchar(36) NOT NULL,
	`stripe_customer_id` varchar(100) NOT NULL,
	`name` varchar(266) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(15) NOT NULL,
	`country_code` varchar(2) NOT NULL,
	`postal_code` varchar(10) NOT NULL,
	`is_public` tinyint unsigned NOT NULL,
	`display_name` varchar(255),
	`corporate_number` varchar(20),
	`message` text,
	`stripe_customer_object` json,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `donor_donor_id` PRIMARY KEY(`donor_id`),
	CONSTRAINT `donor_donor_external_id_unique` UNIQUE(`donor_external_id`),
	CONSTRAINT `donor_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `subscription` (
	`subscription_id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`subscription` varchar(36) NOT NULL,
	`stripe_subscription` varchar(100) NOT NULL,
	`donor_id` bigint unsigned NOT NULL,
	`donor_external_id` varchar(36) NOT NULL,
	`donation_project` varchar(50) NOT NULL,
	`amount` int unsigned NOT NULL,
	`currency` varchar(3) NOT NULL,
	`is_cancelled` tinyint unsigned NOT NULL DEFAULT 0,
	`stripe_subscription_object` json,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscription_subscription_id` PRIMARY KEY(`subscription_id`),
	CONSTRAINT `subscription_subscription_unique` UNIQUE(`subscription`),
	CONSTRAINT `subscription_stripe_subscription_unique` UNIQUE(`stripe_subscription`)
);
--> statement-breakpoint
CREATE TABLE `transaction` (
	`transaction_id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`donation_id` varchar(15) NOT NULL,
	`donor_id` bigint unsigned NOT NULL,
	`donor_external_id` varchar(36) NOT NULL,
	`subscription_external_id` varchar(36),
	`stripe_subscription_id` varchar(100) NOT NULL,
	`donation_project` varchar(50) NOT NULL,
	`amount` int unsigned NOT NULL,
	`currency` varchar(3) NOT NULL,
	`type` varchar(20) NOT NULL,
	`tax_deduction_certificate_url` varchar(1023) NOT NULL,
	`stripe_object` json,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `transaction_transaction_id` PRIMARY KEY(`transaction_id`)
);
--> statement-breakpoint
CREATE INDEX `donor_external_id_idx` ON `donor` (`donor_external_id`);--> statement-breakpoint
CREATE INDEX `donor_external_id_idx` ON `subscription` (`donor_external_id`);--> statement-breakpoint
CREATE INDEX `donation_id_idx` ON `transaction` (`donation_id`);--> statement-breakpoint
CREATE INDEX `donor_external_id_idx` ON `transaction` (`donor_external_id`);