import Disclaimer from "@/components/site/Disclaimer";
import SEO from "@/components/site/SEO";

export default function BlogHydration() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <SEO
        title="Drinking Enough Water | WellSmith Blog"
        description="Hydration supports appetite regulation, energy, digestion, and overall wellbeing. Tips to hit your daily water goal."
        image="https://cdn.builder.io/api/v1/image/assets%2Fa42b6f9ec53e4654a92af75aad56d14f%2Fd0195bb19ac44a7a9e95332565ec3727?format=webp&width=1200"
      />
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        Drinking Enough Water
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Hydration supports appetite regulation, energy, digestion, and overall
        wellbeing.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fa42b6f9ec53e4654a92af75aad56d14f%2Fd0195bb19ac44a7a9e95332565ec3727?format=webp&width=800"
          alt="Glass of water being poured"
          className="h-auto w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="prose prose-slate mt-6 max-w-none">
        <p>
          Hydration influences appetite, energy, digestion, and even how your workouts feel. On GLP‑1s,
          drinking consistently can ease GI side effects and help you feel steady between meals.
        </p>
        <p>
          A practical target is <strong>64+ ounces</strong> daily, though many people do well closer to
          half their body‑weight (in ounces). Use a marked bottle or set reminders to spread intake across
          the day rather than chugging at night.
        </p>
        <p>
          Start your morning with 8–16 oz of water before coffee. Keep a bottle visible at your desk or in
          the car, and take a few sips whenever you switch tasks. Small, frequent sips are easier on the
          stomach than large gulps.
        </p>
        <p>
          If you notice lightheadedness, headaches, or muscle cramps—especially in heat or after exercise—add
          electrolytes. Choose options low in sugar and monitor how you feel; you may only need them on more
          active days.
        </p>
        <p>
          Prefer flavor? Try infused water (citrus, berries, mint), unsweetened iced tea, or sparkling water.
          Limit sugary beverages and alcohol, which can work against hydration goals and appetite signals.
        </p>
        <p>
          Track your progress for a week and see what supports consistency—time blocks, favorite bottle,
          flavored fizzy water, or pairing drinking with existing habits. The best plan is the one you’ll keep.
        </p>
      </div>

      <Disclaimer className="mt-10" />
    </div>
  );
}
