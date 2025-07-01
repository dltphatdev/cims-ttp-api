/*
  Warnings:

  - You are about to drop the column `consultantor_id` on the `customer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `Customer_consultantor_id_fkey`;

-- DropIndex
DROP INDEX `Customer_consultantor_id_fkey` ON `customer`;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `consultantor_id`;

-- CreateTable
CREATE TABLE `CustomerConsultant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `assigned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CustomerConsultant` ADD CONSTRAINT `CustomerConsultant_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerConsultant` ADD CONSTRAINT `CustomerConsultant_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
