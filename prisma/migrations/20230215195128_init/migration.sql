-- CreateTable
CREATE TABLE "Heist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "targetId" TEXT NOT NULL,
    CONSTRAINT "Heist_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Target" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Target" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "value" INTEGER NOT NULL,
    "targetTypeId" TEXT NOT NULL,
    CONSTRAINT "Target_targetTypeId_fkey" FOREIGN KEY ("targetTypeId") REFERENCES "TargetType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TargetType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "avatar" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "heistFinalId" TEXT,
    CONSTRAINT "Member_heistFinalId_fkey" FOREIGN KEY ("heistFinalId") REFERENCES "HeistFinal" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HeistFinal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "heistId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "HeistFinal_heistId_fkey" FOREIGN KEY ("heistId") REFERENCES "Heist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_SecondaryTargets" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_SecondaryTargets_A_fkey" FOREIGN KEY ("A") REFERENCES "Heist" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SecondaryTargets_B_fkey" FOREIGN KEY ("B") REFERENCES "Target" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "HeistFinal_heistId_key" ON "HeistFinal"("heistId");

-- CreateIndex
CREATE UNIQUE INDEX "_SecondaryTargets_AB_unique" ON "_SecondaryTargets"("A", "B");

-- CreateIndex
CREATE INDEX "_SecondaryTargets_B_index" ON "_SecondaryTargets"("B");
