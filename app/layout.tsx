import type React from "react"
import type { Metadata } from "next"
import { Tajawal, Cairo, Almarai, Readex_Pro } from "next/font/google"
import { Suspense } from "react"
import Script from "next/script"
import connectDB from "@/lib/db"
import SiteContent from "@/models/SiteContent"
import "./globals.css"

const tajawal = Tajawal({ subsets: ["arabic", "latin"], weight: ["200", "300", "400", "500", "700", "800", "900"], display: "swap", variable: "--font-tajawal" })
const cairo = Cairo({ subsets: ["arabic", "latin"], display: "swap", variable: "--font-cairo" })
const almarai = Almarai({ subsets: ["arabic"], weight: ["300", "400", "700", "800"], display: "swap", variable: "--font-almarai" })
const readexPro = Readex_Pro({ subsets: ["arabic", "latin"], display: "swap", variable: "--font-readex-pro" })

function getFontVariable(fontName: string) {
  switch (fontName) {
    case "Cairo": return cairo.variable
    case "Almarai": return almarai.variable
    case "Readex Pro": return readexPro.variable
    default: return tajawal.variable
  }
}

export async function generateMetadata(): Promise<Metadata> {
  let phone = "+966536788004"
  try {
    const db = await connectDB()
    if (db) {
      const pDoc = await SiteContent.findOne({ key: 'contact_phone' }).lean()
      if (pDoc && pDoc.value) phone = pDoc.value as string
    }
  } catch (e) {}

  return {
    title: `شركة DGR Diamond Growth للمقاولات والاتصالات بالسعودية والأردن`,
    description: `شركة DGR Diamond Growth متخصصة في الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية في السعودية والأردن والمملكة العربية السعودية.`,
    keywords: [`DGR Diamond Growth`, `مقاولات بالسعودية والأردن`, `أنظمة التيار الخفيف`, `إنشاء أبراج الاتصالات`, `أنظمة المراقبة`, `الأعمال الكهروميكانيكية`],
    generator: "Next.js",
    icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
    openGraph: {
      title: `شركة DGR Diamond Growth للمقاولات والاتصالات بالسعودية والأردن`,
      description: `شركة DGR Diamond Growth متخصصة في الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية. 📞 للتواصل: ${phone}`,
      url: "https://www.nmudiamond.com/",
      siteName: "DGR Diamond Growth",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `شركة DGR Diamond Growth للمقاولات` }],
      locale: "ar_SA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `شركة DGR Diamond Growth للمقاولات والاتصالات بالسعودية والأردن`,
      description: `شركة DGR Diamond Growth متخصصة في الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف. 📞 للتواصل: ${phone}`,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let phone = "+966536788004"
  let primaryColor = "#0D2240"
  let secondaryColor = "#C4D600"
  let fontName = "Tajawal"

  try {
    const db = await connectDB()
    if (db) {
      const content = await SiteContent.find({
        key: { $in: ['contact_phone', 'theme_primary_color', 'theme_secondary_color', 'theme_font'] }
      }).lean()
      
      const pDoc = content.find((c: any) => c.key === 'contact_phone')
      const pcDoc = content.find((c: any) => c.key === 'theme_primary_color')
      const scDoc = content.find((c: any) => c.key === 'theme_secondary_color')
      const fnDoc = content.find((c: any) => c.key === 'theme_font')
      
      if (pDoc && pDoc.value) phone = pDoc.value as string
      if (pcDoc && pcDoc.value) primaryColor = pcDoc.value as string
      if (scDoc && scDoc.value) secondaryColor = scDoc.value as string
      if (fnDoc && fnDoc.value) fontName = fnDoc.value as string
    }
  } catch (e) {}

  const fontVariable = getFontVariable(fontName)

  // Inject CSS to override hardcoded Tailwind colors
  const customCss = `
    .bg-\\[\\#0D2240\\], .dark .dark\\:bg-\\[\\#0D2240\\] { background-color: ${primaryColor} !important; }
    .text-\\[\\#0D2240\\], .dark .dark\\:text-\\[\\#0D2240\\] { color: ${primaryColor} !important; }
    .border-\\[\\#0D2240\\] { border-color: ${primaryColor} !important; }
    .fill-\\[\\#0D2240\\] { fill: ${primaryColor} !important; }
    .from-\\[\\#0D2240\\] { --tw-gradient-from: ${primaryColor} var(--tw-gradient-from-position) !important; }
    .to-\\[\\#0D2240\\] { --tw-gradient-to: ${primaryColor} var(--tw-gradient-to-position) !important; }
    
    .bg-\\[\\#C4D600\\] { background-color: ${secondaryColor} !important; }
    .text-\\[\\#C4D600\\] { color: ${secondaryColor} !important; }
    .border-\\[\\#C4D600\\] { border-color: ${secondaryColor} !important; }
    .hover\\:text-\\[\\#C4D600\\]:hover { color: ${secondaryColor} !important; }
    .hover\\:bg-\\[\\#C4D600\\]:hover { background-color: ${secondaryColor} !important; }
    
    :root {
      --font-tajawal: var(${fontVariable});
    }
  `

  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="author" content={`DGR Diamond Growth`} />
        <meta name="telephone" content={phone} />
        
        <style dangerouslySetInnerHTML={{ __html: customCss }} />

        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-WSP986F000" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WSP986F000');
            `,
          }}
        />

        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": `DGR Diamond Growth`,
              "url": "https://www.nmudiamond.com/",
              "telephone": phone,
              "description": `شركة DGR Diamond Growth متخصصة في الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية بالسعودية والأردن.`,
            }),
          }}
        />
      </head>
      <body className={`font-sans ${fontVariable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
