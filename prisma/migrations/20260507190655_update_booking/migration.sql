/*
  Warnings:

  - You are about to drop the column `barberShopId` on the `Booking` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_barberShopId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "barberShopId";
