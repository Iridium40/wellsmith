import Disclaimer from "@/components/site/Disclaimer";
import SEO from "@/components/site/SEO";

export default function GetStarted() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <SEO
        title="Get Started with Trilivy | WellSmith"
        description="Start your Trilivy journey: program overview, what to expect, and next steps."
      />
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        Get Started with Trilivy
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Official program overview and next steps
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold">Program Overview</h2>
          <p className="mt-2 text-sm text-foreground/80">
            Different plan options are available. You'll pair scientifically
            designed products with self‑prepared Lean & Green meals, guided by
            your coach and community.
          </p>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold">What to Expect</h2>
          <ul className="mt-2 grid gap-2 text-sm text-foreground/80">
            <li>Clinically proven nutrition plans</li>
            <li>Personal coach support (Kayce)</li>
            <li>Supportive community</li>
            <li>Simple, structured daily routine</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={
            import.meta.env.VITE_TRILIVY_COACH_URL ||
            "https://www.trilivyhealth.com/us/en/coach/kaycesmith"
          }
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-white shadow hover:opacity-95"
        >
          Start Your Journey
        </a>
        <a
          href="https://www.trilivyhealth.com/us/en/trilivy-program"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-md border px-6 hover:bg-secondary"
        >
          Learn More About Trilivy
        </a>
      </div>

      <Disclaimer className="mt-10" />
    </div>
  );
}
