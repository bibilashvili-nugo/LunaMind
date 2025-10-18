-- AlterTable
ALTER TABLE "public"."Lesson" ADD COLUMN     "teacherProfileId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Lesson" ADD CONSTRAINT "Lesson_teacherProfileId_fkey" FOREIGN KEY ("teacherProfileId") REFERENCES "public"."TeacherProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
