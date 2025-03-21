/*
  Warnings:

  - Added the required column `task_id` to the `listening_leasons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "listening_leasons" ADD COLUMN     "task_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "listening_leasons" ADD CONSTRAINT "listening_leasons_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
