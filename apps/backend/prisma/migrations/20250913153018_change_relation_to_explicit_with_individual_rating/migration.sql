/*
  Warnings:

  - You are about to drop the column `rating` on the `Technology` table. All the data in the column will be lost.
  - You are about to drop the `_UserTechnologies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserTechnologies" DROP CONSTRAINT "_UserTechnologies_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserTechnologies" DROP CONSTRAINT "_UserTechnologies_B_fkey";

-- AlterTable
ALTER TABLE "Technology" DROP COLUMN "rating";

-- DropTable
DROP TABLE "_UserTechnologies";

-- CreateTable
CREATE TABLE "UserTechnology" (
    "userId" TEXT NOT NULL,
    "technologyId" TEXT NOT NULL,
    "rating" INTEGER,

    CONSTRAINT "UserTechnology_pkey" PRIMARY KEY ("userId","technologyId")
);

-- AddForeignKey
ALTER TABLE "UserTechnology" ADD CONSTRAINT "UserTechnology_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTechnology" ADD CONSTRAINT "UserTechnology_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "Technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
