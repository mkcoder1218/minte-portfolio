import PortfolioExperience from "@/components/portfolio-experience";
import ProjectModalController from "@/components/project-modal-controller";
import MotionDirector from "@/components/motion-director";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

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
      <ProjectModalController />
      <MotionDirector />
    </>
  );
}
