export default function TableSkeleton() {
  const TABLE_HEIGHT = 600;
  const ROW_HEIGHT = 50;
  const SKELETON_ROWS = TABLE_HEIGHT / ROW_HEIGHT;

  return (
    <div
      style={{ height: TABLE_HEIGHT }}
      className="overflow-hidden mt-4"
      aria-busy="true"
      aria-live="polite"
    >
      {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
        <div
          key={i}
          className="h-12.5 bg-gray-200 animate-pulse rounded mb-2"
        />
      ))}
    </div>
  );
}
