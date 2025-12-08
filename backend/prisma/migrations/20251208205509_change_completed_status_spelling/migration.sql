/*
  Warnings:

  - The values [сompleted] on the enum `HabitDayStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "HabitDayStatus_new" AS ENUM ('completed', 'missed', 'unmarked');
ALTER TABLE "HabitDayLog" ALTER COLUMN "status" TYPE "HabitDayStatus_new" USING ("status"::text::"HabitDayStatus_new");
ALTER TYPE "HabitDayStatus" RENAME TO "HabitDayStatus_old";
ALTER TYPE "HabitDayStatus_new" RENAME TO "HabitDayStatus";
DROP TYPE "public"."HabitDayStatus_old";
COMMIT;
