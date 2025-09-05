import Disclaimer from "@/components/site/Disclaimer";

export default function WhyCoaching() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Why Choose Coaching</h1>
      <p className="mt-3 text-lg text-muted-foreground">Support that helps you go farther than dieting alone—based on OPTAVIA's official program</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold">Why OPTAVIA Works</h2>
          <ul className="mt-3 grid gap-2 text-sm text-foreground/80">
            <li>Average weight loss on the Optimal Weight 5 & 1 Plan® is 12 pounds*</li>
            <li>More than 3 million lives impacted and counting</li>
            <li>Clinically proven nutrition plans</li>
            <li>Support from your personal coach and community</li>
          </ul>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold">The 3‑Step Approach</h2>
          <ol className="mt-3 list-decimal pl-5 text-sm text-foreground/80">
            <li>Set your 'why' and map your journey</li>
            <li>Connect with your coach and community</li>
            <li>Simplify your eating habits</li>
          </ol>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border bg-white p-6 text-sm">
        <h2 className="text-lg font-semibold">Kayce's Coaching</h2>
        <p className="mt-2">Former client turned coach—six years of experience helping busy moms and families build sustainable habits with compassion and accountability.</p>
      </div>

      <div className="mt-8">
        <a
          href="/book-with-kayce"
          className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-white shadow hover:opacity-95"
        >Book with Kayce</a>
      </div>

      <Disclaimer className="mt-10" />
    </div>
  );
}
