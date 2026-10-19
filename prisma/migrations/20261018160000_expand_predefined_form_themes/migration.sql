-- Replace the closed light/dark FormTheme enum with PredefinedFormTheme
-- (light, dark, frost, forest, fire, beach). Existing rows stay valid because
-- light and dark are members of the new type; no backfill is required.

CREATE TYPE "PredefinedFormTheme" AS ENUM ('light', 'dark', 'frost', 'forest', 'fire', 'beach');

ALTER TABLE "Form" ALTER COLUMN "theme" DROP DEFAULT;
ALTER TABLE "Form" ALTER COLUMN "theme" TYPE "PredefinedFormTheme" USING ("theme"::text::"PredefinedFormTheme");
ALTER TABLE "Form" ALTER COLUMN "theme" SET DEFAULT 'light';

DROP TYPE "FormTheme";
