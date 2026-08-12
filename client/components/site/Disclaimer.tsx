export default function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <div
      className={
        "rounded-2xl border bg-white p-6 text-xs leading-6 text-muted-foreground " +
        className
      }
    >
      <h2 className="text-sm font-semibold text-foreground">
        Important Disclaimers
      </h2>
      <p className="mt-2">
        *Average weight loss on the Trilivy Optimal Weight 5 & 1 Plan® is 12 pounds.
        Clients are in weight loss, on average, for 12 weeks. Results may vary.
      </p>
      <p className="mt-2">
        *Medical advice, treatment, prescriptions, and the overall practice of
        medicine must be provided by a licensed healthcare professional. Trilivy
        and its coaches do not engage in or provide any medical services.
      </p>
      <p className="mt-2">
        Kayce Smith is an Independent Trilivy Certified Health Coach. This website 
        and its content are not affiliated with or endorsed by Trilivy LLC.
      </p>
      <p className="mt-2">
        Trilivy®, Optimal Weight 5 & 1 Plan®, and Lean & Green™ are trademarks 
        of Trilivy LLC and are used with permission.
      </p>
    </div>
  );
}
