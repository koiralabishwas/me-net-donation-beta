ALTER TABLE `transaction` DROP COLUMN `stripe_object`;--> statement-breakpoint
ALTER TABLE `donor` DROP COLUMN `stripe_customer_object`;--> statement-breakpoint
ALTER TABLE `subscription` DROP COLUMN `stripe_subscription_object`;