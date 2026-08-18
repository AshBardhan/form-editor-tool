-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "ctaAlignment" TEXT NOT NULL DEFAULT 'left',
ADD COLUMN     "ctaReverse" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hideReset" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "resetLabel" TEXT NOT NULL DEFAULT 'Reset',
ADD COLUMN     "submitLabel" TEXT NOT NULL DEFAULT 'Submit';
