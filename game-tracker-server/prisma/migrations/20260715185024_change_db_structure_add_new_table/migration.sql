/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Match` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `News` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlatformInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_game_id_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_user_id_fkey";

-- DropForeignKey
ALTER TABLE "PlatformInfo" DROP CONSTRAINT "PlatformInfo_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_user_id_fkey";

-- DropTable
DROP TABLE "Game";

-- DropTable
DROP TABLE "Match";

-- DropTable
DROP TABLE "News";

-- DropTable
DROP TABLE "PlatformInfo";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "sesstion" (
    "session_id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "sesstion_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "games" (
    "game_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("game_id")
);

-- CreateTable
CREATE TABLE "matches" (
    "match_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,
    "result" "MatchResult" NOT NULL,
    "score" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("match_id")
);

-- CreateTable
CREATE TABLE "news" (
    "news_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "news_pkey" PRIMARY KEY ("news_id")
);

-- CreateTable
CREATE TABLE "platform_info" (
    "platform_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "access_token" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "platform_info_pkey" PRIMARY KEY ("platform_id")
);

-- CreateTable
CREATE TABLE "game_stats" (
    "stat_id" SERIAL NOT NULL,
    "platform_id" INTEGER NOT NULL,
    "last_played_at" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "game_stats_pkey" PRIMARY KEY ("stat_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "sesstion_token_key" ON "sesstion"("token");

-- CreateIndex
CREATE UNIQUE INDEX "sesstion_user_id_key" ON "sesstion"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "games_name_key" ON "games"("name");

-- CreateIndex
CREATE UNIQUE INDEX "platform_info_name_key" ON "platform_info"("name");

-- CreateIndex
CREATE UNIQUE INDEX "game_stats_platform_id_key" ON "game_stats"("platform_id");

-- AddForeignKey
ALTER TABLE "sesstion" ADD CONSTRAINT "sesstion_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("game_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platform_info" ADD CONSTRAINT "platform_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_stats" ADD CONSTRAINT "game_stats_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "platform_info"("platform_id") ON DELETE CASCADE ON UPDATE CASCADE;
