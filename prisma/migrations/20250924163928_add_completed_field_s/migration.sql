-- AlterTable
ALTER TABLE "public"."StudentProfile" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."TeacherProfile" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;
