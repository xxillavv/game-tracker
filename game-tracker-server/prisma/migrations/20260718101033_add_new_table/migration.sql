-- CreateTable
CREATE TABLE "rank_history" (
    "rank_id" SERIAL NOT NULL,
    "rank_tier" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stat_id" INTEGER NOT NULL,

    CONSTRAINT "rank_history_pkey" PRIMARY KEY ("rank_id")
);

-- AddForeignKey
ALTER TABLE "rank_history" ADD CONSTRAINT "rank_history_stat_id_fkey" FOREIGN KEY ("stat_id") REFERENCES "game_stats"("stat_id") ON DELETE CASCADE ON UPDATE CASCADE;
