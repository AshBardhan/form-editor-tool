export default function NotFound() {
  return (
    <div className="empty-content flex-col gap-3">
      <h2 className="text-lg font-semibold">
        Form not found
      </h2>

      <p className="text-sm">
        Please check the form ID.
      </p>
    </div>
  );
}