/*
  Warnings:

  - The values [MULTIPLE_CHOICE,DROPDOWN] on the enum `QuestionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `currentVersion` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `surveyVersionId` on the `SurveyQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `surveyVersionId` on the `SurveyResponse` table. All the data in the column will be lost.
  - You are about to drop the `SurveyVersion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `answerType` to the `ResponseAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ResponseAnswer` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `answer` on the `ResponseAnswer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `surveyId` to the `SurveyQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SurveyQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SurveyResponse` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `SurveyResponse` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "AnswerType" AS ENUM ('FILL_IN_THE_BLANK', 'SINGLE_SELECT', 'MULTI_SELECT', 'RATING_SCALE');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterEnum
BEGIN;
CREATE TYPE "QuestionType_new" AS ENUM ('MULTI_SELECT', 'FILL_IN_THE_BLANK', 'RATING_SCALE', 'SINGLE_SELECT');
ALTER TABLE "SurveyQuestion" ALTER COLUMN "questionType" TYPE "QuestionType_new" USING ("questionType"::text::"QuestionType_new");
ALTER TYPE "QuestionType" RENAME TO "QuestionType_old";
ALTER TYPE "QuestionType_new" RENAME TO "QuestionType";
DROP TYPE "QuestionType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "SurveyQuestion" DROP CONSTRAINT "SurveyQuestion_surveyVersionId_fkey";

-- DropForeignKey
ALTER TABLE "SurveyResponse" DROP CONSTRAINT "SurveyResponse_surveyVersionId_fkey";

-- DropForeignKey
ALTER TABLE "SurveyResponse" DROP CONSTRAINT "SurveyResponse_userId_fkey";

-- DropForeignKey
ALTER TABLE "SurveyVersion" DROP CONSTRAINT "SurveyVersion_surveyId_fkey";

-- AlterTable
ALTER TABLE "ResponseAnswer" ADD COLUMN     "answerType" "AnswerType" NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "answer",
ADD COLUMN     "answer" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Survey" DROP COLUMN "currentVersion",
ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE "SurveyQuestion" DROP COLUMN "surveyVersionId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "surveyId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "SurveyResponse" DROP COLUMN "surveyVersionId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isComplete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "submittedAt" DROP NOT NULL,
ALTER COLUMN "submittedAt" DROP DEFAULT;

-- DropTable
DROP TABLE "SurveyVersion";

-- AddForeignKey
ALTER TABLE "SurveyQuestion" ADD CONSTRAINT "SurveyQuestion_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyResponse" ADD CONSTRAINT "SurveyResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
