import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/my-story", label: "My Story" },
  { to: "/why-coaching", label: "Why Choose Coaching" },
  { to: "/recipes", label: "Lean & Green Recipe Ideas" },
  { to: "/get-started", label: "Get Started with OPTAVIA" },
  { to: "/connect", label: "Connect with Kayce" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        <Link to="/" className="flex items-center gap-2" aria-label="WellSmith home">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fa42b6f9ec53e4654a92af75aad56d14f%2Fac77e7c0850e4d88a385f135957ff613?format=webp&width=800"
            alt="WellSmith logo"
            className="h-20 w-auto"
            loading="eager"
            decoding="async"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-foreground",
                  isActive && "text-foreground bg-secondary/70",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild size="lg" variant="gradient" className="shadow-sm">
            <a href={import.meta.env.VITE_OPTAVIA_COACH_URL || "https://www.optavia.com/us/en/coach/kaycesmith"} target="_blank" rel="noreferrer">Start Your Journey with Me</a>
          </Button>
        </div>

        <button
          aria-label="Toggle Menu"
          className="grid place-items-center rounded-md p-2 text-foreground hover:bg-secondary lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-current">
            <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t bg-white lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <div className="grid gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "block rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary",
                      isActive ? "bg-secondary text-foreground" : "text-foreground/80",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Button asChild className="mt-2 w-full">
                <Link to="/book-assessment">Book Your Free Health Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
