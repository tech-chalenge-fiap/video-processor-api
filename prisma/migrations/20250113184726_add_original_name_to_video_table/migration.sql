/*
  Warnings:

  - Added the required column `original_name` to the `video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `video` ADD COLUMN `original_name` VARCHAR(191) NOT NULL;
