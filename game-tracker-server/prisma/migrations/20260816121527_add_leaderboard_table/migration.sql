-- CreateTable
CREATE TABLE "leaderboard" (
    "leaderboard_id" SERIAL NOT NULL,
    "player_rank" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "team_name" TEXT NOT NULL,
    "team_id" INTEGER NOT NULL,

    CONSTRAINT "leaderboard_pkey" PRIMARY KEY ("leaderboard_id")
);
