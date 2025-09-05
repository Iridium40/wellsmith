import { Link } from "react-router-dom";

export default function Resources() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Resources</h1>
      <p className="mt-3 text-lg text-muted-foreground">Helpful guides and tools to support your journey.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Link to="/program" className="rounded-2xl border bg-card p-6 shadow-sm hover:bg-secondary">
          <h3 className="text-lg font-semibold">Program Overview</h3>
          <p className="mt-1 text-sm text-muted-foreground">How the plan works and what to expect.</p>
        </Link>
        <Link to="/faqs" className="rounded-2xl border bg-card p-6 shadow-sm hover:bg-secondary">
          <h3 className="text-lg font-semibold">FAQs</h3>
          <p className="mt-1 text-sm text-muted-foreground">Answers to common questions.</p>
        </Link>
        <Link to="/recipes" className="rounded-2xl border bg-card p-6 shadow-sm hover:bg-secondary">
          <h3 className="text-lg font-semibold">Lean & Green Recipes</h3>
          <p className="mt-1 text-sm text-muted-foreground">Meal ideas and inspiration.</p>
        </Link>
      </div>
    </div>
  );
}
