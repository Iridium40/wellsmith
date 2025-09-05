import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,theme(colors.secondary/40),transparent_70%)]" />
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <figure className="order-2 overflow-hidden rounded-2xl border bg-card p-2 shadow-sm lg:order-1">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fa42b6f9ec53e4654a92af75aad56d14f%2Fd27ddcf236bd4f169f43e10d872a760e?format=webp&width=1200"
                alt="Kayce Smith"
                className="h-auto w-full rounded-xl object-cover"
                loading="eager"
                decoding="async"
              />
            </figure>

            <div className="order-1 lg:order-2">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">About Kayce</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                I help clients build healthy habits through compassionate, practical coaching. Every journey is personal—together we create a simple plan that fits your life.
              </p>
              <div className="mt-6 flex gap-3">
                <Button asChild size="lg">
                  <Link to="/book-assessment#health-assessment">Start Health Assessment</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/contact">Contact</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
