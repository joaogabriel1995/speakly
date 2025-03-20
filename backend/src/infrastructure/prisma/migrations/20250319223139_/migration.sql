/*
  Warnings:

  - You are about to drop the `listening_tool_output_activities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "listening_tool_output_activities" DROP CONSTRAINT "listening_tool_output_activities_taskId_fkey";

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "content" TEXT;

-- DropTable
DROP TABLE "listening_tool_output_activities";
