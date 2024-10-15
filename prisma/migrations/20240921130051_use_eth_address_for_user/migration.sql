/*
  Warnings:

  - You are about to drop the column `answerType` on the `ResponseAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `visibility` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Credential` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[ethereumAddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ethereumAddress` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Credential" DROP CONSTRAINT "Credential_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "ResponseAnswer" DROP COLUMN "answerType";

-- AlterTable
ALTER TABLE "Survey" DROP COLUMN "visibility";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "emailVerified",
ADD COLUMN     "ethereumAddress" TEXT NOT NULL;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Credential";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "VerificationToken";

-- DropEnum
DROP TYPE "AnswerType";

-- DropEnum
DROP TYPE "Visibility";

-- CreateIndex
CREATE UNIQUE INDEX "User_ethereumAddress_key" ON "User"("ethereumAddress");
