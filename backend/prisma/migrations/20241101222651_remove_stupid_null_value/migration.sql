/*
  Warnings:

  - Made the column `productId` on table `ProductServiceOrder` required. This step will fail if there are existing NULL values in that column.
  - Made the column `serviceOrderId` on table `ProductServiceOrder` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ProductServiceOrder" DROP CONSTRAINT "ProductServiceOrder_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductServiceOrder" DROP CONSTRAINT "ProductServiceOrder_serviceOrderId_fkey";

-- AlterTable
ALTER TABLE "ProductServiceOrder" ALTER COLUMN "productId" SET NOT NULL,
ALTER COLUMN "serviceOrderId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductServiceOrder" ADD CONSTRAINT "ProductServiceOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductServiceOrder" ADD CONSTRAINT "ProductServiceOrder_serviceOrderId_fkey" FOREIGN KEY ("serviceOrderId") REFERENCES "ServiceOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
