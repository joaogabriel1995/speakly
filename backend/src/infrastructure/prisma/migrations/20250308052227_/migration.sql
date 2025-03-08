/*
  Warnings:

  - Added the required column `updated_at` to the `learning_settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `learning_settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "learning_settings" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "learning_settings" ADD CONSTRAINT "learning_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
