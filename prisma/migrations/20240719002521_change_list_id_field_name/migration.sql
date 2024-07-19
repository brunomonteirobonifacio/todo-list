/*
  Warnings:

  - You are about to drop the column `listId` on the `items` table. All the data in the column will be lost.
  - Added the required column `list_id` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "list_id" TEXT NOT NULL,
    CONSTRAINT "items_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "lists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_items" ("id", "title") SELECT "id", "title" FROM "items";
DROP TABLE "items";
ALTER TABLE "new_items" RENAME TO "items";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
