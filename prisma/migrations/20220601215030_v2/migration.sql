-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_clientId_fkey`;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
