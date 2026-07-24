/*
  Warnings:

  - You are about to drop the column `user_id` on the `matches` table. All the data in the column will be lost.
  - You are about to drop the `sesstion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `stats_id` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "matches" DROP CONSTRAINT "matches_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sesstion" DROP CONSTRAINT "sesstion_user_id_fkey";

-- AlterTable
ALTER TABLE "matches" DROP COLUMN "user_id",
ADD COLUMN     "stats_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "sesstion";

-- CreateTable
CREATE TABLE "sessions" (
    "session_id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("session_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_user_id_key" ON "sessions"("user_id");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_stats_id_fkey" FOREIGN KEY ("stats_id") REFERENCES "game_stats"("stat_id") ON DELETE CASCADE ON UPDATE CASCADE;
