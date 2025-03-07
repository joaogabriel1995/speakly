/*
  Warnings:

  - Changed the type of `duration` on the `learning_settings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `days_week` on the `learning_settings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `hour_day` on the `learning_settings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "learning_settings" DROP COLUMN "duration",
ADD COLUMN     "duration" INTEGER NOT NULL,
DROP COLUMN "days_week",
ADD COLUMN     "days_week" INTEGER NOT NULL,
DROP COLUMN "hour_day",
ADD COLUMN     "hour_day" INTEGER NOT NULL;
