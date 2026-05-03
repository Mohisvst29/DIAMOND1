import { Card } from "@/components/ui/card"
import { Eye, Target, Heart, Award } from "lucide-react"
import { getLocale, getTranslations } from "next-intl/server"

export default async function VisionMission({ settings }: { settings?: any }) {
  const locale = await getLocale()
  const t = await getTranslations("About")

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D2240] mb-4">
            {t("visionAndMission")}
          </h2>
          <p className="text-lg text-[#2D3640] max-w-2xl mx-auto">
            {t("visionSubtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8">
            <div className="flex items-center mb-6">
              <div className="bg-[#C4D600] p-3 rounded-full ml-4">
                <Eye className="w-8 h-8 text-[#0D2240]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0D2240]">{t("vision")}</h3>
            </div>
            <p className="text-lg text-[#2D3640] leading-relaxed">
              {locale === 'en' && settings?.about?.visionEn 
                ? settings.about.visionEn 
                : settings?.about?.vision || "تطمح النمو الماسي لأن تكون واحدة من الشركات الرائدة في قطاع المقاولات بالمملكة، عبر تقديم حلول مستدامة ومتطورة تساهم في تحقيق رؤية 2030 ودعم التنمية الشاملة."}
            </p>
          </Card>

          <Card className="p-8">
            <div className="flex items-center mb-6">
              <div className="bg-[#0D2240] p-3 rounded-full ml-4">
                <Target className="w-8 h-8 text-[#C4D600]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0D2240]">{t("mission")}</h3>
            </div>
            <p className="text-lg text-[#2D3640] leading-relaxed">
              {locale === 'en' && settings?.about?.missionEn 
                ? settings.about.missionEn 
                : settings?.about?.mission || "الريادة والتميز في كل ما نقوم به من خلال تقديم خدمات هندسية وفنية مبتكرة، توظيف أحدث التقنيات، والالتزام بأعلى معايير الجودة والسلامة لتلبية تطلعات عملائنا وشركائنا."}
            </p>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <div className="bg-[#C4D600] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Award className="w-8 h-8 text-[#0D2240]" />
            </div>
            <h4 className="text-xl font-bold text-[#0D2240] mb-3">{t("leadership")}</h4>
            <p className="text-[#2D3640]">{t("leadershipDesc")}</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-[#0D2240] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Target className="w-8 h-8 text-[#C4D600]" />
            </div>
            <h4 className="text-xl font-bold text-[#0D2240] mb-3">{t("quality")}</h4>
            <p className="text-[#2D3640]">{t("qualityDesc")}</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-[#C4D600] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Eye className="w-8 h-8 text-[#0D2240]" />
            </div>
            <h4 className="text-xl font-bold text-[#0D2240] mb-3">{t("timeManagement")}</h4>
            <p className="text-[#2D3640]">{t("timeManagementDesc")}</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-[#0D2240] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Heart className="w-8 h-8 text-[#C4D600]" />
            </div>
            <h4 className="text-xl font-bold text-[#0D2240] mb-3">{t("customerSatisfaction")}</h4>
            <p className="text-[#2D3640]">{t("customerSatisfactionDesc")}</p>
          </Card>
        </div>
      </div>
    </section>
  )
}
