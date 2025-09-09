import { Link } from "react-router-dom";
import SEO from "@/components/site/SEO";

const posts = [
  {
    slug: "eating-right-on-glp1",
    title: "Eating Right on GLP-1s",
    excerpt:
      "Practical nutrition tips to feel great and sustain progress while on GLP‑1 medications.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "drinking-enough-water",
    title: "Drinking Enough Water",
    excerpt:
      "Why hydration matters for energy, appetite, and overall health—plus easy ways to hit your goal.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa42b6f9ec53e4654a92af75aad56d14f%2Fd0195bb19ac44a7a9e95332565ec3727?format=webp&width=800",
  },
  {
    slug: "getting-enough-sleep",
    title: "Getting Enough Sleep",
    excerpt:
      "Sleep is a superpower for weight loss and health—here’s how to improve your nightly routine.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa42b6f9ec53e4654a92af75aad56d14f%2F155c7ececc0848188255f02e0c732cc6?format=webp&width=800",
  },
  {
    slug: "right-portions",
    title: "Eating the Right Portions",
    excerpt:
      "Simple portion strategies that keep you satisfied and on‑plan without the guesswork.",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "enough-protein",
    title: "Eating Enough Protein",
    excerpt:
      "How much protein you need, best sources, and easy ways to hit your target daily.",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "meditation-healthy-movement",
    title: "Meditation and Healthy Movement",
    excerpt:
      "Reduce stress and build consistent movement with short, sustainable practices.",
    image:
      "https://images.unsplash.com/photo-1540206276207-3af25c08abc4?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Blog() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <SEO
        title="WellSmith Blog | GLP‑1 Support, Hydration, Sleep, Portions, Protein"
        description="Evidence‑informed articles on weight loss, healthy habits, GLP‑1 support, hydration, sleep, portions, and protein from WellSmith."
        image="https://cdn.builder.io/api/v1/image/assets%2Fa42b6f9ec53e4654a92af75aad56d14f%2Faea5685e48d24a62805449ee868fa228?format=webp&width=1200"
      />
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        Blog
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Evidence‑informed tips for weight loss, healthy habits, and GLP‑1
        support.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.slug}
            to={`/blog/${p.slug}`}
            className="group rounded-2xl border bg-card p-2 shadow-sm"
          >
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
              <img
                src={p.image}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <h2 className="mt-3 text-lg font-semibold">{p.title}</h2>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {p.excerpt}
            </p>
            <p className="text-xs text-muted-foreground">Read more →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
