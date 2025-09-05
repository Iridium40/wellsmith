import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Kayce" },
  { to: "/success-stories", label: "Success Stories" },
  { to: "/recipes", label: "Lean & Green Recipes" },
  { to: "/resources", label: "Resources" },
  { to: "/start-guide", label: "Start Optavia Guide" },
  { to: "/best-practices", label: "Best Practices" },
  { to: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-white font-bold">WS</div>
          <div className="leading-none">
            <div className="text-base font-extrabold tracking-tight text-foreground">WellSmith</div>
            <div className="text-xs text-muted-foreground">Optavia Health Coaching</div>
          </div>
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
          <Button asChild size="lg" className="shadow-sm">
            <Link to="/book-assessment">Book Assessment</Link>
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
