/*
  Warnings:

  - Added the required column `learning_settings_id` to the `learning_journeys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "learning_journeys" ADD COLUMN     "learning_settings_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "learning_settings" (
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "days_week" TEXT NOT NULL,
    "hour_day" TEXT NOT NULL,

    CONSTRAINT "learning_settings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "learning_journeys" ADD CONSTRAINT "learning_journeys_learning_settings_id_fkey" FOREIGN KEY ("learning_settings_id") REFERENCES "learning_settings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
