import Disclaimer from "@/components/site/Disclaimer";
import InstagramEmbed from "@/components/site/InstagramEmbed";

export default function MyStory() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">My Story</h1>
      <p className="mt-3 text-lg text-muted-foreground">Kayce's journey as an Independent OPTAVIA Certified Health Coach</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="prose prose-slate max-w-none">
          <p><strong>Losing 36 lbs in 2017 with OPTAVIA was life‑changing for me!</strong></p>
          <p>I was a stay‑at‑home mom—over‑exhausted and underwhelmed—when I had a chance conversation with the coach who would change my life. I jumped in with both feet.</p>
          <p>OPTAVIA helped me change my relationship with food and gave me the structure and energy to be the wife and mom I wanted to be. That experience led me to coaching—so others can feel what I felt.</p>
          <p>Six years later, I'm even more passionate about supporting clients through simple steps, daily encouragement, and a community that truly understands the journey.</p>
          <p>When you're ready, I'd be honored to be your coach.</p>
          <div className="mt-6">
            <a
              href={import.meta.env.VITE_OPTAVIA_COACH_URL || "https://www.optavia.com/us/en/coach/kaycesmith"}
              target="_blank" rel="noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-white shadow hover:opacity-95"
            >Ready to Start Your Own Journey? Let Me Be Your Coach!</a>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border bg-card p-2 shadow-sm">
          <img src="https://cdn.builder.io/api/v1/image/assets%2Fa42b6f9ec53e4654a92af75aad56d14f%2F5b0dafbaeac84bf8b97ef2a6e9700186?format=webp&width=1200" alt="Kayce Smith" className="h-auto w-full rounded-xl object-cover" />
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold tracking-tight">Follow on Instagram</h2>
        <p className="mt-2 text-muted-foreground">@smithkayce</p>
        <div className="mt-4 max-w-xl">
          <InstagramEmbed permalink="https://www.instagram.com/smithkayce/" />
        </div>
      </section>

      <Disclaimer className="mt-10" />
    </div>
  );
}
