import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(65%_40%_at_50%_-10%,theme(colors.secondary/70),transparent_70%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Transform Your Health with Personalized Optavia Coaching
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Get accessible and personalized health and wellness coaching from the comfort of your home.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="shadow">
                <Link to="/book-assessment">Book Your Free Health Assessment</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/success-stories">Read Success Stories</Link>
              </Button>
            </div>
            <ul className="mt-8 grid gap-3 text-sm text-foreground/80 sm:grid-cols-2">
              {[
                "Personalized one-on-one coaching",
                "Proven Optavia program results",
                "Ongoing support and accountability",
                "Flexible online coaching sessions",
                "Safe, supportive environment",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-lg border bg-white/60 px-4 py-3">
                  <span className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-2xl border bg-gradient-to-br from-white to-secondary p-1 shadow-sm">
              <div className="absolute inset-0 -z-10 bg-[conic-gradient(from_180deg_at_50%_50%,theme(colors.primary/10),transparent_50%,theme(colors.accent/10))]" />
              <div className="grid h-full place-items-center rounded-xl bg-white/70 backdrop-blur">
                <div className="text-center">
                  <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent" />
                  <p className="mt-4 text-sm font-medium text-muted-foreground">Coaching by</p>
                  <p className="text-2xl font-bold">Kayce Smith</p>
                  <p className="mt-1 text-sm text-muted-foreground">Certified Optavia Health Coach</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-2xl font-bold tracking-tight">How I Help</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">Simple, sustainable strategies tailored to your life—backed by a proven program and compassionate accountability.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Health Coaching", desc: "Weekly check-ins, personalized guidance, and habit building." },
            { title: "Meal Planning & Recipes", desc: "Lean & Green meals, shopping lists, and prep tips." },
            { title: "Accountability & Support", desc: "Motivation, mindset, and steady progress tracking." },
            { title: "Habit Formation", desc: "Small changes that compound into life-long health." },
          ].map((s) => (
            <div key={s.title} className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent" />
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,theme(colors.secondary/60),transparent_70%)]" />
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <blockquote className="rounded-2xl border bg-card p-6 shadow-sm">
                <p className="text-lg font-medium">“Kayce helped me lose 28 lbs in 12 weeks and, more importantly, gain my energy and confidence back.”</p>
                <footer className="mt-3 text-sm text-muted-foreground">Sarah H., busy mom of 3</footer>
              </blockquote>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border bg-white p-4 text-center">
                  <div className="text-3xl font-extrabold text-primary">12w</div>
                  <div className="text-sm text-muted-foreground">Typical first-phase timeline</div>
                </div>
                <div className="rounded-xl border bg-white p-4 text-center">
                  <div className="text-3xl font-extrabold text-primary">28 lbs</div>
                  <div className="text-sm text-muted-foreground">Average client loss highlighted</div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative mx-auto aspect-[16/12] max-w-xl overflow-hidden rounded-2xl border bg-gradient-to-br from-white to-secondary p-1 shadow-sm">
                <div className="grid h-full place-items-center rounded-xl bg-white/70 backdrop-blur">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex w-56 items-center justify-between text-xs">
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-primary">Before</span>
                      <span className="rounded-full bg-accent/10 px-2 py-1 text-accent">After</span>
                    </div>
                    <div className="mx-auto h-40 w-40 rounded-full bg-gradient-to-br from-primary/40 to-accent/40" />
                    <p className="mt-3 text-sm text-muted-foreground">Real transformations featured on the Success Stories page.</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button asChild>
                  <Link to="/success-stories">Read Success Stories</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/resources">Get Free Resources</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid items-center gap-6 rounded-2xl border bg-gradient-to-br from-primary/10 to-accent/10 p-8 text-center shadow-sm md:grid-cols-2 md:text-left">
          <div>
            <h3 className="text-2xl font-bold">Ready to start your own transformation?</h3>
            <p className="mt-2 text-muted-foreground">Book a free assessment and get a roadmap tailored to your goals.</p>
          </div>
          <div className="md:text-right">
            <Button asChild size="lg" className="shadow">
              <Link to="/book-assessment">Book Your Free Health Assessment</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
