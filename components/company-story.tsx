import { Card } from "@/components/ui/card"

export default function CompanyStory() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D2240] mb-8">قصة نجاحنا</h2>
            <div className="space-y-6 text-lg text-[#2D3640] leading-relaxed">
              <p>
                تأسس المقر الرئيسي لشركة DGR Diamond Growth للمقاولات في الأردن عام 2012 (Head office in Jordan, since 2012)، وانطلقت لاحقاً في عام 2023 لافتتاح فرعها في المملكة العربية السعودية.
              </p>
              <p>
                نحن متخصصون في الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية، ونسعى دائمًا لتلبية احتياجات عملائنا بأفضل الممارسات.
              </p>
              <p>
                نفخر بشراكاتنا القوية مع أهم المصنعين والموردين العالميين، وفريق عملنا المحترف الذي يلتزم بتقديم أعلى معايير الجودة والسلامة المهنية.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 text-center bg-[#C4D600]/10">
              <div className="text-4xl font-bold text-[#0D2240] mb-2">2012</div>
              <div className="text-[#2D3640] font-medium">سنة التأسيس في الأردن</div>
            </Card>
            <Card className="p-6 text-center bg-[#0D2240]/10">
              <div className="text-4xl font-bold text-[#C4D600] mb-2">2023</div>
              <div className="text-[#2D3640] font-medium">سنة التأسيس بالسعودية</div>
            </Card>
            <Card className="p-6 text-center bg-[#0D2240]/10">
              <div className="text-4xl font-bold text-[#C4D600] mb-2">110+</div>
              <div className="text-[#2D3640] font-medium">مشروع مكتمل</div>
            </Card>
            <Card className="p-6 text-center bg-[#C4D600]/10">
              <div className="text-4xl font-bold text-[#0D2240] mb-2">2</div>
              <div className="text-[#2D3640] font-medium">مكاتب إقليمية</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
