-- CreateTable
CREATE TABLE "Cliente" (
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
    "preco_base" DECIMAL
);
