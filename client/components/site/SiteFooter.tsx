import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-muted-foreground">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <Link to="/" aria-label="WellSmith home">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fa42b6f9ec53e4654a92af75aad56d14f%2F5c5b419b80d94e2fa4a2fc6699e87482?format=webp&width=800"
                alt="WellSmith logo"
                className="h-16 w-auto md:h-20"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="mt-2 max-w-xs">Personalized Optavia coaching for sustainable, healthy living.</p>
            <p className="mt-2 max-w-xs text-xs text-muted-foreground">This site does not provide medical advice. Consult your physician before beginning any program.</p>
          </div>
          <nav className="grid grid-cols-2 gap-2">
            <Link to="/program" className="hover:text-foreground">Program Overview</Link>
            <Link to="/success-stories" className="hover:text-foreground">Success Stories</Link>
            <Link to="/faqs" className="hover:text-foreground">FAQs</Link>
            <Link to="/recipes" className="hover:text-foreground">Lean & Green Recipes</Link>
            <Link to="/resources" className="hover:text-foreground">Resources</Link>
            <Link to="/start-guide" className="hover:text-foreground">Start Optavia Guide</Link>
            <Link to="/contact" className="hover:text-foreground">Contact</Link>
          </nav>
          <div className="md:text-right">
            <div className="font-medium text-foreground">Ready to begin?</div>
            <Link to="/book-assessment" className="text-primary hover:underline">Book your free assessment</Link>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t pt-6 md:flex-row">
          <p>
            © {new Date().getFullYear()} WellSmith. All rights reserved.
          </p>
          <p>Built with love for healthy habits.</p>
        </div>
      </div>
    </footer>
  );
}
