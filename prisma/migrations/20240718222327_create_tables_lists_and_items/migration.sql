-- CreateTable
CREATE TABLE "lists" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "listId" TEXT NOT NULL,
    CONSTRAINT "items_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
