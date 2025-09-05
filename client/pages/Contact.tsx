import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Contact Kayce</h1>
      <p className="mt-3 text-lg text-muted-foreground">Questions about coaching or your plan? I'm here to help.</p>

      <div className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
        <p className="text-sm text-foreground/80">Email: <a className="text-primary hover:underline" href="mailto:kaycecsmith@yahoo.com">kaycecsmith@yahoo.com</a></p>
        <p className="mt-2 text-sm text-foreground/80">Preferred: complete the <Link className="text-primary hover:underline" to="/book-assessment#health-assessment">Health Assessment</Link> first so I can best support you.</p>
        <p className="mt-2 text-sm text-foreground/80">Optavia Coach Profile: <a className="text-primary hover:underline" href="https://www.optavia.com/us/en/coach/kaycesmith" target="_blank" rel="noreferrer">optavia.com/kaycesmith</a></p>
        <div className="mt-4">
          <Button asChild>
            <Link to="/book-assessment#health-assessment">Start Health Assessment</Link>
          </Button>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border bg-white p-6 text-xs leading-6 text-muted-foreground">
        <h2 className="text-sm font-semibold text-foreground">Disclaimer</h2>
        <p className="mt-2">
          Information provided is for educational purposes only and is not intended to diagnose, treat, cure, or prevent any disease. Consult your physician before starting any weight loss, nutrition, or exercise program.
        </p>
        <p className="mt-2">
          Results vary based on individual effort, adherence, and health history. We do not guarantee specific outcomes.
        </p>
      </div>
    </div>
  );
}
