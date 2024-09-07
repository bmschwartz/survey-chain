/*
  Warnings:

  - You are about to drop the column `userId` on the `Survey` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Survey` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Survey" DROP CONSTRAINT "Survey_userId_fkey";

-- AlterTable
ALTER TABLE "Survey" DROP COLUMN "userId",
ADD COLUMN     "creatorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
