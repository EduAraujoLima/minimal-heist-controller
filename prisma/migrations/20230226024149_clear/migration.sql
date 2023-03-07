/*
  Warnings:

  - You are about to drop the column `value` on the `Target` table. All the data in the column will be lost.
  - You are about to drop the column `targetId` on the `Heist` table. All the data in the column will be lost.
  - Added the required column `hardModeValue` to the `Target` table without a default value. This is not possible if the table is not empty.
  - Added the required column `normalModeValue` to the `Target` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approachId` to the `HeistFinal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficultyId` to the `HeistFinal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `HeistFinal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "CrewMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "habilityLevel" INTEGER NOT NULL,
    "avatar" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "heistFinalId" TEXT,
    "categoryId" TEXT NOT NULL,
    "crewCategoryId" TEXT NOT NULL,
    CONSTRAINT "CrewMember_heistFinalId_fkey" FOREIGN KEY ("heistFinalId") REFERENCES "HeistFinal" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "CrewMember_crewCategoryId_fkey" FOREIGN KEY ("crewCategoryId") REFERENCES "CrewCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HeistDifficulty" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CrewCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CassinoHeistApproach" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Target" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "normalModeValue" INTEGER NOT NULL,
    "hardModeValue" INTEGER NOT NULL,
    "targetTypeId" TEXT NOT NULL,
    CONSTRAINT "Target_targetTypeId_fkey" FOREIGN KEY ("targetTypeId") REFERENCES "TargetType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Target" ("createdAt", "id", "name", "targetTypeId", "updatedAt") SELECT "createdAt", "id", "name", "targetTypeId", "updatedAt" FROM "Target";
DROP TABLE "Target";
ALTER TABLE "new_Target" RENAME TO "Target";
CREATE TABLE "new_Heist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Heist" ("createdAt", "id", "location", "name", "updatedAt") SELECT "createdAt", "id", "location", "name", "updatedAt" FROM "Heist";
DROP TABLE "Heist";
ALTER TABLE "new_Heist" RENAME TO "Heist";
CREATE TABLE "new__SecondaryTargets" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_SecondaryTargets_A_fkey" FOREIGN KEY ("A") REFERENCES "HeistFinal" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SecondaryTargets_B_fkey" FOREIGN KEY ("B") REFERENCES "Target" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__SecondaryTargets" ("A", "B") SELECT "A", "B" FROM "_SecondaryTargets";
DROP TABLE "_SecondaryTargets";
ALTER TABLE "new__SecondaryTargets" RENAME TO "_SecondaryTargets";
CREATE UNIQUE INDEX "_SecondaryTargets_AB_unique" ON "_SecondaryTargets"("A", "B");
CREATE INDEX "_SecondaryTargets_B_index" ON "_SecondaryTargets"("B");
CREATE TABLE "new_HeistFinal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "heistId" TEXT NOT NULL,
    "difficultyId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "targetId" TEXT NOT NULL,
    "approachId" TEXT NOT NULL,
    CONSTRAINT "HeistFinal_heistId_fkey" FOREIGN KEY ("heistId") REFERENCES "Heist" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "HeistFinal_difficultyId_fkey" FOREIGN KEY ("difficultyId") REFERENCES "HeistDifficulty" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HeistFinal_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Target" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HeistFinal_approachId_fkey" FOREIGN KEY ("approachId") REFERENCES "CassinoHeistApproach" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_HeistFinal" ("createdAt", "heistId", "id", "updatedAt") SELECT "createdAt", "heistId", "id", "updatedAt" FROM "HeistFinal";
DROP TABLE "HeistFinal";
ALTER TABLE "new_HeistFinal" RENAME TO "HeistFinal";
CREATE UNIQUE INDEX "HeistFinal_heistId_key" ON "HeistFinal"("heistId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
