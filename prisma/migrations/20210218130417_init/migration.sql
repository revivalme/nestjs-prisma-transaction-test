-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "money" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "UserItem" (
    "userId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "itemId"),
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" INTEGER,
    "salePrice" INTEGER
);
