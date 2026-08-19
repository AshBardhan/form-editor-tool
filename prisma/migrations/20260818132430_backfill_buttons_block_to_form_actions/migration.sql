-- Data backfill: copy each form's legacy "buttons" block props onto the new
-- Form.submitLabel/resetLabel/actionsAlignment/actionsReverse columns, then remove the
-- now-unsupported block rows. Submit/reset button themes are intentionally
-- discarded here since they are fixed constants in code going forward.
-- Uses DISTINCT ON to stay deterministic even if a form ever had more than
-- one buttons block (picks the one with the highest "order").
WITH latest_buttons_block AS (
  SELECT DISTINCT ON ("formId")
    "formId",
    props
  FROM "FormBlock"
  WHERE type = 'buttons'
  ORDER BY "formId", "order" DESC
)
UPDATE "Form" f
SET
  "submitLabel" = COALESCE(NULLIF(b.props->>'submitLabel', ''), f."submitLabel"),
  "resetLabel" = COALESCE(NULLIF(b.props->>'resetLabel', ''), f."resetLabel"),
  "actionsAlignment" = COALESCE(NULLIF(b.props->>'alignment', ''), f."actionsAlignment"),
  "actionsReverse" = COALESCE((b.props->>'reverse')::boolean, f."actionsReverse")
FROM latest_buttons_block b
WHERE b."formId" = f.id;

-- Buttons blocks never collect field responses, so this is safe to delete
-- outright without touching FormFieldResponse.
DELETE FROM "FormBlock" WHERE type = 'buttons';