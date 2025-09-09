import Disclaimer from "@/components/site/Disclaimer";

export default function BlogMeditationMovement() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        Meditation and Healthy Movement
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Calm your nervous system and build momentum with gentle, sustainable
        movement habits.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl">
        <img
          src="https://images.unsplash.com/photo-1540206276207-3af25c08abc4?auto=format&fit=crop&w=1400&q=80"
          alt="Person meditating outdoors at sunrise"
          className="h-auto w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="prose prose-slate mt-6 max-w-none">
        <h2>Start With Your Breath</h2>
        <p>
          Try 2–5 minutes of diaphragmatic breathing or a simple box breath
          (inhale 4, hold 4, exhale 4, hold 4). This activates the
          parasympathetic system, reducing stress‑eating cues and improving
          focus.
        </p>
        <h2>Daily Movement, Not Max Effort</h2>
        <p>
          Aim for low‑to‑moderate activity most days: brisk walking, light
          strength, yoga, or mobility flows. Consistency beats
          intensity—especially alongside GLP‑1 journeys.
        </p>
        <h2>Habit Stack</h2>
        <p>
          Attach a quick stretch or 10‑minute walk to things you already do
          (morning coffee, lunch break, post‑dinner). Small, repeated wins
          create lasting change.
        </p>
        <h2>Recover to Progress</h2>
        <p>
          Restorative practices—yoga nidra, gentle stretching, and quality
          sleep—help you adapt and avoid burnout.
        </p>
      </div>

      <Disclaimer className="mt-10" />
    </div>
  );
}
