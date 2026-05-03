import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageBanner from "@/components/page-banner"
import ProjectsGallery from "@/components/projects-gallery"
import ProjectsStats from "@/components/projects-stats"
import { getProjects } from "@/actions/project-actions"
import connectDB from "@/lib/db"
import SiteContent from "@/models/SiteContent"

export const metadata = {
  title: "معرض المشاريع - DGR Diamond Growth",
  description:
    "استعرض أفضل مشاريع شركة DGR Diamond Growth في المقاولات، الأعمال المدنية، الاتصالات، وأنظمة التيار الخفيف في السعودية والأردن والمملكة.",
}

export default async function ProjectsPage() {
  // await connectDB()

  // const [projects, bannerDoc] = await Promise.all([
  //   getProjects(),
  //   SiteContent.findOne({ key: 'banner_projects' })
  // ])
  const projects: any[] = [
    {
      _id: "1",
      title: "مشروع البنية التحتية لشبكات الاتصالات",
      description: "تنفيذ شبكة ألياف ضوئية متكاملة لربط مرافق حكومية في السعودية والأردن.",
      category: "شبكات الاتصالات",
      image: "/service-telecom.jpg",
      slug: "telecom-infrastructure-riyadh"
    },
    {
      _id: "2",
      title: "تجهيز أنظمة التيار الخفيف لبرج تجاري",
      description: "توريد وتركيب أنظمة المراقبة وإنذار الحريق لأحد الأبراج التجارية الكبرى.",
      category: "أنظمة التيار الخفيف",
      image: "/service-low-current.jpg",
      slug: "commercial-tower-low-current"
    },
    {
      _id: "3",
      title: "أعمال مدنية لمجمع سكني",
      description: "تنفيذ الأعمال الإنشائية والمدنية لمجمع سكني متكامل.",
      category: "الأعمال المدنية",
      image: "/service-civil.jpg",
      slug: "residential-complex-civil"
    }
  ]
  const bannerDoc: any = null

  const banner = bannerDoc?.value || {}
  const bannerImage = banner.image || '/bb.png'
  const bannerTitle = banner.title || 'معرض المشاريع'
  const bannerSubtitle = banner.subtitle || 'استعرض مجموعة من أفضل مشاريعنا المنجزة التي تعكس خبرتنا وجودة عملنا'

  const pageTitle =
    "معرض المشاريع - DGR Diamond Growth"
  const pageDescription =
    "استعرض أفضل مشاريع شركة DGR Diamond Growth في المقاولات، الأعمال المدنية، الاتصالات، وأنظمة التيار الخفيف."

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageTitle,
    description: pageDescription,
    url: "https://www.nmudiamond.com/projects",
    hasPart: projects.map((p: any) => ({
      "@type": "CreativeWork",
      name: p.title,
      description: p.description,
    }))
  }

  const plainProjects = JSON.parse(JSON.stringify(projects))

  return (
    <main className="min-h-screen">
      <Header />
      <PageBanner
        image={bannerImage}
        title={bannerTitle}
        subtitle={bannerSubtitle}
        fallbackImage="/bb.png"
      />
      <ProjectsStats />
      <ProjectsGallery projects={plainProjects} />

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
