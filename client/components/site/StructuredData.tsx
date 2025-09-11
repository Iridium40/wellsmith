import { useEffect } from "react";

interface StructuredDataProps {
  data: Record<string, any>;
}

export default function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [data]);

  return null;
}

// Predefined structured data schemas
export const createArticleSchema = ({
  title,
  description,
  author,
  publishedTime,
  modifiedTime,
  image,
  url,
  section = "Health & Wellness",
  tags = [],
}: {
  title: string;
  description: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  image: string;
  url: string;
  section?: string;
  tags?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  author: {
    "@type": "Person",
    name: author,
    url: "https://wellsmith.example/about",
  },
  publisher: {
    "@type": "Organization",
    name: "WellSmith",
    logo: {
      "@type": "ImageObject",
      url: "https://cdn.builder.io/api/v1/image/assets%2Fa42b6f9ec53e4654a92af75aad56d14f%2Fef0136ecdde74b46be05d2666c884154?format=webp&width=512",
    },
  },
  datePublished: publishedTime,
  dateModified: modifiedTime || publishedTime,
  image: {
    "@type": "ImageObject",
    url: image,
  },
  url,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": url,
  },
  articleSection: section,
  keywords: tags.join(", "),
});

export const createBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});
