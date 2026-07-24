/*
  Warnings:

  - You are about to drop the column `created_at` on the `rank_history` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rank_history" DROP COLUMN "created_at",
ADD COLUMN     "achived_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
