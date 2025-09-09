import Disclaimer from "@/components/site/Disclaimer";

export default function BlogProtein() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Eating Enough Protein</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Protein helps maintain lean mass, supports satiety, and aids recovery during weight loss.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl">
        <img
          src="https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1400&q=80"
          alt="High‑protein meal prep with vegetables"
          className="h-auto w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="prose prose-slate mt-6 max-w-none">
        <ul>
          <li>Many do well at 0.7–1.0 g protein per lb of goal body weight (individualize).</li>
          <li>Distribute across meals (20–35 g each) to maximize muscle protein synthesis.</li>
          <li>Mix sources: poultry, fish, lean beef, eggs, dairy, soy, and legumes.</li>
        </ul>
      </div>

      <Disclaimer className="mt-10" />
    </div>
  );
}
