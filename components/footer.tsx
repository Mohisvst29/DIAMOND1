import { Link } from "@/navigation";
import { Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

// أيقونات سناب شات و تيك توك مخصصة
const SnapchatIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" rx="4" fill="#FFFC00"/>
    <path
      d="M12 2C9.243 2 7 4.243 7 7c0 2.757 2.243 5 5 5s5-2.243 5-5c0-2.757-2.243-5-5-5zm0 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm0 3c-4.418 0-8 3.582-8 8h2c0-3.313 2.687-6 6-6s6 2.687 6 6h2c0-4.418-3.582-8-8-8z"
      fill="#000"
    />
  </svg>
);

const TikTokIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M128 0c70.7 0 128 57.3 128 128s-57.3 128-128 128S0 198.7 0 128 57.3 0 128 0z"
      fill="#010101"
    />
    <path
      d="M165.2 56.2c-3.4 0-6.7-.3-9.9-1v66.8c-5.7 0-11.4-1.9-15.9-5.4-4.5-3.5-7.7-8.5-8.9-14.1-1.2-5.7-.5-11.5 2-16.8V128c-5.7 0-11.4-1.9-15.9-5.4-4.5-3.5-7.7-8.5-8.9-14.1-1.2-5.7-.5-11.5 2-16.8v91.2c-5.7 0-11.4-1.9-15.9-5.4-4.5-3.5-7.7-8.5-8.9-14.1-1.2-5.7-.5-11.5 2-16.8v98.8c-8.1-2.5-15.4-7.7-20.8-14.6-5.5-6.9-8.6-15.4-8.6-24.2 0-18.7 15.2-33.9 33.9-33.9 3.4 0 6.7.3 9.9 1v-66.8c5.7 0 11.4 1.9 15.9 5.4 4.5 3.5 7.7 8.5 8.9 14.1 1.2 5.7.5 11.5-2 16.8v-91.2c5.7 0 11.4 1.9 15.9 5.4 4.5 3.5 7.7 8.5 8.9 14.1 1.2 5.7.5 11.5-2 16.8V56.2z"
      fill="#25F4EE"
    />
    <path
      d="M165.2 56.2c-3.4 0-6.7-.3-9.9-1v66.8c5.7 0 11.4 1.9 15.9 5.4 4.5 3.5 7.7 8.5 8.9 14.1 1.2 5.7.5 11.5-2 16.8v-66.8c-3.3 0-6.6-.3-9.9-1z"
      fill="#FE2C55"
    />
  </svg>
);

import connectDB from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";

export default async function Footer() {
  let logoUrl = "/logo.png"
  let logoHeight = "48" // default px
  
  let contactEmail = "info@diamondgrowth.com"
  let contactLocation = "طريق الملك عبدالعزيز، السعودية والأردن"
  
  let socialFacebook = ""
  let socialTwitter = ""
  let socialInstagram = ""
  let socialLinkedin = ""
  let socialSnapchat = ""
  let socialTiktok = ""

  try {
    const db = await connectDB()
    if (db) {
      const settings = await SiteSettings.findOne({}).lean() || {}
      
      if (settings?.logo?.url) logoUrl = settings.logo.url
      if (settings?.logo?.height) logoHeight = settings.logo.height.toString()
      
      if (settings?.contact?.emails?.length > 0) contactEmail = settings.contact.emails[0]
      if (settings?.contact?.addresses?.length > 0) contactLocation = settings.contact.addresses.join("، ")
      
      socialFacebook = settings?.social?.facebook || ""
      socialTwitter = settings?.social?.twitter || ""
      socialInstagram = settings?.social?.instagram || ""
      socialLinkedin = settings?.social?.linkedin || ""
      socialSnapchat = settings?.social?.snapchat || ""
      socialTiktok = settings?.social?.tiktok || ""
    }
  } catch (error) {
    console.error("Failed to fetch footer settings:", error)
  }

  return (
    <footer className="bg-[#0D2240] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-6 bg-white p-3 rounded-lg inline-block">
              <img
                src={logoUrl}
                alt="Diamond Growth"
                style={{ height: `${logoHeight}px`, width: 'auto' }}
              />
            </div>
            <p className="text-gray-300 leading-relaxed">
              شركة مقاولات متخصصة في الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية.
              <br/><br/>
              المقر الرئيسي في الأردن، منذ عام 2012<br/>
              Head office in Jordan, since 2012<br/>
              فرع المملكة العربية السعودية، منذ عام 2023
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-300 hover:text-[#C4D600] transition-colors">الرئيسية</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-[#C4D600] transition-colors">من نحن</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-[#C4D600] transition-colors">الخدمات</Link></li>
              <li><Link href="/projects" className="text-gray-300 hover:text-[#C4D600] transition-colors">معرض الاعمال</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-[#C4D600] transition-colors">المدونة</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-[#C4D600] transition-colors">تواصل معنا</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">خدماتنا</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/services/civil-mep" className="hover:text-[#C4D600] transition-colors">الأعمال المدنية والكهروميكانيكية</Link></li>
              <li><Link href="/services/low-current" className="hover:text-[#C4D600] transition-colors">أنظمة التيار الخفيف</Link></li>
              <li><Link href="/services/infrastructure" className="hover:text-[#C4D600] transition-colors">البنية التحتية والاتصالات</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">معلومات التواصل</h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-[#C4D600] ml-3" />
                <span className="text-gray-300">{contactEmail}</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-[#C4D600] ml-3 mt-1" />
                <span className="text-gray-300">
                  {contactLocation.split('،').map((part, index) => (
                    <span key={index}>{part}{index < contactLocation.split('،').length - 1 && '،'}<br /></span>
                  ))}
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h5 className="text-lg font-bold mb-4">تابعنا على وسائل التواصل</h5>
              <div className="flex gap-3 flex-wrap">
                {socialFacebook && (
                  <Button asChild size="sm" variant="outline" className="border-white/30 text-white hover:bg-[#C4D600] hover:text-[#0D2240] hover:border-[#C4D600] bg-transparent p-3">
                    <a href={socialFacebook} target="_blank" rel="noopener noreferrer" aria-label="فيسبوك"><Facebook className="w-5 h-5" /></a>
                  </Button>
                )}
                {socialTwitter && (
                  <Button asChild size="sm" variant="outline" className="border-white/30 text-white hover:bg-[#C4D600] hover:text-[#0D2240] hover:border-[#C4D600] bg-transparent p-3">
                    <a href={socialTwitter} target="_blank" rel="noopener noreferrer" aria-label="تويتر"><Twitter className="w-5 h-5" /></a>
                  </Button>
                )}
                {socialInstagram && (
                  <Button asChild size="sm" variant="outline" className="border-white/30 text-white hover:bg-[#C4D600] hover:text-[#0D2240] hover:border-[#C4D600] bg-transparent p-3">
                    <a href={socialInstagram} target="_blank" rel="noopener noreferrer" aria-label="انستغرام"><Instagram className="w-5 h-5" /></a>
                  </Button>
                )}
                {socialLinkedin && (
                  <Button asChild size="sm" variant="outline" className="border-white/30 text-white hover:bg-[#C4D600] hover:text-[#0D2240] hover:border-[#C4D600] bg-transparent p-3">
                    <a href={socialLinkedin} target="_blank" rel="noopener noreferrer" aria-label="لينكد ان"><Linkedin className="w-5 h-5" /></a>
                  </Button>
                )}
                {socialSnapchat && (
                  <Button asChild size="sm" variant="outline" className="border-white/30 text-white hover:bg-[#C4D600] hover:text-[#0D2240] hover:border-[#C4D600] bg-transparent p-3">
                    <a href={socialSnapchat} target="_blank" rel="noopener noreferrer" aria-label="سناب شات"><SnapchatIcon /></a>
                  </Button>
                )}
                {socialTiktok && (
                  <Button asChild size="sm" variant="outline" className="border-white/30 text-white hover:bg-[#C4D600] hover:text-[#0D2240] hover:border-[#C4D600] bg-transparent p-3">
                    <a href={socialTiktok} target="_blank" rel="noopener noreferrer" aria-label="تيك توك"><TikTokIcon /></a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 شركة Diamond Growth. جميع الحقوق محفوظة.
          </p>
          <p className="text-gray-300 mt-2">
            تم التصميم بواسطة{" "}
            <a
              href="https://wa.me/966541430116"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 transition"
            >
              رواد الرقمية
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
