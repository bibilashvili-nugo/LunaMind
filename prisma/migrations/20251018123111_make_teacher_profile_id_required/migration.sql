/*
  Warnings:

  - Made the column `teacherProfileId` on table `Lesson` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Lesson" DROP CONSTRAINT "Lesson_teacherProfileId_fkey";

-- AlterTable
ALTER TABLE "public"."Lesson" ALTER COLUMN "teacherProfileId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Lesson" ADD CONSTRAINT "Lesson_teacherProfileId_fkey" FOREIGN KEY ("teacherProfileId") REFERENCES "public"."TeacherProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
