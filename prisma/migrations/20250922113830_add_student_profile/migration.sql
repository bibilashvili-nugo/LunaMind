-- CreateEnum
CREATE TYPE "public"."EducationLevel" AS ENUM ('SCHOOL', 'UNIVERSITY', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."Availability" AS ENUM ('FLEXIBLE', 'FIXED');

-- CreateTable
CREATE TABLE "public"."StudentProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "age" INTEGER,
    "country" TEXT,
    "city" TEXT,
    "address" TEXT,
    "educationLevel" "public"."EducationLevel",
    "subjectInterest" TEXT,
    "reason" TEXT,
    "availability" "public"."Availability",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_userId_key" ON "public"."StudentProfile"("userId");

-- AddForeignKey
ALTER TABLE "public"."StudentProfile" ADD CONSTRAINT "StudentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
