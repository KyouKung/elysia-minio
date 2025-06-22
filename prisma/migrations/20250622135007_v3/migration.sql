/*
  Warnings:

  - Added the required column `filePath` to the `user_files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_files" ADD COLUMN     "filePath" TEXT NOT NULL;
