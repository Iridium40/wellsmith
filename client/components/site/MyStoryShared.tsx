export const MY_STORY_IMAGE =
  "https://cdn.builder.io/api/v1/image/assets%2Fa42b6f9ec53e4654a92af75aad56d14f%2F5b0dafbaeac84bf8b97ef2a6e9700186?format=webp&width=1200";

export const MY_STORY_PARAGRAPHS: string[] = [
  "Losing 36 lbs in 2017 with OPTAVIA was life‑changing for me!",
  "I was a stay‑at‑home mom—over‑exhausted and underwhelmed—when I had a chance conversation with the coach who would change my life. I jumped in with both feet.",
  "OPTAVIA helped me change my relationship with food and gave me the structure and energy to be the wife and mom I wanted to be. That experience led me to coaching—so others can feel what I felt.",
  "Six years later, I'm even more passionate about supporting clients through simple steps, daily encouragement, and a community that truly understands the journey.",
  "When you're ready, I'd be honored to be your coach.",
];

export function StoryProse({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? MY_STORY_PARAGRAPHS.slice(0, limit) : MY_STORY_PARAGRAPHS;
  return (
    <div className="prose prose-slate max-w-none">
      {items.map((text, i) => (
        <p key={i}>{i === 0 ? <strong>{text}</strong> : text}</p>
      ))}
    </div>
  );
}
