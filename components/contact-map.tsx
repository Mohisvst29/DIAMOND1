import { MapPin, Clock, Phone } from "lucide-react"
import connectDB from "@/lib/db"
import SiteContent from "@/models/SiteContent"

export default async function ContactMap() {
  let location = "طريق الملك عبدالعزيز، السعودية"
  try {
    const db = await connectDB()
    if (db) {
      const doc = await SiteContent.findOne({ key: 'contact_location' }).lean()
      if (doc && doc.value) location = doc.value as string
    }
  } catch (e) {}

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* العنوان والوصف */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D2240] mb-4">موقعنا على الخريطة</h2>
          <p className="text-lg text-[#2D3640] max-w-2xl mx-auto">
            يمكنك زيارتنا في مكتبنا الرئيسي أو التواصل معنا لترتيب موعد
          </p>
        </div>

        {/* Google Map */}
        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <div className="aspect-video bg-gray-200 flex items-center justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115865.07156942732!2d46.7760775!3d24.8329623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2efce944b4e7cb%3A0x2863773a90623a85!2sKing%20Abdul%20Aziz%20Road%2C%20Riyadh!5e0!3m2!1sen!2ssa!4v1715011234567!5m2!1sen!2ssa"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقع DGR Diamond Growth"
            />
          </div>

          {/* بطاقة فوق الخريطة */}
          <div className="absolute top-6 right-6 bg-white p-4 rounded-lg shadow-lg max-w-sm">
            <h3 className="font-bold text-[#0D2240] mb-2">شركة DGR Diamond Growth</h3>
            <p className="text-sm text-[#2D3640] mb-3">
              {location.split('،').map((part, index) => (
                <span key={index}>{part}{index < location.split('،').length - 1 && '،'}<br /></span>
              ))}
            </p>
            <div className="flex gap-2">
              <a
                href="https://maps.google.com/?q=King+Abdul+Aziz+Road+Riyadh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-[#C4D600] text-[#0D2240] px-3 py-1 rounded-full font-medium hover:bg-[#C4D600]/90 transition-colors"
              >
                فتح في خرائط جوجل
              </a>
            </div>
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div className="bg-[#C4D600] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-[#0D2240]" />
            </div>
            <h3 className="text-xl font-bold text-[#0D2240] mb-2">موقع مميز</h3>
            <p className="text-[#2D3640]">في قلب السعودية والأردن، سهولة في الوصول من جميع أنحاء المدينة</p>
          </div>

          <div className="text-center">
            <div className="bg-[#0D2240] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Clock className="w-8 h-8 text-[#C4D600]" />
            </div>
            <h3 className="text-xl font-bold text-[#0D2240] mb-2">مواعيد مرنة</h3>
            <p className="text-[#2D3640]">نستقبل العملاء طوال أيام الأسبوع، ويمكن ترتيب مواعيد خاصة</p>
          </div>

          <div className="text-center">
            <div className="bg-[#C4D600] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Phone className="w-8 h-8 text-[#0D2240]" />
            </div>
            <h3 className="text-xl font-bold text-[#0D2240] mb-2">تواصل سريع</h3>
            <p className="text-[#2D3640]">فريق خدمة العملاء متاح للرد على استفساراتكم في أسرع وقت</p>
          </div>
        </div>
      </div>
    </section>
  )
}
