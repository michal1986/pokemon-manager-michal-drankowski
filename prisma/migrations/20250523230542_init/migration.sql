-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "trainer" TEXT,
    "height" INTEGER NOT NULL DEFAULT 0,
    "weight" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);
