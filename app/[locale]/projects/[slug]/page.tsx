import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import ProjectDetail from "@/components/project-detail"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

const mockProjects = [
  {
    _id: "1",
    title: "مشروع البنية التحتية لشبكات الاتصالات",
    description: "تنفيذ شبكة ألياف ضوئية متكاملة لربط مرافق حكومية في السعودية والأردن.",
    category: "شبكات الاتصالات",
    image: "/service-telecom.jpg",
    slug: "telecom-infrastructure-riyadh",
    href: "/projects/telecom-infrastructure-riyadh",
    client: "جهة حكومية",
    date: "2023",
    location: "السعودية والأردن، المملكة العربية السعودية",
    content: "تم بنجاح الانتهاء من تنفيذ وتمديد شبكات الألياف الضوئية (Fiber Optics) للربط بين منشآت حيوية في العاصمة السعودية والأردن. المشروع شمل أعمال الحفر والتمديد والربط والاختبار والتشغيل، وفقاً لأعلى مواصفات الجودة."
  },
  {
    _id: "2",
    title: "تجهيز أنظمة التيار الخفيف لبرج تجاري",
    description: "توريد وتركيب أنظمة المراقبة وإنذار الحريق لأحد الأبراج التجارية الكبرى.",
    category: "أنظمة التيار الخفيف",
    image: "/service-low-current.jpg",
    slug: "commercial-tower-low-current",
    href: "/projects/commercial-tower-low-current",
    client: "شركة تطوير عقاري",
    date: "2023",
    location: "السعودية والأردن، المملكة العربية السعودية",
    content: "قمنا في Diamond Growth بتوريد وتركيب جميع أنظمة التيار الخفيف اللازمة لتشغيل البرج التجاري بكفاءة عالية. تضمن المشروع كاميرات مراقبة حديثة، أنظمة التحكم في الأبواب، وأحدث أنظمة إنذار وكشف الحريق."
  },
  {
    _id: "3",
    title: "أعمال مدنية لمجمع سكني",
    description: "تنفيذ الأعمال الإنشائية والمدنية لمجمع سكني متكامل.",
    category: "الأعمال المدنية",
    image: "/service-civil.jpg",
    slug: "residential-complex-civil",
    href: "/projects/residential-complex-civil",
    client: "مستثمر خاص",
    date: "2024",
    location: "السعودية والأردن، المملكة العربية السعودية",
    content: "تم تنفيذ الأعمال المدنية الأساسية والتشطيبات لمشروع مجمع سكني مكون من 50 وحدة سكنية. شمل العمل أعمال الأساسات، الهيكل الخرساني، والتشطيبات الخارجية والداخلية المتميزة."
  }
]

export async function generateStaticParams() {
  return mockProjects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = mockProjects.find((p) => p.slug === decodeURIComponent(params.slug))

  if (!project) {
    return {
      title: "المشروع غير موجود",
    }
  }

  return {
    title: `${project.title} - Diamond Growth`,
    description: project.description,
  }
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = mockProjects.find((p) => p.slug === decodeURIComponent(params.slug))

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />
      <ProjectDetail project={project} />
      <Footer />
      <FloatingContact />
    </main>
  )
}
