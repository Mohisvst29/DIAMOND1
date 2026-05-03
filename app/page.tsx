import Header from "@/components/header"
import HeroSlider from "@/components/hero-slider"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import ProjectsSection from "@/components/projects-section"
import AchievementsCounter from "@/components/achievements-counter"
import MapSection from "@/components/map-section"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import SuccessPartners from "@/components/success-partners"
import { getProjects } from "@/actions/project-actions"
import { getServices } from "@/actions/service-actions"
import SiteContent from "@/models/SiteContent"

export default async function HomePage() {
  const heroSlides = [
    {
      id: "slide1",
      image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070",
      title: "نحو مستقبل أفضل مع DGR Diamond Growth",
      subtitle: "نحن نقدم أفضل حلول البناء والاتصالات بخبرة عالمية.",
    },
    {
      id: "slide2",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071",
      title: "أحدث التقنيات وأفضل الكفاءات",
      subtitle: "نضمن لك الجودة والابتكار في كل مشروع نقوم بتنفيذه.",
    }
  ]
  const plainProjects = []
  const plainServices = [
    {
      _id: "1",
      title: "الأعمال المدنية والكهروميكانيكية",
      description: "CIVIL SERVICES & MEP",
      details: "تشييد المباني، مراكز البيانات، الهياكل الفولاذية، المعدات، وأنظمة الطاقة (Building construction, Data center, Steel structure, Power systems & UPS).",
      icon: "Building",
      href: "/services/civil-mep"
    },
    {
      _id: "2",
      title: "أنظمة التيار الخفيف",
      description: "LOW CURRENT SERVICES",
      details: "أنظمة CCTV، المنازل الذكية، البث التلفزيوني IPTV، السنترالات PABX، أنظمة إنذار الحريق، والتحكم بالدخول.",
      icon: "Zap",
      href: "/services/low-current"
    },
    {
      _id: "3",
      title: "البنية التحتية والاتصالات",
      description: "Infrastructure Services",
      details: "تركيب وتشغيل معدات 2G/3G/LTE، BSS، MSC، دعم الشبكات، تخطيط الأنظمة اللاسلكية، خدمات IBS، و LOS.",
      icon: "Settings",
      href: "/services/infrastructure"
    }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSlider slides={heroSlides} />
      <AboutSection />
      <ServicesSection services={plainServices} />
      <ProjectsSection projects={plainProjects} />
      <SuccessPartners />
      <MapSection />
      <AchievementsCounter />
      <Footer />
      <FloatingContact />
    </main>
  )
}
