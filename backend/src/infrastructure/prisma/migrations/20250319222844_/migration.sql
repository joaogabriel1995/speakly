-- CreateEnum
CREATE TYPE "TaskStatusEnum" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SkillEnum" AS ENUM ('SPEAKING', 'VOCABULARY', 'PRONUNCIATION', 'GRAMMAR', 'WRITING', 'READING', 'LISTENING');

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "skill" "SkillEnum" NOT NULL,
    "duration" INTEGER NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "status" "TaskStatusEnum" NOT NULL DEFAULT 'NOT_STARTED',
    "learning_journey_id" TEXT NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listening_tool_output_activities" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "transcription" TEXT NOT NULL,
    "taskId" TEXT,

    CONSTRAINT "listening_tool_output_activities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "listening_tool_output_activities_taskId_key" ON "listening_tool_output_activities"("taskId");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_learning_journey_id_fkey" FOREIGN KEY ("learning_journey_id") REFERENCES "learning_journeys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listening_tool_output_activities" ADD CONSTRAINT "listening_tool_output_activities_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
