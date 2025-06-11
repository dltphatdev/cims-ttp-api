-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('Personal', 'Company') NOT NULL DEFAULT 'Company',
    `gender` ENUM('Male', 'Female') NOT NULL DEFAULT 'Male',
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `address_company` VARCHAR(191) NULL,
    `address_personal` VARCHAR(191) NULL,
    `note` TEXT NULL,
    `attachment` VARCHAR(191) NULL,
    `tax_code` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `surrogate` VARCHAR(191) NULL,
    `contact_name` VARCHAR(191) NULL,
    `date_of_birth` DATETIME(3) NULL,
    `status` ENUM('Active', 'Deactivated') NOT NULL DEFAULT 'Deactivated',
    `verify` ENUM('Unverified', 'Verified') NOT NULL DEFAULT 'Unverified',
    `assign_at` DATETIME(3) NULL,
    `creator_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
