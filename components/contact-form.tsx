"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, CheckCircle } from "lucide-react"

export default function ContactForm({ whatsappPhone = "+966536788004" }: { whatsappPhone?: string }) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Format phone for WhatsApp by removing non-digits
    const whatsappNumber = whatsappPhone.replace(/[^\d+]/g, '')

    const text = `
طلب خدمة من موقع DGR Diamond Growth
الاسم: ${formData.name}
الهاتف: ${formData.phone}
البريد: ${formData.email}
الخدمة: ${formData.service}
تفاصيل المشروع: ${formData.message}
    `

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`

    window.open(whatsappUrl, "_blank")

    setIsSubmitted(true)

    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      })
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="p-12 text-center max-w-md mx-auto">
            <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#0D2240] mb-4">تم ارسال رسالتك بنجاح</h3>
            <p className="text-[#2D3640] mb-6">شكرا لتواصلك معنا في السعودية والأردن. سنقوم بالرد عليك في اقرب وقت ممكن.</p>
            <p className="text-sm text-[#2D3640]">سيتم اعاده تحميل النموذج خلال ثوان</p>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D2240] mb-4">ارسل لنا رساله</h2>
            <p className="text-lg text-[#2D3640]">املا النموذج ادناه وسنتواصل معك في السعودية والأردن في اقرب وقت ممكن</p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#0D2240] mb-2">الاسم الكامل *</label>
                  <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="ادخل اسمك الكامل"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0D2240] mb-2">البريد الالكتروني *</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="example@email.com"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#0D2240] mb-2">رقم الهاتف *</label>
                  <Input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+966 50 123 4567"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0D2240] mb-2">نوع الخدمه المطلوبه</label>
                  <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="اختر نوع الخدمه" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="الأعمال المدنية والكهروميكانيكية">الأعمال المدنية والكهروميكانيكية</SelectItem>
                      <SelectItem value="أنظمة التيار الخفيف">أنظمة التيار الخفيف</SelectItem>
                      <SelectItem value="البنية التحتية والاتصالات">البنية التحتية والاتصالات</SelectItem>
                      <SelectItem value="خدمات أخرى">خدمات أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0D2240] mb-2">تفاصيل المشروع *</label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="اخبرنا عن مشروعك في السعودية والأردن، المساحه، الموقع، والمتطلبات الخاصه..."
                  rows={5}
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#C4D600] text-[#0D2240] hover:bg-[#C4D600]/90 font-medium"
              >
                <Send className="w-5 h-5 ml-2" />
                ارسال الرساله
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
