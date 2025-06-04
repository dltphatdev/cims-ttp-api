/*
  Warnings:

  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserRoles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `type` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Role_action_key";

-- DropIndex
DROP INDEX "Role_name_key";

-- DropIndex
DROP INDEX "_UserRoles_B_index";

-- DropIndex
DROP INDEX "_UserRoles_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Role";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_UserRoles";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullname" TEXT,
    "verify" TEXT NOT NULL DEFAULT 'Unverified',
    "avatar" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "code" TEXT,
    "date_of_birth" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Sale'
);
INSERT INTO "new_User" ("address", "avatar", "code", "created_at", "date_of_birth", "email", "fullname", "id", "password", "phone", "updated_at", "verify") SELECT "address", "avatar", "code", "created_at", "date_of_birth", "email", "fullname", "id", "password", "phone", "updated_at", "verify" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_email_password_idx" ON "User"("email", "password");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
