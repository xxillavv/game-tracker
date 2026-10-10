/*
  Warnings:

  - You are about to drop the column `result` on the `matches` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `matches` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "matches" DROP COLUMN "result",
DROP COLUMN "score";
