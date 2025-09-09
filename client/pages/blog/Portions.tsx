import Disclaimer from "@/components/site/Disclaimer";

export default function BlogPortions() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        Eating the Right Portions
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Portion targets keep you fueled without overeating—simple cues help you
        stay consistent.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl">
        <img
          src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1400&q=80"
          alt="Balanced plate with salmon and vegetables"
          className="h-auto w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="prose prose-slate mt-6 max-w-none">
        <ul>
          <li>Lean protein: 5–7 oz cooked (palm‑size) for most adults.</li>
          <li>Non‑starchy vegetables: 3 servings per Lean & Green meal.</li>
          <li>Healthy fats/condiments: follow plan guidance to personalize.</li>
        </ul>
      </div>

      <Disclaimer className="mt-10" />
    </div>
  );
}
