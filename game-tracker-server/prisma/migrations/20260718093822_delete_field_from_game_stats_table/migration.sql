/*
  Warnings:

  - You are about to drop the column `last_played_at` on the `game_stats` table. All the data in the column will be lost.
  - Added the required column `game` to the `news` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "game_stats" DROP COLUMN "last_played_at";

-- AlterTable
ALTER TABLE "news" ADD COLUMN     "game" TEXT NOT NULL;
