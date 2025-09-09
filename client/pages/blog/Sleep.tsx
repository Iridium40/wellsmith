import Disclaimer from "@/components/site/Disclaimer";

export default function BlogSleep() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Getting Enough Sleep</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Sleep quality influences hunger hormones, recovery, and weight management.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl">
        <img
          src="https://cdn.pixabay.com/photo/2016/03/27/20/57/bed-1284238_1280.jpg"
          alt="Cozy bed for restful sleep"
          className="h-auto w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="prose prose-slate mt-6 max-w-none">
        <ul>
          <li>Build a wind‑down routine; dim lights and reduce screens before bed.</li>
          <li>7–9 hours suits most adults; keep a consistent sleep/wake time.</li>
          <li>Create a cool, dark, quiet environment to improve sleep depth.</li>
        </ul>
      </div>

      <Disclaimer className="mt-10" />
    </div>
  );
}
