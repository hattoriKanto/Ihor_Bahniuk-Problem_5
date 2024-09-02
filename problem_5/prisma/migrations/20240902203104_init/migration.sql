-- CreateTable
CREATE TABLE "Character" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" STRING NOT NULL,
    "animeTitle" STRING NOT NULL,
    "species" STRING NOT NULL,
    "age" INT4 NOT NULL,
    "gender" STRING NOT NULL,
    "appearance" STRING[],
    "role" STRING NOT NULL,
    "voiceActor" STRING NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_id_key" ON "Character"("id");
