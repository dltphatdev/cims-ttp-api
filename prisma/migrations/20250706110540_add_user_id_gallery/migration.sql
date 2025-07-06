-- AlterTable
ALTER TABLE `gallery` ADD COLUMN `user_id` INTEGER NULL,
    MODIFY `customer_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `gallery` ADD CONSTRAINT `gallery_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
