import PortfolioExperience from "@/components/portfolio-experience";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://minte-portfolio.vercel.app";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mintesnot Saleamlak",
    jobTitle: "Video Editor & Visual Storyteller",
    url: siteUrl,
    sameAs: [
      "https://www.instagram.com/outofsync.genz/",
      "https://wa.me/251905559398",
    ],
    knowsAbout: [
      "Video Editing",
      "Motion Graphics",
      "Color Grading",
      "Sound Design",
      "Premiere Pro",
      "After Effects",
      "Social Media Content",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PortfolioExperience />
    </>
  );
}
