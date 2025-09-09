import Disclaimer from "@/components/site/Disclaimer";

export default function WhyCoaching() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-col gap-3 sm:gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Client Support
        </h1>
        <p className="text-lg text-muted-foreground">
          Practical tips for success on OPTAVIA's Optimal Weight 5 & 1 Plan®,
          hydration guidance, and coaching resources—everything in one place.
        </p>
        <div className="mt-4 self-center">
          <a
            href="/book-with-kayce"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-white shadow hover:opacity-95"
          >
            Book with Kayce
          </a>
        </div>
      </div>

      {/* Client Success */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold">Success Tips for the 5 & 1 Plan</h2>
          <ul className="mt-3 grid gap-2 text-sm text-foreground/80">
            <li>
              Eat all 5 fuelings plus 1 Lean & Green—set reminders if needed.
            </li>
            <li>
              Keep Lean & Green simple: 5–7 oz lean protein + 3 servings
              non‑starchy veggies.
            </li>
            <li>
              Limit extras: up to 2 condiments and 2 healthy fats when your plan
              calls for them.
            </li>
            <li>
              Check in daily with your coach; track sleep, water, movement, and
              mindset.
            </li>
            <li>
              Gentle movement and consistent sleep help—reset at the next
              fueling if you slip.
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold">Hydration Guide</h2>
          <ul className="mt-3 grid gap-2 text-sm text-foreground/80">
            <li>
              Target 64+ oz daily; many do well at ~½ body‑weight (oz). Spread
              it through the day.
            </li>
            <li>
              Start your morning with 8–16 oz; use a reusable bottle to track
              progress.
            </li>
            <li>
              Consider electrolytes if needed; limit caffeine and avoid sugary
              beverages.
            </li>
            <li>
              Watch for dehydration signs: headache, fatigue, dark
              urine—increase water as needed.
            </li>
          </ul>
        </div>
      </div>

      <Disclaimer className="mt-10" />
    </div>
  );
}
