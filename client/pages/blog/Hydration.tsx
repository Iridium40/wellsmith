import Disclaimer from "@/components/site/Disclaimer";

export default function BlogHydration() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
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
        <ul>
          <li>Target 64+ oz daily; many feel best at ~½ body‑weight (oz).</li>
          <li>
            Spread intake through the day; start with 8–16 oz in the morning.
          </li>
          <li>
            Consider electrolytes if lightheaded or cramping; limit sugary
            drinks.
          </li>
        </ul>
      </div>

      <Disclaimer className="mt-10" />
    </div>
  );
}
