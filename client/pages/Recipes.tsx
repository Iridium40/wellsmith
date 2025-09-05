import { useEffect, useState } from "react";
import type { PinterestResponse, PinterestPin } from "@shared/api";

export default function Recipes() {
  const [pins, setPins] = useState<PinterestPin[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/pinterest");
        if (!res.ok) throw new Error("Failed to load Pinterest feed");
        const data = (await res.json()) as PinterestResponse | { error: string };
        if ("pins" in data) {
          if (mounted) setPins(data.pins);
        } else {
          throw new Error((data as any).error || "Unable to parse feed");
        }
      } catch (e: any) {
        if (mounted) setError(e?.message || "Error");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Lean & Green Recipes</h1>
      <p className="mt-3 text-lg text-muted-foreground">Pulled from Kayce's Pinterest board and updated automatically.</p>

      {loading && <p className="mt-6 text-sm text-muted-foreground">Loading recipes…</p>}
      {error && (
        <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          {error}. Please provide a public Pinterest board URL via the PINTEREST_BOARD_URL environment variable.
        </div>
      )}

      {pins && (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pins.map((p, i) => (
            <a key={p.link + i} href={p.link} target="_blank" rel="noreferrer" className="group rounded-2xl border bg-card p-2 shadow-sm">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
                <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105" loading="lazy" />
              </div>
              <h3 className="mt-3 line-clamp-2 text-sm font-medium">{p.title}</h3>
              <p className="text-xs text-muted-foreground">View on Pinterest</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
