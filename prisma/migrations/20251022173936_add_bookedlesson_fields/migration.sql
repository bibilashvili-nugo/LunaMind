-- AlterTable
ALTER TABLE "public"."BookedLesson" ADD COLUMN     "comment" TEXT,
ADD COLUMN     "duration" DOUBLE PRECISION,
ADD COLUMN     "link" TEXT;
