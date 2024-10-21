/*
  Warnings:

  - You are about to drop the column `statusId` on the `ServiceOrder` table. All the data in the column will be lost.
  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServiceOrder" DROP CONSTRAINT "ServiceOrder_statusId_fkey";

-- DropForeignKey
ALTER TABLE "Status" DROP CONSTRAINT "Status_companyId_fkey";

-- AlterTable
ALTER TABLE "ServiceOrder" DROP COLUMN "statusId",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ABERTO';

-- DropTable
DROP TABLE "Status";
