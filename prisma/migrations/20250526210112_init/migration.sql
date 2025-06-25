-- CreateTable
CREATE TABLE "CharacterInProgress" (
    "id" TEXT NOT NULL,
    "attribute_might" INTEGER NOT NULL DEFAULT -2,
    "attribute_agility" INTEGER NOT NULL DEFAULT -2,
    "attribute_charisma" INTEGER NOT NULL DEFAULT -2,
    "attribute_intelligence" INTEGER NOT NULL DEFAULT -2,
    "pointsSpent" INTEGER NOT NULL DEFAULT 0,
    "ancestry1Id" TEXT,
    "ancestry2Id" TEXT,
    "selectedTraitIds" TEXT NOT NULL,
    "ancestryPointsSpent" INTEGER NOT NULL DEFAULT 0,
    "classId" TEXT,
    "selectedFeatureChoices" TEXT NOT NULL,
    "finalName" TEXT,
    "finalPlayerName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CharacterInProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterSheetData" (
    "id" TEXT NOT NULL,
    "characterInProgressId" TEXT NOT NULL,
    "finalName" TEXT NOT NULL,
    "finalPlayerName" TEXT,
    "finalLevel" INTEGER NOT NULL DEFAULT 1,
    "finalMight" INTEGER NOT NULL,
    "finalAgility" INTEGER NOT NULL,
    "finalCharisma" INTEGER NOT NULL,
    "finalIntelligence" INTEGER NOT NULL,
    "finalPrimeModifierValue" INTEGER NOT NULL,
    "finalPrimeModifierAttribute" TEXT NOT NULL,
    "finalCombatMastery" INTEGER NOT NULL DEFAULT 1,
    "finalSaveMasteryMight" INTEGER NOT NULL,
    "finalSaveMasterityAgility" INTEGER NOT NULL,
    "finalSaveMasteryCharisma" INTEGER NOT NULL,
    "finalSaveMasteryIntelligence" INTEGER NOT NULL,
    "finalHPMax" INTEGER NOT NULL,
    "finalSPMax" INTEGER NOT NULL,
    "finalMPMax" INTEGER NOT NULL,
    "finalPD" INTEGER NOT NULL,
    "finalAD" INTEGER NOT NULL,
    "finalPDR" TEXT,
    "finalEDR" TEXT,
    "finalMDR" TEXT,
    "finalSaveDC" INTEGER NOT NULL,
    "finalDeathThreshold" INTEGER NOT NULL,
    "finalMoveSpeed" INTEGER NOT NULL,
    "finalJumpDistance" INTEGER NOT NULL,
    "finalRestPoints" INTEGER NOT NULL,
    "finalGritPoints" INTEGER NOT NULL,
    "finalInitiativeBonus" INTEGER NOT NULL,
    "skillsJson" TEXT NOT NULL,
    "tradesJson" TEXT NOT NULL,
    "languagesJson" TEXT NOT NULL,
    "ancestry1Name" TEXT,
    "ancestry2Name" TEXT,
    "selectedTraitsJson" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "classFeaturesLvl1Json" TEXT NOT NULL,
    "equipmentJson" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CharacterSheetData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CharacterSheetData_characterInProgressId_key" ON "CharacterSheetData"("characterInProgressId");

-- AddForeignKey
ALTER TABLE "CharacterSheetData" ADD CONSTRAINT "CharacterSheetData_characterInProgressId_fkey" FOREIGN KEY ("characterInProgressId") REFERENCES "CharacterInProgress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
