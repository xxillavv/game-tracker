/*
  Warnings:

  - You are about to drop the column `stats_id` on the `matches` table. All the data in the column will be lost.
  - Added the required column `connection_id` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "matches" DROP CONSTRAINT "matches_stats_id_fkey";

-- AlterTable
ALTER TABLE "matches" DROP COLUMN "stats_id",
ADD COLUMN     "connection_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_connection_id_fkey" FOREIGN KEY ("connection_id") REFERENCES "connections"("connection_id") ON DELETE CASCADE ON UPDATE CASCADE;
