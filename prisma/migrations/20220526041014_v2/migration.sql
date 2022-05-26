/*
  Warnings:

  - You are about to drop the column `total` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `total`,
    MODIFY `createdAt` VARCHAR(191) NOT NULL;
