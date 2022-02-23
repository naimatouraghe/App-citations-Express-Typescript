-- Creator:       MySQL Workbench 6.3.8/ExportSQLite Plugin 0.1.0
-- Author:        Naima
-- Caption:       New Model
-- Project:       Name of the project
-- Changed:       2022-02-21 11:44
-- Created:       2022-02-21 09:36
PRAGMA foreign_keys = OFF;

-- Schema: mydb

BEGIN;
CREATE TABLE "auteurs"(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "username" VARCHAR(45)
);
CREATE TABLE "citations"(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "citation" VARCHAR(45) NOT NULL,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "auteurs_id" INTEGER NOT NULL,
  CONSTRAINT "fk_citations_auteurs"
    FOREIGN KEY("auteurs_id")
    REFERENCES "auteurs"("id")
);
CREATE INDEX "citations.fk_citations_auteurs_idx" ON "citations" ("auteurs_id");
COMMIT;
