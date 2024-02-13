-- Adminer 4.8.1 PostgreSQL 16.1 (Debian 16.1-1.pgdg120+1) dump

\connect "postgres";

CREATE TABLE "public"."recipes" (
    "name" character varying(128) NOT NULL,
    "description" text NOT NULL,
    "id" uuid NOT NULL,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "created_by" uuid NOT NULL,
    "updated_at" timestamp,
    "deleted_at" timestamp,
    "picture" character varying(256),
    CONSTRAINT "recipe_id" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "recipes" ("name", "description", "id", "created_at", "created_by", "updated_at", "deleted_at", "picture") VALUES
('Test',	'Test',	'6c6df706-10d1-4401-96be-187bcad32cc6',	'2024-02-13 09:13:48.0278',	'24ddaba2-5ee0-4388-bf88-e0f75d66e915',	NULL,	NULL,	'test'),
('Test',	'Test',	'eb1d25d6-46e0-4e95-89d2-c263091816d2',	'2024-02-13 09:10:03.513341',	'24ddaba2-5ee0-4388-bf88-e0f75d66e915',	NULL,	NULL,	'test'),
('Test',	'Test',	'd4a377d7-fc59-454b-9e02-69e4f85d77fe',	'2024-02-13 09:08:40.170644',	'24ddaba2-5ee0-4388-bf88-e0f75d66e915',	NULL,	NULL,	'test'),
('Test',	'Test',	'e7348b71-ffbc-4b85-aa48-0b25cf89691a',	'2024-02-13 09:15:44.78155',	'24ddaba2-5ee0-4388-bf88-e0f75d66e915',	NULL,	NULL,	'test'),

DELIMITER ;;

CREATE TRIGGER "recipes_update_time" AFTER INSERT OR UPDATE ON "public"."recipes" FOR EACH ROW EXECUTE FUNCTION update_modified_column();;

DELIMITER ;

-- 2024-02-13 09:24:19.96167+00