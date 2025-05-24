-- CreateTable
CREATE TABLE "Ability" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "Ability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weakness" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "Weakness_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ability" ADD CONSTRAINT "Ability_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weakness" ADD CONSTRAINT "Weakness_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
