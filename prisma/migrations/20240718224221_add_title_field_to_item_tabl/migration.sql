/*
  Warnings:

  - Added the required column `title` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    CONSTRAINT "items_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_items" ("id", "listId") SELECT "id", "listId" FROM "items";
DROP TABLE "items";
ALTER TABLE "new_items" RENAME TO "items";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
