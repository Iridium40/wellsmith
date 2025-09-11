import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-muted-foreground">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <Link to="/" aria-label="WellSmith home">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fa42b6f9ec53e4654a92af75aad56d14f%2Fe512b2f9960d4ab08f24edaf8cb2b0e8"
                alt="WellSmith logo"
                className="h-16 w-auto md:h-20"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="mt-2 max-w-xs">
              Personalized Optavia coaching for sustainable, healthy living.
            </p>
            <p className="mt-2 max-w-xs text-xs text-muted-foreground">
              This site does not provide medical advice. Consult your physician
              before beginning any program.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-2">
            <Link to="/my-story" className="hover:text-foreground">
              My Story
            </Link>
            <Link to="/why-coaching" className="hover:text-foreground">
              Client Support
            </Link>
            <Link to="/recipes" className="hover:text-foreground">
              Lean & Green Recipe Ideas
            </Link>
            <Link to="/book-assessment" className="hover:text-foreground">
              Book Assessment
            </Link>
            <a
              href={
                import.meta.env.VITE_OPTAVIA_COACH_URL ||
                "https://www.optavia.com/us/en/coach/kaycesmith"
              }
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              Start Your Journey
            </a>
            <a
              href="https://www.optavia.com/us/en/coach/kaycesmith"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              OPTAVIA Coach Profile
            </a>
            <a
              href="https://www.facebook.com/kayces"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground inline-flex items-center gap-1"
            >
              <Facebook className="h-4 w-4" /> Facebook
            </a>
            <a
              href="https://www.instagram.com/smithkayce/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground inline-flex items-center gap-1"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </nav>
          <div className="md:text-right">
            <div className="font-medium text-foreground">Ready to begin?</div>
            <a
              href={
                import.meta.env.VITE_OPTAVIA_COACH_URL ||
                "https://www.optavia.com/us/en/coach/kaycesmith"
              }
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              Start Your Journey
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t pt-6 md:flex-row">
          <p>© {new Date().getFullYear()} WellSmith. All rights reserved.</p>
          <p>Built with love for healthy habits.</p>
        </div>
      </div>
    </footer>
  );
}
