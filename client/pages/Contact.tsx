import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEO from "@/components/site/SEO";
import { Facebook, Instagram } from "lucide-react";
import InstagramEmbed from "@/components/site/InstagramEmbed";

export default function Contact() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <SEO
        title="Connect with Kayce | WellSmith"
        description="Connect with Kayce Smith. Book a call, message on social, or start through Trilivy."
      />
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        Connect with Kayce
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Start your journey through Trilivy's official system.
      </p>

      <div className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
        <p className="text-sm text-foreground/80">
          Trilivy Coach Profile:{" "}
          <a
            className="text-primary hover:underline"
            href="https://www.trilivyhealth.com/us/en/coach/kaycesmith"
            target="_blank"
            rel="noreferrer"
          >
            trilivyhealth.com/kaycesmith
          </a>
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild variant="gradient">
            <a
              href={
                import.meta.env.VITE_TRILIVY_COACH_URL ||
                "https://www.trilivyhealth.com/us/en/coach/kaycesmith"
              }
              target="_blank"
              rel="noreferrer"
            >
              Connect via Trilivy
            </a>
          </Button>
          <Button asChild>
            <a href="/book-assessment">Book with Kayce</a>
          </Button>
        </div>
        <div className="mt-4 text-sm text-foreground/80">
          <span>Social: </span>
          <a
            className="text-primary hover:underline inline-flex items-center gap-1"
            href="https://www.facebook.com/kayces"
            target="_blank"
            rel="noreferrer"
          >
            <Facebook className="h-4 w-4" /> Facebook
          </a>
          <span className="mx-2">•</span>
          <a
            className="text-primary hover:underline inline-flex items-center gap-1"
            href="https://www.instagram.com/smithkayce/"
            target="_blank"
            rel="noreferrer"
          >
            <Instagram className="h-4 w-4" /> Instagram
          </a>
        </div>
      </div>

      <div className="mt-8">
        <InstagramEmbed permalink="https://www.instagram.com/smithkayce/" />
      </div>

      <div className="mt-8 rounded-2xl border bg-white p-6 text-xs leading-6 text-muted-foreground">
        <h2 className="text-sm font-semibold text-foreground">Disclaimer</h2>
        <p className="mt-2">
          Information provided is for educational purposes only and is not
          intended to diagnose, treat, cure, or prevent any disease. Consult
          your physician before starting any weight loss, nutrition, or exercise
          program.
        </p>
        <p className="mt-2">
          Results vary based on individual effort, adherence, and health
          history. We do not guarantee specific outcomes.
        </p>
      </div>
    </div>
  );
}
