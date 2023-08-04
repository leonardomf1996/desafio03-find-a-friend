/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "Organizations" (
    "id" TEXT NOT NULL,
    "responsibleName" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "postalCode" VARCHAR(8) NOT NULL,
    "fullAddress" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "passwordHashed" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Organizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organizations_mail_key" ON "Organizations"("mail");
