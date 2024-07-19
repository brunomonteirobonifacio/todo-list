/*
  Warnings:

  - Added the required column `owner_email` to the `lists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_name` to the `lists` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_lists" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "owner_name" TEXT NOT NULL,
    "owner_email" TEXT NOT NULL
);
INSERT INTO "new_lists" ("id") SELECT "id" FROM "lists";
DROP TABLE "lists";
ALTER TABLE "new_lists" RENAME TO "lists";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
