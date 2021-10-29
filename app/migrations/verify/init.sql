-- Verify koza:init on pg

BEGIN;
-- checking all tables and columns, false because we don't want to show all values for verfication. 
SELECT * FROM "user" WHERE FALSE;
SELECT * FROM "activity" WHERE FALSE;
SELECT * FROM "article" WHERE FALSE;
SELECT * FROM "role" WHERE FALSE;
SELECT * FROM "comment" WHERE FALSE; 
SELECT * FROM "picture" WHERE FALSE; 
SELECT * FROM "rating" WHERE FALSE;

ROLLBACK; 
