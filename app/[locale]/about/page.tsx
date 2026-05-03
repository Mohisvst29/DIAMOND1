import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageBanner from "@/components/page-banner"
import CompanyStory from "@/components/company-story"
import VisionMission from "@/components/vision-mission"
import TeamSection from "@/components/team-section"
import AchievementsCounter from "@/components/achievements-counter"
import connectDB from "@/lib/db"
import SiteSettings from "@/models/SiteSettings"

export const metadata = {
  title: "من نحن - النمو الماسي",
  description:
    "شركة النمو الماسي هي شركة مقاولات تأسست في المملكة العربية السعودية عام 2023، متخصصة في الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية.",
  keywords: [
    "من نحن",
    "النمو الماسي",
    "شركة مقاولات بالسعودية والأردن",
    "الأعمال المدنية",
    "الاتصالات",
    "التيار الخفيف",
    "الكهروميكانيكية"
  ],
  openGraph: {
    title: "من نحن - النمو الماسي",
    description:
      "شركة النمو الماسي هي شركة مقاولات تأسست في المملكة العربية السعودية عام 2023، متخصصة في الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية.",
    url: "https://www.nmudiamond.com/about",
    siteName: "النمو الماسي",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: "https://www.nmudiamond.com/about-hero.png",
        alt: "من نحن - النمو الماسي",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "من نحن - النمو الماسي",
    description:
      "شركة النمو الماسي متخصصة في الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية.",
  },
}

export default async function AboutPage() {
  await connectDB()
  const settings = await SiteSettings.findOne({}).lean() || {}
  const plainSettings = JSON.parse(JSON.stringify(settings))

  const bannerImage = settings?.covers?.about || ''
  const bannerTitle = 'من نحن'
  const bannerSubtitle = settings?.seo?.description || 'شركة النمو الماسي متخصصة في الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية.'

  return (
    <main className="min-h-screen">
      <Header />
      <PageBanner
        image={bannerImage}
        title={bannerTitle}
        subtitle={bannerSubtitle}
        fallbackImage=""
      />
      <CompanyStory settings={plainSettings} />
      <VisionMission settings={plainSettings} />
      <TeamSection teamMembers={plainSettings?.team || []} />
      <AchievementsCounter settings={plainSettings} />
      <Footer />
      <FloatingContact />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "من نحن - النمو الماسي",
            description:
              "شركة النمو الماسي متخصصة في الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية.",
            url: "https://www.nmudiamond.com/about",
            mainEntity: {
              "@type": "Organization",
              name: "النمو الماسي",
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
