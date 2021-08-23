/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post_Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Category";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Image";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post_Category";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Product";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "contato_funcao" TEXT,
    "contato_nome" TEXT,
    "cgc_cpf" TEXT,
    "Razao_social" TEXT,
    "inscr_estadual" TEXT,
    "endereco" TEXT,
    "cidade" TEXT NOT NULL,
    "uf" TEXT,
    "cep" TEXT,
    "telefone1" TEXT,
    "telefone2" TEXT,
    "telefone3" TEXT,
    "email" TEXT,
    "obs" TEXT,
    "estado" INTEGER,
    "preco_base" TEXT
);
INSERT INTO "new_Cliente" ("Razao_social", "cep", "cgc_cpf", "cidade", "contato_funcao", "contato_nome", "email", "endereco", "estado", "id", "inscr_estadual", "nome", "obs", "preco_base", "telefone1", "telefone2", "telefone3", "uf") SELECT "Razao_social", "cep", "cgc_cpf", "cidade", "contato_funcao", "contato_nome", "email", "endereco", "estado", "id", "inscr_estadual", "nome", "obs", "preco_base", "telefone1", "telefone2", "telefone3", "uf" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
