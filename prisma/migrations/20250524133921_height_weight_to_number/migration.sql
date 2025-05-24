/*
  Warnings:

  - The `height` column on the `Pokemon` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `weight` column on the `Pokemon` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "height",
ADD COLUMN     "height" INTEGER,
DROP COLUMN "weight",
ADD COLUMN     "weight" DOUBLE PRECISION;
