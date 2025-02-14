-- DropForeignKey
ALTER TABLE "ProductServiceOrder" DROP CONSTRAINT "ProductServiceOrder_serviceOrderId_fkey";

-- AddForeignKey
ALTER TABLE "ProductServiceOrder" ADD CONSTRAINT "ProductServiceOrder_serviceOrderId_fkey" FOREIGN KEY ("serviceOrderId") REFERENCES "ServiceOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
