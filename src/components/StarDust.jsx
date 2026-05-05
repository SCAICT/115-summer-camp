export default function StarDust() {
  return (
    <>
      <div className="star-dust pointer-events-none absolute inset-0 opacity-60" />
      {/* 流星 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="meteor meteor-1" />
        <div className="meteor meteor-2" />
        <div className="meteor meteor-3" />
      </div>
    </>
  );
}
