-- Deploy koza:init to pg

BEGIN;

--data tables
CREATE TABLE IF NOT EXISTS "role" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "level" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "nickname" TEXT NOT NULL UNIQUE,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "role_id" INT NOT NULL REFERENCES "role"("id") DEFAULT 1,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "activity" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "zipcode" INT NOT NULL,
  "location" POINT,
  "town" TEXT NOT NULL,
  "free" BOOLEAN NOT NULL,
  "certify" BOOLEAN NOT NULL DEFAULT 'false',
  "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "article"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "certify" BOOLEAN NOT NULL DEFAULT 'false',
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "comment" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "description" TEXT NOT NULL,
    "report" BOOLEAN NOT NULL DEFAULT 'false',
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "activity_id" INT NOT NULL REFERENCES "activity"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "picture" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "url" TEXT NOT NULL UNIQUE,
    "activity_id" INT NOT NULL REFERENCES "activity"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS "rating" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "rate" INT NOT NULL UNIQUE,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

-- association tables
CREATE TABLE IF NOT EXISTS "user_rates_activity" (
  "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "activity_id" INT NOT NULL REFERENCES "activity"("id") ON DELETE CASCADE,
  PRIMARY KEY("user_id", "activity_id"),
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "activity_has_rating" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "activity_id" INT NOT NULL REFERENCES "activity"("id") ON DELETE CASCADE,
  "note_id" INT NOT NULL REFERENCES "rating"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

--values of the role table.
INSERT INTO "role"("level") VALUES ('user'), ('admin');

-- values of the rating table.
INSERT INTO "rating"("rate") VALUES (1),(2),(3),(4),(5);

COMMIT;
