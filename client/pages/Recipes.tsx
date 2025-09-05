export default function Recipes() {
  const recipes = [
    { title: "Garlic Lemon Chicken + Zoodles", calories: 380, carbs: 12, protein: 42 },
    { title: "Turkey Lettuce Wraps", calories: 340, carbs: 10, protein: 35 },
    { title: "Salmon + Asparagus", calories: 410, carbs: 9, protein: 40 },
    { title: "Beef Cauli‑Rice Bowl", calories: 395, carbs: 14, protein: 38 },
    { title: "Greek Chicken Salad", calories: 360, carbs: 11, protein: 37 },
    { title: "Shrimp Stir‑Fry", calories: 370, carbs: 13, protein: 39 },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Lean & Green Recipes</h1>
      <p className="mt-3 text-lg text-muted-foreground">Quick, flavorful meals that fit your plan and your schedule.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((r) => (
          <article key={r.title} className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="h-36 w-full rounded-xl bg-gradient-to-br from-primary/15 to-accent/15" />
            <h3 className="mt-4 text-lg font-semibold">{r.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {r.calories} cal • {r.carbs}g carbs • {r.protein}g protein
            </p>
            <button className="mt-3 text-sm font-medium text-primary hover:underline">View Recipe</button>
          </article>
        ))}
      </div>
    </div>
  );
}
