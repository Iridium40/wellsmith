import Disclaimer from "@/components/site/Disclaimer";
import InstagramEmbed from "@/components/site/InstagramEmbed";
import SEO from "@/components/site/SEO";
import { MY_STORY_IMAGE } from "@/components/site/MyStoryShared";

export default function MyStory() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <SEO
        title="My Story | WellSmith"
        description="Kayce’s 36‑lb transformation with OPTAVIA and how it led to coaching others to lasting change."
      />
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        My Story
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Kayce's journey as an Independent OPTAVIA Certified Health Coach
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">The Transformation That Changed Everything</h2>
          <p>
            <strong>Losing 36 lbs in 2017 with OPTAVIA was life-changing for me!</strong>
          </p>
          <p>
            I was a stay-at-home mom—over-exhausted and underwhelmed—when I had a chance conversation with the coach who would change my life. I jumped in with both feet.
          </p>
          <p>
            OPTAVIA helped me change my relationship with food and gave me the structure and energy to be the wife and mom I wanted to be. For the first time in years, I felt like <em>myself</em> again. I had energy to play with my son, confidence in my own skin, and a sense that I could tackle whatever life threw my way.
          </p>

          <h2 className="text-2xl font-bold tracking-tight">When Life Tested That New Confidence</h2>
          <p>
            Little did I know how much I would need that strength and energy. When we learned that our son Hayes was born with a right limb deficiency, I could have easily fallen back into old patterns of feeling overwhelmed and exhausted. But something was different this time.
          </p>
          <p>
            The transformation I'd experienced with OPTAVIA had given me more than just weight loss—it had given me resilience, the tools to handle stress, and the unshakeable belief that challenges don't define us; how we respond to them does.
          </p>

          <h2 className="text-2xl font-bold tracking-tight">From Personal Victory to Helping Others</h2>
          <p>
            That experience led me to coaching—so others can feel what I felt. Six years later, I'm even more passionate about supporting clients through simple steps, daily encouragement, and a community that truly understands the journey.
          </p>
          <p>
            But my story didn't stop there. Once I had my health, energy, and confidence back, I realized I could achieve anything I set my mind to. Hayes was growing up in a world where he rarely saw children like himself represented in books or media. So I did what any determined mom would do—I wrote the books I wanted him to see.
          </p>

          <h2 className="text-2xl font-bold tracking-tight">Author and Advocate</h2>
          <p>
            With my bachelor's degree in English from Millsaps College and newfound confidence, I authored a children's book series featuring Hayes with "a leg of steel that changed as he grew." These books show children with prosthetics doing everything—playing basketball, golf, surfing, ninja kicks, and more!
          </p>
          <p>
            The series highlights the incredible work of Shriners Hospitals for Children, who have been instrumental in our journey, and provides representation and hope for families like ours.
          </p>

          <h2 className="text-2xl font-bold tracking-tight">Why This Matters for Your Journey</h2>
          <p>When I work with clients now, I bring all of these experiences with me:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>I understand what it feels like to be overwhelmed and ready for change</li>
            <li>I know firsthand how transformation gives you tools for whatever life brings</li>
            <li>I've learned that when you feel strong and energized, you can advocate for what matters most</li>
            <li>I've experienced how taking care of yourself actually makes you better at taking care of everyone else</li>
          </ul>
          <p>
            Whether you're a busy parent feeling exhausted, someone juggling unexpected challenges, or simply ready to reclaim your energy and confidence—I've been there. And I know that when you feel your best, there's no limit to what you can achieve.
          </p>

          <h2 className="text-2xl font-bold tracking-tight">Ready to Discover What You're Capable Of?</h2>
          <p>
            From losing weight to writing books to advocating for my son, my OPTAVIA transformation was just the beginning. When you're ready to start your own journey of transformation and discovery, I'd be honored to be your coach.
          </p>
          <p>
            <strong>When you're ready, I'd be honored to be your coach.</strong>
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border bg-card p-2 shadow-sm">
          <img
            src={MY_STORY_IMAGE}
            alt="Kayce Smith"
            className="h-auto w-full rounded-xl object-cover"
          />
        </div>
      </div>

      <div className="mt-6">
        <a
          href={
            import.meta.env.VITE_OPTAVIA_COACH_URL ||
            "https://www.optavia.com/us/en/coach/kaycesmith"
          }
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-white shadow hover:opacity-95"
        >
          Ready to Start Your Own Journey? Let Me Be Your Coach!
        </a>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold tracking-tight">
          Follow on Instagram
        </h2>
        <p className="mt-2 text-muted-foreground">@smithkayce</p>
        <div className="mt-4 max-w-xl">
          <a
            href="https://www.instagram.com/smithkayce/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            Visit @smithkayce on Instagram
          </a>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border bg-card p-4 shadow-sm max-w-3xl mx-auto">
        <h2 className="text-lg font-semibold">Children's Books by Kayce</h2>
        <p className="mt-2 text-sm text-foreground/80">
          What Can Hayes Be? and “Hayes & the Big Game!”
        </p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 place-items-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fa42b6f9ec53e4654a92af75aad56d14f%2F21ffa0e7b9d44094bc713665a04b67aa?format=webp&width=800"
            alt="What Can Hayes Be? book cover"
            className="mx-auto h-56 w-auto rounded-md border object-contain"
            loading="lazy"
            decoding="async"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fa42b6f9ec53e4654a92af75aad56d14f%2Fa757bbca89da455d9171a2e999a75fb5?format=webp&width=800"
            alt="Hayes and the Big Game book cover"
            className="mx-auto h-56 w-auto rounded-md border object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="mt-4">
          <a
            href="https://www.whatcanhayesbe.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-primary to-accent px-4 text-sm text-white shadow hover:opacity-95"
          >
            Shop the books
          </a>
        </div>
      </section>

      <Disclaimer className="mt-10" />
    </div>
  );
}
