export function PageSkeleton() {
  return (
    <main className="mx-auto grid max-w-4xl gap-6 p-6 md:p-8 animate-pulse">
      <div className="h-8 w-48 rounded-md bg-muted" />
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="h-24 rounded-xl bg-muted" />
        <div className="h-24 rounded-xl bg-muted" />
        <div className="h-24 rounded-xl bg-muted" />
      </div>
      <div className="h-64 rounded-xl bg-muted" />
    </main>
  );
}