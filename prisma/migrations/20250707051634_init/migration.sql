-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(191) NULL,
    `verify` ENUM('Unverified', 'Verified', 'Banned') NOT NULL DEFAULT 'Unverified',
    `avatar` VARCHAR(255) NULL,
    `address` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `code` VARCHAR(191) NULL,
    `date_of_birth` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `role` ENUM('SuperAdmin', 'Admin', 'Sale', 'Technician', 'None') NOT NULL DEFAULT 'None',

    UNIQUE INDEX `user_email_key`(`email`),
    INDEX `user_email_password_idx`(`email`, `password`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refreshtoken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(512) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `iat` DATETIME(3) NOT NULL,
    `exp` DATETIME(3) NOT NULL,

    UNIQUE INDEX `refreshtoken_token_key`(`token`),
    INDEX `refreshtoken_exp_idx`(`exp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `type` ENUM('Personal', 'Company') NOT NULL DEFAULT 'Company',
    `gender` ENUM('Male', 'Female') NULL,
    `email` VARCHAR(255) NULL,
    `phone` VARCHAR(255) NULL,
    `address_company` VARCHAR(255) NULL,
    `address_personal` VARCHAR(255) NULL,
    `note` TEXT NULL,
    `attachment` VARCHAR(255) NULL,
    `tax_code` VARCHAR(255) NULL,
    `cccd` VARCHAR(255) NULL,
    `website` VARCHAR(255) NULL,
    `surrogate` VARCHAR(255) NULL,
    `contact_name` VARCHAR(255) NULL,
    `date_of_birth` DATETIME(3) NULL,
    `status` ENUM('Active', 'Deactivated') NOT NULL DEFAULT 'Deactivated',
    `verify` ENUM('Unverified', 'Verified') NOT NULL DEFAULT 'Unverified',
    `creator_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `customer_name_key`(`name`),
    UNIQUE INDEX `customer_email_key`(`email`),
    UNIQUE INDEX `customer_tax_code_key`(`tax_code`),
    UNIQUE INDEX `customer_cccd_key`(`cccd`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gallery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NULL,
    `user_id` INTEGER NULL,
    `filename` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `gallery_filename_key`(`filename`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `performance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `status` ENUM('New', 'Approved', 'Cancelled') NOT NULL DEFAULT 'New',
    `creator_id` INTEGER NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `note` TEXT NULL,
    `assign_at` DATETIME(3) NULL,
    `operating_cost` DOUBLE NOT NULL DEFAULT 0,
    `customer_care_cost` DOUBLE NOT NULL DEFAULT 0,
    `commission_cost` DOUBLE NOT NULL DEFAULT 0,
    `diplomatic_cost` DOUBLE NOT NULL DEFAULT 0,
    `reserve_cost` DOUBLE NOT NULL DEFAULT 0,
    `customer_cost` DOUBLE NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `performance_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `revenue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `unit_caculate` VARCHAR(255) NULL,
    `type` ENUM('OneTime', 'EveryMonth') NOT NULL DEFAULT 'OneTime',
    `performance_id` INTEGER NOT NULL,
    `price` DECIMAL(15, 2) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `direction` ENUM('In', 'Out') NOT NULL DEFAULT 'In',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `contact_name` VARCHAR(255) NULL,
    `creator_id` INTEGER NOT NULL,
    `customer_id` INTEGER NULL,
    `assign_at` DATETIME(3) NULL,
    `status` ENUM('New', 'InProgress', 'Completed', 'Cancelled') NOT NULL DEFAULT 'New',
    `content` TEXT NULL,
    `time_start` DATETIME(3) NULL,
    `time_end` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customerconsultant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `assigned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `refreshtoken` ADD CONSTRAINT `refreshtoken_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gallery` ADD CONSTRAINT `gallery_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gallery` ADD CONSTRAINT `gallery_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `performance` ADD CONSTRAINT `performance_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `performance` ADD CONSTRAINT `performance_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `revenue` ADD CONSTRAINT `revenue_performance_id_fkey` FOREIGN KEY (`performance_id`) REFERENCES `performance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activity` ADD CONSTRAINT `activity_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activity` ADD CONSTRAINT `activity_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerconsultant` ADD CONSTRAINT `customerconsultant_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerconsultant` ADD CONSTRAINT `customerconsultant_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
