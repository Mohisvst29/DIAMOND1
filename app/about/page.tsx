import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageBanner from "@/components/page-banner"
import CompanyStory from "@/components/company-story"
import VisionMission from "@/components/vision-mission"
import TeamSection from "@/components/team-section"
import AchievementsCounter from "@/components/achievements-counter"
import connectDB from "@/lib/db"
import SiteContent from "@/models/SiteContent"

export const metadata = {
  title: "من نحن - DGR Diamond Growth",
  description:
    "شركة DGR Diamond Growth هي شركة مقاولات تأسست في المملكة العربية السعودية عام 2023، متخصصة في الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية.",
  keywords: [
    "من نحن",
    "DGR Diamond Growth",
    "شركة مقاولات بالسعودية والأردن",
    "الأعمال المدنية",
    "الاتصالات",
    "التيار الخفيف",
    "الكهروميكانيكية"
  ],
  openGraph: {
    title: "من نحن - DGR Diamond Growth",
    description:
      "شركة DGR Diamond Growth هي شركة مقاولات تأسست في المملكة العربية السعودية عام 2023، متخصصة في الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية.",
    url: "https://www.nmudiamond.com/about",
    siteName: "DGR Diamond Growth",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: "https://www.nmudiamond.com/about-hero.png",
        alt: "من نحن - DGR Diamond Growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "من نحن - DGR Diamond Growth",
    description:
      "شركة DGR Diamond Growth متخصصة في الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية.",
  },
}

export default async function AboutPage() {
  // await connectDB()
  // const bannerDoc = await SiteContent.findOne({ key: 'banner_about' })
  const bannerDoc: any = null

  const banner = bannerDoc?.value || {}
  const bannerImage = banner.image || '/1%20(11).png'
  const bannerTitle = banner.title || 'من نحن'
  const bannerSubtitle = banner.subtitle || 'شركة DGR Diamond Growth متخصصة في الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية.'

  return (
    <main className="min-h-screen">
      <Header />
      <PageBanner
        image={bannerImage}
        title={bannerTitle}
        subtitle={bannerSubtitle}
        fallbackImage="/1%20(11).png"
      />
      <CompanyStory />
      <VisionMission />
      <TeamSection />
      <AchievementsCounter />
      <Footer />
      <FloatingContact />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "من نحن - DGR Diamond Growth",
            description:
              "شركة DGR Diamond Growth متخصصة في الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية.",
            url: "https://www.nmudiamond.com/about",
            mainEntity: {
              "@type": "Organization",
              name: "DGR Diamond Growth",
              url: "https://www.nmudiamond.com/",
              telephone: "+966536788004",
              address: {
                "@type": "PostalAddress",
                addressLocality: "السعودية والأردن",
                addressCountry: "SA",
              },
            },
          }),
        }}
      />
    </main>
  )
}
