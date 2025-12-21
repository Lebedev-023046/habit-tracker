-- CreateEnum
CREATE TYPE "HabitStatus" AS ENUM ('planned', 'active', 'paused', 'built', 'cancelled');

-- CreateEnum
CREATE TYPE "HabitRunStatus" AS ENUM ('active', 'built', 'cancelled');

-- CreateEnum
CREATE TYPE "HabitDayStatus" AS ENUM ('completed', 'missed', 'unmarked');

-- CreateTable
CREATE TABLE "Habit" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "HabitStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HabitRun" (
    "id" TEXT NOT NULL,
    "habitId" TEXT NOT NULL,
    "status" "HabitRunStatus" NOT NULL,
    "totalDays" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "builtAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HabitRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HabitDayLog" (
    "id" TEXT NOT NULL,
    "habitRunId" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "HabitDayStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HabitDayLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Habit_status_idx" ON "Habit"("status");

-- CreateIndex
CREATE INDEX "HabitRun_habitId_idx" ON "HabitRun"("habitId");

-- CreateIndex
CREATE INDEX "HabitRun_status_idx" ON "HabitRun"("status");

-- CreateIndex
CREATE UNIQUE INDEX "HabitDayLog_habitRunId_date_key" ON "HabitDayLog"("habitRunId", "date");

-- AddForeignKey
ALTER TABLE "HabitRun" ADD CONSTRAINT "HabitRun_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabitDayLog" ADD CONSTRAINT "HabitDayLog_habitRunId_fkey" FOREIGN KEY ("habitRunId") REFERENCES "HabitRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;
