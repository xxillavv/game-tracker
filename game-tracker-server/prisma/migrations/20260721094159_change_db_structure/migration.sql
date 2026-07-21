/*
  Warnings:

  - The primary key for the `platform_info` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `externalId` on the `platform_info` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `platform_info` table. All the data in the column will be lost.
  - You are about to drop the column `platform_id` on the `platform_info` table. All the data in the column will be lost.
  - You are about to drop the `rank_history` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `external_id` to the `platform_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platform_name` to the `platform_info` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlatformNameEmun" AS ENUM ('STEAM', 'RIOT', 'SUPERCELL');

-- DropForeignKey
ALTER TABLE "game_stats" DROP CONSTRAINT "game_stats_platform_id_fkey";

-- DropForeignKey
ALTER TABLE "rank_history" DROP CONSTRAINT "rank_history_stat_id_fkey";

-- AlterTable
ALTER TABLE "matches" ALTER COLUMN "metadata" SET DEFAULT '{}';

-- AlterTable
ALTER TABLE "platform_info" DROP CONSTRAINT "platform_info_pkey",
DROP COLUMN "externalId",
DROP COLUMN "name",
DROP COLUMN "platform_id",
ADD COLUMN     "connection_id" SERIAL NOT NULL,
ADD COLUMN     "external_id" TEXT NOT NULL,
ADD COLUMN     "platform_name" "PlatformNameEmun" NOT NULL,
ADD CONSTRAINT "platform_info_pkey" PRIMARY KEY ("connection_id");

-- DropTable
DROP TABLE "rank_history";

-- CreateTable
CREATE TABLE "rating_history" (
    "rating_id" SERIAL NOT NULL,
    "stat_id" INTEGER NOT NULL,
    "rating_tier" INTEGER NOT NULL,
    "achieved_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rating_history_pkey" PRIMARY KEY ("rating_id")
);

-- AddForeignKey
ALTER TABLE "game_stats" ADD CONSTRAINT "game_stats_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "platform_info"("connection_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating_history" ADD CONSTRAINT "rating_history_stat_id_fkey" FOREIGN KEY ("stat_id") REFERENCES "game_stats"("stat_id") ON DELETE CASCADE ON UPDATE CASCADE;
