/*
  Warnings:

  - You are about to drop the `platform_info` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "game_stats" DROP CONSTRAINT "game_stats_platform_id_fkey";

-- DropForeignKey
ALTER TABLE "platform_info" DROP CONSTRAINT "platform_info_user_id_fkey";

-- DropTable
DROP TABLE "platform_info";

-- CreateTable
CREATE TABLE "connections" (
    "connection_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "platform_name" "PlatformNameEmun" NOT NULL,
    "external_id" TEXT NOT NULL,
    "access_token" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "connections_pkey" PRIMARY KEY ("connection_id")
);

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_stats" ADD CONSTRAINT "game_stats_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "connections"("connection_id") ON DELETE CASCADE ON UPDATE CASCADE;
