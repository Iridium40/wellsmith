import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stories = [
  { name: "Sarah H.", change: "-28 lbs in 12 weeks", quote: "I have my energy and confidence back.", role: "Busy mom of 3" },
  { name: "James P.", change: "-42 lbs in 5 months", quote: "The daily support kept me consistent.", role: "Sales manager" },
  { name: "Alyssa T.", change: "-18 lbs in 8 weeks", quote: "Simple steps that fit my life.", role: "Teacher" },
  { name: "Daniel R.", change: "-35 lbs in 16 weeks", quote: "The structure was exactly what I needed.", role: "Nurse" },
  { name: "Megan L.", change: "-22 lbs in 10 weeks", quote: "Cooking for my family works with this.", role: "Designer" },
  { name: "Chris V.", change: "-50 lbs in 6 months", quote: "Habits of Health changed everything.", role: "Engineer" },
];

export default function SuccessStories() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Success Stories</h1>
      <p className="mt-3 text-lg text-muted-foreground">Real client transformations made possible with structure, accountability, and compassionate coaching.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((s) => (
          <article key={s.name} className="rounded-2xl border bg-card p-4 shadow-sm">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 p-3">
              <div className="mx-auto my-10 h-32 w-32 rounded-full bg-gradient-to-br from-primary/40 to-accent/40" />
              <div className="absolute left-3 top-3 rounded-full bg-primary/90 px-2 py-1 text-xs font-medium text-white">Before</div>
              <div className="absolute bottom-3 right-3 rounded-full bg-accent/90 px-2 py-1 text-xs font-medium text-white">After</div>
            </div>
            <h3 className="mt-4 text-lg font-semibold">{s.name}</h3>
            <p className="text-sm text-muted-foreground">{s.role}</p>
            <p className="mt-2 text-sm">{s.change}</p>
            <blockquote className="mt-2 border-l-2 pl-3 text-sm italic text-foreground/80">“{s.quote}”</blockquote>
          </article>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button asChild size="lg">
          <Link to="/book-assessment">Start Your Transformation</Link>
        </Button>
      </div>
    </div>
  );
}
