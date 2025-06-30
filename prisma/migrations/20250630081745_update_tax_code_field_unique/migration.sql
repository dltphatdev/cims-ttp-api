/*
  Warnings:

  - A unique constraint covering the columns `[tax_code]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Customer_tax_code_key` ON `Customer`(`tax_code`);
