/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `CustomerConsultant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `CustomerConsultant_user_id_key` ON `CustomerConsultant`(`user_id`);
