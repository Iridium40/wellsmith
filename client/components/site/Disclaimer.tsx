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
      {/* Required health disclaimer. Keep verbatim and keep it first — the
          contraindications are the safety-critical part. The same text appears
          in the welcome email footer; changes belong in both. */}
      <p className="mt-2">
        This content is provided by an independent Trilivy health coach and is
        for general informational purposes only. It is not medical advice, and
        your coach is not a medical provider. The Trilivy 5&1 Reset is not
        appropriate for everyone — it is not intended for women who are pregnant
        or nursing, people under 18, sedentary adults 65+, people with gout, or
        those managing Type 1 diabetes. Consult your healthcare provider before
        starting this or any weight-loss program, especially if you take
        medications for diabetes, blood pressure, or thyroid conditions, or
        medications such as Coumadin (warfarin), lithium, or diuretics.
        Individual results vary. If you experience unusual symptoms or unusually
        rapid weight loss, stop and contact your healthcare provider.
      </p>
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
