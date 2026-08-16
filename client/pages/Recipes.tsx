import { useMemo, useState } from "react";
import SEO from "@/components/site/SEO";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  recipes,
  RECIPE_CATEGORIES,
  type Recipe,
  type RecipeCategory,
} from "@/data/recipes";

const PAGE_SIZE = 12;

function CountBadges({ counts }: { counts: Recipe["counts"] }) {
  const items = [
    { label: "Lean", value: counts.lean },
    { label: "Green", value: counts.green },
    { label: "Healthy Fat", value: counts.fat },
    { label: "Condiment", value: counts.condiment },
  ].filter((i) => i.value > 0);

  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((i) => (
        <span
          key={i.label}
          className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
        >
          {i.value} {i.label}
          {i.value > 1 ? "s" : ""}
        </span>
      ))}
    </div>
  );
}

export default function Recipes() {
  const [category, setCategory] = useState<RecipeCategory | "All">("All");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<Recipe | null>(null);

  const filtered = useMemo(
    () =>
      category === "All"
        ? recipes
        : recipes.filter((r) => r.category === category),
    [category],
  );

  const shown = filtered.slice(0, visible);

  function pick(next: RecipeCategory | "All") {
    setCategory(next);
    setVisible(PAGE_SIZE);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <SEO
        title="Trilivy Lean & Green™ Recipe Ideas | WellSmith"
        description="42 Lean & Green recipe ideas with ingredients, instructions, and serving counts to support your Trilivy journey."
      />
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        Trilivy Lean & Green™ Recipe Ideas
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        {recipes.length} recipes with ingredients, instructions, and serving
        counts. Always follow your specific Trilivy plan guidelines.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {(["All", ...RECIPE_CATEGORIES] as const).map((c) => {
          const active = category === c;
          const count =
            c === "All"
              ? recipes.length
              : recipes.filter((r) => r.category === c).length;
          return (
            <button
              key={c}
              onClick={() => pick(c)}
              aria-pressed={active}
              className={`inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium transition-colors ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "hover:bg-secondary"
              }`}
            >
              {c}
              <span
                className={`ml-1.5 text-xs ${active ? "opacity-80" : "text-muted-foreground"}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((r) => (
          <button
            key={r.id}
            onClick={() => setSelected(r)}
            className="group rounded-2xl border bg-card p-2 text-left shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
              <img
                src={r.image}
                alt={r.title}
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-2">
              <h3 className="line-clamp-2 text-sm font-semibold">{r.title}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                {r.description}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {r.prepTime + r.cookTime} min · {r.servings} servings ·{" "}
                {r.difficulty}
              </p>
              <div className="mt-2">
                <CountBadges counts={r.counts} />
              </div>
            </div>
          </button>
        ))}
      </div>

      {visible < filtered.length && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium hover:bg-secondary"
          >
            Load more ({filtered.length - visible} remaining)
          </button>
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selected.title}</DialogTitle>
                <DialogDescription>{selected.description}</DialogDescription>
              </DialogHeader>

              <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span>Prep {selected.prepTime} min</span>
                <span>Cook {selected.cookTime} min</span>
                <span>{selected.servings} servings</span>
                <span>{selected.difficulty}</span>
              </div>
              <CountBadges counts={selected.counts} />

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold">Ingredients</h4>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {selected.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Instructions</h4>
                  <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                    {selected.instructions.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Serving counts are estimates. Confirm against your current
                Trilivy plan and consult your coach for personalized guidance.
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>

      <div className="mt-10 rounded-2xl border bg-white p-4 text-xs text-muted-foreground">
        Follow your specific Trilivy plan guidelines. Consult with your coach
        for personalized meal planning.
      </div>
    </div>
  );
}
