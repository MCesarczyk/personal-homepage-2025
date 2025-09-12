/*
  Warnings:

  - You are about to drop the column `filename` on the `ProjectImage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectImage" DROP COLUMN "filename",
ADD COLUMN     "fileName" TEXT NOT NULL DEFAULT '';
