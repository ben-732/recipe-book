CREATE TABLE "public"."recipes" (
    "name" character varying(128) NOT NULL,
    "description" text NOT NULL,
    "id" uuid NOT NULL,
    "createdAt" timestamp,
    "createdBy" uuid NOT NULL,
    "updatedAt" timestamp,
    "deletedAt" timestamp,
    CONSTRAINT "recipe_id" PRIMARY KEY ("id")
) WITH (oids = false);