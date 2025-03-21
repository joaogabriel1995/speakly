/*
  Warnings:

  - You are about to drop the column `duration` on the `listening_leasons` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `listening_leasons` table. All the data in the column will be lost.
  - Added the required column `transcription` to the `listening_leasons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `listening_leasons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "listening_leasons" DROP COLUMN "duration",
DROP COLUMN "title",
ADD COLUMN     "transcription" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
