-- AlterTable
ALTER TABLE `customer` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `gender` ENUM('Male', 'Female') NULL,
    MODIFY `email` VARCHAR(255) NULL,
    MODIFY `phone` VARCHAR(255) NULL,
    MODIFY `address_company` VARCHAR(255) NULL,
    MODIFY `address_personal` VARCHAR(255) NULL,
    MODIFY `attachment` VARCHAR(255) NULL,
    MODIFY `tax_code` VARCHAR(255) NULL,
    MODIFY `website` VARCHAR(255) NULL,
    MODIFY `surrogate` VARCHAR(255) NULL,
    MODIFY `contact_name` VARCHAR(255) NULL,
    MODIFY `updated_at` DATETIME(3) NULL;
