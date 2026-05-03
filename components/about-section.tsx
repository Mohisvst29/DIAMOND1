"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`py-20 bg-gray-50 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-800 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-50px]"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D2240] mb-6">من نحن</h2>
            <p className="text-lg text-[#2D3640] leading-relaxed mb-6">
              شركة DGR Diamond Growth هي شركة مقاولات متخصصة في الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية.
              <br/><br/>
              <strong>المقر الرئيسي في الأردن، منذ عام 2012</strong><br/>
              <strong>Head office in Jordan, since 2012</strong>
            </p>

            <div
              className={`overflow-hidden transition-all duration-500 ${
                isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-lg text-[#2D3640] leading-relaxed mb-4">
                نقدم حلول متكاملة تشمل التوريد، دراسات الجدوى، التصميم، الهندسة، إدارة المشاريع، التنفيذ، وتسليم المشاريع الجاهزة.
              </p>
              <p className="text-lg text-[#2D3640] leading-relaxed mb-6">
                لدينا شراكات قوية مع موردين ومصنعين عالميين لتوفير أفضل الخدمات بأعلى جودة.
              </p>
            </div>

            <p className="text-lg text-[#2D3640] leading-relaxed mb-8">
              نحن نلتزم بتقديم أعلى جودة دون أي تنازل، ونحرص على توفير بيئة عمل آمنة وصحية، معتمدين على أحدث التقنيات والحلول المستدامة.
            </p>

            <div className="flex gap-4 items-center">
              <Link href="/about">
                <Button size="lg" className="bg-[#C4D600] hover:bg-[#e6a61a] text-[#0D2240] font-bold">
                  اقرأ المزيد
                </Button>
              </Link>

              <Button
                variant="outline"
                onClick={() => setIsExpanded(!isExpanded)}
                className="border-[#0D2240] text-[#0D2240] hover:bg-[#0D2240] hover:text-white transition-all duration-300"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4 ml-2 transition-transform duration-300" />
                    عرض اقل
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 ml-2 transition-transform duration-300" />
                    عرض المزيد
                  </>
                )}
              </Button>
            </div>
          </div>

          <div
            className={`grid grid-cols-2 gap-4 transition-all duration-800 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[50px]"
            }`}
          >
            {[
              { number: "+110", label: "مشروع مكتمل", delay: "delay-100" },
              { number: "+100", label: "موظف محترف", delay: "delay-200" },
              { number: "2", label: "مكاتب إقليمية", delay: "delay-300" },
              { number: "2023", label: "سنة التأسيس بالسعودية", delay: "delay-400" },
            ].map((item, index) => (
              <Card
                key={index}
                className={`p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-500 cursor-pointer group ${item.delay} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <div className="text-3xl font-bold text-[#C4D600] mb-2 group-hover:scale-110 transition-transform duration-300">
                  {item.number}
                </div>
                <div className="text-[#2D3640] group-hover:text-[#0D2240] transition-colors duration-300">
                  {item.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
