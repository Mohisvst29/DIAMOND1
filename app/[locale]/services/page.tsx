import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageBanner from "@/components/page-banner"
import ServicesGrid from "@/components/services-grid"
import ServicesCTA from "@/components/services-cta"
import { getServices } from "@/actions/service-actions"
import connectDB from "@/lib/db"
import SiteSettings from "@/models/SiteSettings"

export const metadata = {
  title: "خدماتنا - النمو الماسي",
  description:
    "شركة النمو الماسي تقدم خدمات المقاولات، الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية بأعلى جودة في السعودية والأردن والمملكة.",
  keywords: [
    "مقاولات عامة",
    "الأعمال المدنية",
    "شبكات الاتصالات",
    "أنظمة التيار الخفيف",
    "الخدمات الكهروميكانيكية",
    "شركة النمو الماسي",
    "مقاولات السعودية والأردن",
  ],
  openGraph: {
    title: "خدماتنا - النمو الماسي",
    description:
      "شركة النمو الماسي تقدم خدمات المقاولات، الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية بأعلى جودة في السعودية والأردن والمملكة.",
    url: "https://www.dgrcon.com/services",
    siteName: "النمو الماسي",
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "خدماتنا - النمو الماسي",
    description:
      "شركة النمو الماسي تقدم خدمات المقاولات، الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية بأعلى جودة في السعودية والأردن والمملكة.",
  },
}

export default async function ServicesPage() {
  await connectDB()

  const [services, settings] = await Promise.all([
    getServices(),
    SiteSettings.findOne({}).lean()
  ])
  
  const bannerImage = settings?.covers?.services || ''
  const bannerTitle = 'خدماتنا'
  const bannerSubtitle = 'نقدم مجموعة شاملة من الخدمات الهندسية والمقاولات لتلبية جميع احتياجاتكم'

  const plainServices = JSON.parse(JSON.stringify(services))

  return (
    <main className="min-h-screen">
      <Header />
      <PageBanner
        image={bannerImage}
        title={bannerTitle}
        subtitle={bannerSubtitle}
        fallbackImage=""
      />
      <ServicesGrid services={plainServices} />
      <ServicesCTA />
      <Footer />
      <FloatingContact />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "النمو الماسي",
            "description": "شركة متخصصة في الأعمال المدنية والاتصالات وأنظمة التيار الخفيف والكهروميكانيكا.",
            "url": "https://www.dgrcon.com/",
            "telephone": "+966536788004",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "السعودية والأردن",
              "addressLocality": "السعودية والأردن",
              "addressCountry": "SA"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 24.7136,
              "longitude": 46.6753
            },
            "openingHours": "Su,Mo,Tu,We,Th 08:00-17:00",
            "sameAs": [
              "https://www.dgrcon.com/"
            ]
          }),
        }}
      />
    </main>
  )
}
