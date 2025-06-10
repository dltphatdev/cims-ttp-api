-- DropIndex
DROP INDEX `RefreshToken_token_key` ON `refreshtoken`;

-- AlterTable
ALTER TABLE `refreshtoken` MODIFY `token` TEXT NOT NULL;

-- CreateIndex
CREATE INDEX `index_token` ON `RefreshToken`(`token`(255));
