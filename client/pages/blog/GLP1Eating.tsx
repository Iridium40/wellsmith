import Disclaimer from "@/components/site/Disclaimer";

export default function BlogGLP1Eating() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        Eating Right on GLP‑1s
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Strategies to feel your best, support muscle, and avoid common pitfalls
        while using GLP‑1 medications.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl">
        <img
          src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=80"
          alt="Colorful bowl with lean protein and vegetables"
          className="h-auto w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="prose prose-slate mt-6 max-w-none">
        <h2>Prioritize Protein</h2>
        <p>
          Aim for 20–35g of protein per meal to help maintain lean mass and
          support satiety. Include lean meats, fish, eggs, Greek yogurt, or
          tofu/tempeh.
        </p>
        <h2>Fiber & Hydration</h2>
        <p>
          Vegetables add volume and micronutrients. Increase fiber gradually and
          drink water throughout the day to reduce GI discomfort.
        </p>
        <h2>Slow, Structured Meals</h2>
        <p>
          Eat slowly, stop at comfortable fullness, and keep meals simple (lean
          protein + non‑starchy vegetables + healthy fats as needed).
        </p>
      </div>

      <Disclaimer className="mt-10" />
    </div>
  );
}
