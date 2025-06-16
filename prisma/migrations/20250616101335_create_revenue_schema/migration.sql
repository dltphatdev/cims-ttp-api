-- AlterTable
ALTER TABLE `performance` ADD COLUMN `commission_cost` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `customer_care_cost` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `customer_cost` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `diplomatic_cost` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `operating_cost` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `reserve_cost` DOUBLE NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Revenue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `unit_caculate` VARCHAR(191) NULL,
    `type` ENUM('OneTime', 'EveryMonth') NOT NULL DEFAULT 'OneTime',
    `performance_id` INTEGER NOT NULL,
    `price` DECIMAL(15, 2) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `direction` ENUM('In', 'Out') NOT NULL DEFAULT 'In',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `Revenue_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Revenue` ADD CONSTRAINT `Revenue_performance_id_fkey` FOREIGN KEY (`performance_id`) REFERENCES `Performance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
