import { useMemo } from "react";
import { Button } from "@/components/ui/button";

export default function BookAssessment() {
  const calendlyUrl = import.meta.env.VITE_CALENDLY_URL as string | undefined;
  const tz = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,theme(colors.secondary/60),transparent_70%)]" />
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Book Your Free Health Assessment
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                A 30-minute conversation to learn about your goals and share how the Optavia program and personalized coaching can help. No pressure—just helpful, practical guidance.
              </p>
              <ul className="mt-6 grid gap-3 text-sm text-foreground/80">
                <li className="flex items-start gap-2"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" /> Time zone auto-detected: <span className="font-medium">{tz}</span></li>
                <li className="flex items-start gap-2"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" /> Choose from multiple time slots with reminders</li>
                <li className="flex items-start gap-2"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" /> Easy rescheduling when life happens</li>
              </ul>
              {!calendlyUrl && (
                <div className="mt-6 rounded-lg border bg-white p-4 text-sm text-amber-700">
                  Calendly is not configured yet. Add VITE_CALENDLY_URL to enable inline booking. You can still contact via the form below.
                </div>
              )}
              <div className="mt-6 flex gap-3">
                <Button asChild size="lg">
                  <a href="#pre-book">Fill Pre‑booking Form</a>
                </Button>
                {calendlyUrl && (
                  <Button asChild size="lg" variant="outline">
                    <a href="#schedule">Skip to Calendar</a>
                  </Button>
                )}
              </div>
            </div>
            <div id="schedule" className="w-full overflow-hidden rounded-xl border bg-card p-2 shadow-sm">
              {calendlyUrl ? (
                <iframe
                  title="Book with Kayce — Calendly"
                  src={`${calendlyUrl}`}
                  className="h-[640px] w-full rounded-lg"
                />
              ) : (
                <div className="p-6 text-sm text-muted-foreground">
                  Calendar will appear here once connected.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="pre-book" className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-2xl border bg-card p-8 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight">Pre‑booking Questionnaire</h2>
          <p className="mt-2 text-muted-foreground">
            Share a little about yourself so we can make the most of our time together.
          </p>

          <form className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
            <label className="grid gap-1">
              <span className="text-sm font-medium">Full Name</span>
              <input required name="name" className="h-11 rounded-md border bg-white px-3 outline-none ring-primary focus:ring-2" />
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-medium">Email</span>
              <input type="email" required name="email" className="h-11 rounded-md border bg-white px-3 outline-none ring-primary focus:ring-2" />
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-medium">Phone</span>
              <input name="phone" className="h-11 rounded-md border bg-white px-3 outline-none ring-primary focus:ring-2" />
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-medium">Best time to reach you</span>
              <input name="bestTime" className="h-11 rounded-md border bg-white px-3 outline-none ring-primary focus:ring-2" placeholder="Mornings, afternoons, etc." />
            </label>
            <label className="md:col-span-2 grid gap-1">
              <span className="text-sm font-medium">Current health/weight goals</span>
              <textarea name="goals" className="min-h-24 rounded-md border bg-white px-3 py-2 outline-none ring-primary focus:ring-2" />
            </label>
            <label className="md:col-span-2 grid gap-1">
              <span className="text-sm font-medium">Previous programs or experience</span>
              <textarea name="experience" className="min-h-24 rounded-md border bg-white px-3 py-2 outline-none ring-primary focus:ring-2" />
            </label>
            <label className="md:col-span-2 grid gap-1">
              <span className="text-sm font-medium">Questions or concerns</span>
              <textarea name="questions" className="min-h-24 rounded-md border bg-white px-3 py-2 outline-none ring-primary focus:ring-2" />
            </label>
            <div className="md:col-span-2">
              <Button type="submit" size="lg">Submit</Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
