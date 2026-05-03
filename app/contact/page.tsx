import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageBanner from "@/components/page-banner"
import ContactForm from "@/components/contact-form"
import ContactInfo from "@/components/contact-info"
import ContactMap from "@/components/contact-map"
import connectDB from "@/lib/db"
import SiteContent from "@/models/SiteContent"

export const metadata = {
  title: "تواصل معنا - DGR Diamond Growth",
  description:
    "تواصل مع شركة DGR Diamond Growth للحصول على استشارة وعرض سعر مخصص لمشاريع المقاولات والأنظمة الكهروميكانيكية والاتصالات في السعودية والأردن.",
  keywords: [
    "تواصل معنا",
    "شركة DGR Diamond Growth",
    "شركة مقاولات بالسعودية والأردن",
    "اتصل بنا مقاولات",
    "طلب عرض سعر",
    "استشارة مقاولات",
    "الأعمال المدنية",
    "أنظمة التيار الخفيف",
    "البنية التحتية",
  ],
  openGraph: {
    title: "تواصل معنا - DGR Diamond Growth",
    description:
      "تواصل مع شركة DGR Diamond Growth للحصول على استشارة وعرض سعر مخصص لمشاريع المقاولات والأنظمة الكهروميكانيكية والاتصالات في السعودية والأردن.",
    url: "https://www.nmudiamond.com/contact",
    siteName: "DGR Diamond Growth",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: "https://www.nmudiamond.com/contact-hero.png",
        alt: "تواصل معنا - DGR Diamond Growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "تواصل معنا - DGR Diamond Growth",
    description:
      "تواصل مع شركة DGR Diamond Growth للحصول على استشارة وعرض سعر مخصص لمشاريع المقاولات والأنظمة الكهروميكانيكية والاتصالات في السعودية والأردن.",
  },
}

export default async function ContactPage() {
  let phone = "+966536788004"
  try {
    const db = await connectDB()
    if (db) {
      const doc = await SiteContent.findOne({ key: 'contact_phone' }).lean()
      if (doc && doc.value) phone = doc.value as string
    }
  } catch (e) {}

  // const bannerDoc = await SiteContent.findOne({ key: 'banner_contact' })
  const bannerDoc: any = null

  const banner = bannerDoc?.value || {}
  const bannerImage = banner.image || '/mm.png'
  const bannerTitle = banner.title || 'تواصل معنا'
  const bannerSubtitle = banner.subtitle || 'نحن هنا لمساعدتك في تحقيق مشروع أحلامك. تواصل معنا الآن للحصول على استشارة'

  return (
    <main className="min-h-screen">
      <Header />
      <PageBanner
        image={bannerImage}
        title={bannerTitle}
        subtitle={bannerSubtitle}
        fallbackImage="/mm.png"
      />
      <div className="grid lg:grid-cols-2 gap-0">
        <ContactForm whatsappPhone={phone} />
        <ContactInfo />
      </div>
      <ContactMap />
      <Footer />
      <FloatingContact />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "تواصل معنا - DGR Diamond Growth",
            description:
              "تواصل مع شركة DGR Diamond Growth للحصول على استشارة وعرض سعر مخصص لمشاريع المقاولات والأنظمة الكهروميكانيكية والاتصالات في السعودية والأردن.",
            url: "https://www.nmudiamond.com/contact",
            mainEntity: {
              "@type": "Organization",
              name: "DGR Diamond Growth",
              url: "https://www.nmudiamond.com/",
              telephone: phone,
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
