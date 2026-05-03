import React from "react"
import Link from "next/link"
import Head from "next/head"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageBanner from "@/components/page-banner"
import connectDB from "@/lib/db"
import Post from "@/models/Post"
import SiteContent from "@/models/SiteContent"

export const revalidate = 3600 // إعادة التحقق كل ساعة

export default async function BlogListingPage() {
  // await connectDB()

  // جلب المقالات والبانر
  // const [posts, bannerDoc] = await Promise.all([
  //   Post.find({ isPublished: true }).sort({ createdAt: -1 }),
  //   SiteContent.findOne({ key: "banner_blog" }),
  // ])
  const posts: any[] = [
    {
      slug: "importance-of-civil-works",
      title: "أهمية الأعمال المدنية في المشاريع الكبرى",
      excerpt: "تعرف على الدور الحيوي الذي تلعبه الأعمال المدنية في استقرار ومتانة المشاريع الإنشائية.",
      featuredImage: "/service-civil.jpg",
      publishedAt: "2024-01-15T10:00:00Z"
    },
    {
      slug: "future-of-telecom",
      title: "مستقبل شبكات الاتصالات في البنية التحتية",
      excerpt: "كيف تساهم شبكات الألياف الضوئية في تعزيز كفاءة الاتصالات للشركات والمؤسسات.",
      featuredImage: "/service-telecom.jpg",
      publishedAt: "2024-02-20T14:30:00Z"
    }
  ]
  const bannerDoc: any = null

  // إعداد بيانات البانر
  const banner = bannerDoc?.value || {}
  const bannerImage = banner.image || "/aaa.png"
  const bannerTitle = banner.title || "المدونة"
  const bannerSubtitle =
    banner.subtitle ||
    "اكتشف أحدث النصائح والاتجاهات في عالم المقاولات والأنظمة المتكاملة"

  // بيانات الصفحة للـ SEO
  const pageTitle = "مدونة شركة DGR Diamond Growth للمقاولات بالسعودية والأردن"
  const pageDescription =
    "اقرأ أحدث المقالات والدلائل حول المقاولات العامة وأنظمة الاتصالات والتيار الخفيف بالسعودية والأردن من شركة DGR Diamond Growth."
  const pageUrl = "https://www.nmudiamond.com/blog"
  const pageImage = bannerImage

  // Structured Data لكل المقالات
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
    publisher: {
      "@type": "Organization",
      name: "شركة DGR Diamond Growth",
      logo: {
        "@type": "ImageObject",
        url: "https://www.nmudiamond.com/logo.png",
      },
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      image: post.featuredImage
        ? `https://www.nmudiamond.com${post.featuredImage}`
        : undefined,
      author: {
        "@type": "Person",
        name: "شركة DGR Diamond Growth",
      },
      datePublished: post.publishedAt || post.createdAt,
      dateModified: post.updatedAt || post.createdAt,
      url: `https://www.nmudiamond.com/blog/${post.slug}`,
      description: post.excerpt,
    })),
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Head للـ SEO ووسائل التواصل */}
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={pageImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
      </Head>

      <Header />

      <PageBanner
        image={bannerImage}
        title={bannerTitle}
        subtitle={bannerSubtitle}
        fallbackImage="/aaa.png"
      />

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${encodeURIComponent(post.slug)}`}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {post.featuredImage && (
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-bold text-[#0D2240] mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
              </div>
            </Link>
          ))}

          {posts.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              لا توجد مقالات منشورة حالياً.
            </div>
          )}
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Footer />
      <FloatingContact />
    </main>
  )
}
