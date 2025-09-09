import { Link } from "react-router-dom";
import SEO from "@/components/site/SEO";

import { posts } from "@/pages/blog/posts";

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
