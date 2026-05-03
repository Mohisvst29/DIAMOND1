import { Card } from "@/components/ui/card"

const teamMembers = [
  {
    name: "م. المدير التنفيذي",
    position: "المدير العام والمؤسس",
    image: "/team-ceo.png",
    description: "خبرة تزيد عن 20 عاماً في مجال المقاولات والتشطيبات",
  },
  {
    name: "م. أحمد محمد",
    position: "مدير المشاريع",
    image: "/team-project-manager.png",
    description: "مهندس مدني متخصص في إدارة المشاريع الكبرى",
  },
  {
    name: "م. فاطمة العلي",
    position: "مهندسة الاتصالات",
    image: "/team-interior-designer.png",
    description: "خبيرة في تصميم شبكات الاتصالات والبنية التحتية",
  },
  {
    name: "أ. محمد السعد",
    position: "مدير العمليات",
    image: "/team-operations-manager.png",
    description: "متخصص في إدارة العمليات وضمان الجودة",
  },
]

export default function TeamSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D2240] mb-4">
            فريق العمل
          </h2>
          <p className="text-lg text-[#2D3640] max-w-2xl mx-auto">
            فريق من الخبراء والمتخصصين يعملون بشغف لتحقيق أهدافكم
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden text-center hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={member.image || "/placeholder.svg?height=300&width=300&query=professional team member"}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0D2240] mb-2">{member.name}</h3>
                <p className="text-[#C4D600] font-medium mb-3">{member.position}</p>
                <p className="text-[#2D3640] text-sm leading-relaxed">{member.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="p-8 bg-[#0D2240] text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">انضم إلى فريقنا</h3>
            <p className="text-lg mb-6 opacity-90">نحن دائماً نبحث عن المواهب المتميزة للانضمام إلى فريق العمل لدينا</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-[#C4D600] text-[#0D2240] px-4 py-2 rounded-full font-medium">مهندسين مدنيين</span>
              <span className="bg-[#C4D600] text-[#0D2240] px-4 py-2 rounded-full font-medium">مهندسين اتصالات</span>
              <span className="bg-[#C4D600] text-[#0D2240] px-4 py-2 rounded-full font-medium">فنيين متخصصين</span>
              <span className="bg-[#C4D600] text-[#0D2240] px-4 py-2 rounded-full font-medium">مشرفين مشاريع</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
