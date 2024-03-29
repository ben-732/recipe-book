-- Adminer 4.8.1 PostgreSQL 16.1 (Debian 16.1-1.pgdg120+1) dump

-- \connect "postgres";

DROP TABLE IF EXISTS "recipe_tags";
CREATE TABLE "public"."recipe_tags" (
    "recipe_id" uuid NOT NULL,
    "tag_id" uuid NOT NULL,
    CONSTRAINT "recipe_tag_id" UNIQUE ("recipe_id", "tag_id")
) WITH (oids = false);

TRUNCATE "recipe_tags";
INSERT INTO "recipe_tags" ("recipe_id", "tag_id") VALUES
('e7348b71-ffbc-4b85-aa48-0b25cf89691a',	'7a2d793c-72e5-4f00-b491-63b02ea3ecbe'),
('d4a377d7-fc59-454b-9e02-69e4f85d77fe',	'7a2d793c-72e5-4f00-b491-63b02ea3ecbe'),
('eb1d25d6-46e0-4e95-89d2-c263091816d2',	'7a2d793c-72e5-4f00-b491-63b02ea3ecbe');

DROP TABLE IF EXISTS "recipes";
CREATE TABLE "public"."recipes" (
    "name" character varying(128) NOT NULL,
    "description" text NOT NULL,
    "id" uuid NOT NULL,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "created_by" uuid NOT NULL,
    "updated_at" timestamp,
    "deleted_at" timestamp,
    "picture" character varying(256),
    "source" character varying,
    CONSTRAINT "recipe_id" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "recipes";
INSERT INTO "recipes" ("name", "description", "id", "created_at", "created_by", "updated_at", "deleted_at", "picture", "source") VALUES
('Test',	'Test',	'bb8797f8-89ca-419e-9a2c-5eee6c28cbef',	'2024-02-13 09:22:34.842006',	'24ddaba2-5ee0-4388-bf88-e0f75d66e915',	NULL,	NULL,	'test',	''),
('Chewy Chocolate Chip Biscuits',	'This chewy chocolate chip biscuit recipe makes enough to keep the tins filled for the week or you can freeze some mixture for when you need a quick fix!
',	'e7348b71-ffbc-4b85-aa48-0b25cf89691a',	'2024-02-13 09:15:44.78155',	'24ddaba2-5ee0-4388-bf88-e0f75d66e915',	NULL,	NULL,	'https://www.chelsea.co.nz/files/cache/019f8a18e3568f3fcc2542427818d117_f4875.jpg',	'https://www.chelsea.co.nz/browse-recipes/chewy-chocolate-chip-biscuits/'),
('Banana Cake With Chocolate Icing',	'Chocolate and banana, is there anything better? Take this classic moist banana cake recipe and top with chocolate icing to make it irresistible.
',	'd4a377d7-fc59-454b-9e02-69e4f85d77fe',	'2024-02-13 09:08:40.170644',	'24ddaba2-5ee0-4388-bf88-e0f75d66e915',	NULL,	NULL,	'https://www.chelsea.co.nz/files/cache/9b0dd8dffd9aeb21adeaf026ec8658cb_f5240.jpg',	'https://www.chelsea.co.nz/browse-recipes/banana-cake-chocolate-icing/'),
('Chocolate Brownie',	'Delicious gooey chocolate brownies can be enjoyed fresh out of the oven, or with a dollop of cream as dessert.
',	'eb1d25d6-46e0-4e95-89d2-c263091816d2',	'2024-02-13 09:10:03.513341',	'24ddaba2-5ee0-4388-bf88-e0f75d66e915',	NULL,	NULL,	'https://www.chelsea.co.nz/files/cache/a19be388b736b700a9d598dd16dababe_f4886.jpg',	'https://www.chelsea.co.nz/browse-recipes/chocolate-brownie/'),
('nope',	'Test',	'6c6df706-10d1-4401-96be-187bcad32cc6',	'2024-02-13 09:13:48.0278',	'24ddaba2-5ee0-4388-bf88-e0f75d66e915',	NULL,	NULL,	'test',	'eeeeee');

DELIMITER ;;

CREATE TRIGGER "recipes_update_time" AFTER INSERT OR UPDATE ON "public"."recipes" FOR EACH ROW EXECUTE FUNCTION update_modified_column();;

DELIMITER ;

DROP TABLE IF EXISTS "tags";
CREATE TABLE "public"."tags" (
    "id" uuid NOT NULL,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "created_by" uuid NOT NULL,
    "updated_at" timestamp,
    "deleted_at" timestamp,
    "name" character varying(64) NOT NULL,
    "icon" character varying(32) NOT NULL,
    "color" character varying(7) NOT NULL,
    CONSTRAINT "tags_id" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "tags";
INSERT INTO "tags" ("id", "created_at", "created_by", "updated_at", "deleted_at", "name", "icon", "color") VALUES
('7a2d793c-72e5-4f00-b491-63b02ea3ecbe',	'2024-02-26 23:17:59.188949',	'24ddaba2-5ee0-4388-bf88-e0f75d66e915',	'2024-02-26 23:17:59.188949',	NULL,	'Sweet',	'sugar',	'#B3F2C1');

ALTER TABLE ONLY "public"."recipe_tags" ADD CONSTRAINT "recipe_tags_recipe_id_fkey" FOREIGN KEY (recipe_id) REFERENCES recipes(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."recipe_tags" ADD CONSTRAINT "recipe_tags_tag_id_fkey" FOREIGN KEY (tag_id) REFERENCES tags(id) NOT DEFERRABLE;

-- 2024-02-26 23:20:45.68059+00