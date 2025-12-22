/*
  Warnings:

  - Made the column `habitRunId` on table `HabitDayLog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "HabitRunStatus" ADD VALUE 'paused';

-- AlterTable
ALTER TABLE "HabitDayLog" ALTER COLUMN "habitRunId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "HabitDayLog_habitRunId_idx" ON "HabitDayLog"("habitRunId");
