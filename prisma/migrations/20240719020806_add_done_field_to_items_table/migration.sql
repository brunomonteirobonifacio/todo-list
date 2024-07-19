-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "list_id" TEXT NOT NULL,
    CONSTRAINT "items_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "lists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_items" ("id", "list_id", "title") SELECT "id", "list_id", "title" FROM "items";
DROP TABLE "items";
ALTER TABLE "new_items" RENAME TO "items";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
