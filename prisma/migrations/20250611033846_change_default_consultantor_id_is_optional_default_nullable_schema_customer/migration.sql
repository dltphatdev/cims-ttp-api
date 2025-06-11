-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `Customer_consultantor_id_fkey`;

-- DropIndex
DROP INDEX `Customer_consultantor_id_fkey` ON `customer`;

-- AlterTable
ALTER TABLE `customer` MODIFY `consultantor_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_consultantor_id_fkey` FOREIGN KEY (`consultantor_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
