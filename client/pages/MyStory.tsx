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
          <h2 className="text-2xl font-bold tracking-tight">
            When Everything Changed
          </h2>
          <p>
            When our son Hayes was born with a right limb deficiency, my world
            shifted. I found myself in one of the darkest periods of my
            life—overwhelmed with worry, exhausted from endless medical
            appointments, and honestly, just sad. As a stay-at-home mom, I was
            struggling with my own health and energy while trying to navigate
            this new reality for our family.
          </p>
          <p>
            But looking at Hayes, I knew I had to be stronger. He was going to
            need a mom who could advocate for him, fight for him, and show him
            that challenges don't define us—how we respond to them does. I
            couldn't do that from the place I was in.
          </p>

          <h2 className="text-2xl font-bold tracking-tight">
            The Transformation That Saved Me
          </h2>
          <p>
            That's when I had a chance conversation with an OPTAVIA coach who
            would change my life. I was over-exhausted and underwhelmed, but I
            knew I had to jump in with both feet—not just for me, but for Hayes.
          </p>
          <p>
            <strong>
              Losing 36 lbs in 2017 with OPTAVIA was life-changing for me!
            </strong>
          </p>
          <p>
            OPTAVIA helped me change my relationship with food and gave me the
            structure and energy to be the wife and mom I wanted to be—the mom
            Hayes deserved. For the first time in years, I felt like{" "}
            <em>myself</em> again. I had energy to keep up with medical
            appointments, strength to research his needs, and the confidence to
            be his fiercest advocate.
          </p>
          <p>
            The transformation gave me more than just weight loss—it gave me
            resilience, tools to handle stress, and the unshakeable belief that
            we could handle whatever came our way.
          </p>

          <h2 className="text-2xl font-bold tracking-tight">
            From Personal Victory to Helping Others
          </h2>
          <p>
            That experience led me to coaching—so others can feel what I felt.
            Six years later, I'm even more passionate about supporting clients
            through simple steps, daily encouragement, and a community that
            truly understands the journey.
          </p>
          <p>
            I realized that transformation isn't just about weight loss—it's
            about becoming the person you need to be for the life you're living.
          </p>

          <h2 className="text-2xl font-bold tracking-tight">
            Author, Advocate, and Resource Builder
          </h2>
          <p>
            Once I had my health, energy, and confidence back, I knew I could
            achieve anything I set my mind to. Hayes was growing up in a world
            where he rarely saw children like himself represented in books or
            media. With my bachelor's degree in English from Millsaps College
            and my newfound strength, I did what any determined mom would do—I
            wrote the books I wanted him to see.
          </p>
          <p>
            I authored a children's book series featuring Hayes with "a leg of
            steel that changed as he grew." These books show children with
            prosthetics doing everything—playing basketball, golf, surfing,
            ninja kicks, and more! The series highlights the incredible work of
            Shriners Hospitals for Children, who have been instrumental in our
            journey.
          </p>
          <p>
            But I didn't stop there. I created{" "}
            <strong>
              <a
                href="https://www.whatcanhayesbe.com/"
                target="_blank"
                rel="noreferrer"
              >
                www.whatcanhayesbe.com
              </a>
            </strong>
            , a website dedicated to providing education, information, and
            resources for families navigating limb differences like ours.
            Because I know what it feels like to have a million questions and
            not know where to turn.
          </p>

          <h2 className="text-2xl font-bold tracking-tight">
            Why This Matters for Your Journey
          </h2>
          <p>
            When I work with clients now, I bring all of these experiences with
            me:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              I understand what it feels like to be in a dark place and need to
              find strength you didn't know you had
            </li>
            <li>
              I know how transformation gives you tools for whatever life brings
              your way
            </li>
            <li>
              I've learned that taking care of yourself isn't selfish—it's
              necessary to take care of everyone else
            </li>
            <li>
              I've experienced how feeling strong and energized empowers you to
              advocate for what matters most
            </li>
          </ul>
          <p>
            Whether you're a parent facing unexpected challenges, someone
            feeling overwhelmed by life's demands, or simply ready to reclaim
            your energy and confidence—I've been there. I know what it's like to
            feel like you're drowning, and I know what it takes to pull yourself
            up and become stronger than you ever imagined.
          </p>

          <h2 className="text-2xl font-bold tracking-tight">
            Ready to Discover What You're Capable Of?
          </h2>
          <p>
            From finding strength in my darkest moment to losing weight,
            becoming a coach, writing books, and building resources for other
            families—my OPTAVIA transformation was the catalyst that made it all
            possible.
          </p>
          <p>
            When you feel your best, there's no limit to what you can achieve or
            who you can help along the way.
          </p>
          <p>
            <strong>
              When you're ready to start your own transformation journey, I'd be
              honored to be your coach.
            </strong>
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
