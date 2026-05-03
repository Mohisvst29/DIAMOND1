"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import Image from "next/image"

type Partner = {
  _id: string
  name: string
  logoUrl: string
  order: number
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [name, setName] = useState("")
  const [logoUrl, setLogoUrl] = useState("")
  const [order, setOrder] = useState("0")
  const [loading, setLoading] = useState(false)

  const fetchPartners = async () => {
    try {
      const res = await fetch("/api/partners")
      if (res.ok) {
        setPartners(await res.json())
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchPartners()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, logoUrl, order: Number(order) })
      })
      if (res.ok) {
        toast.success("تم إضافة الشريك بنجاح")
        fetchPartners()
        setName("")
        setLogoUrl("")
        setOrder("0")
      } else {
        toast.error("حدث خطأ")
      }
    } catch (e) {
      toast.error("حدث خطأ")
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من الحذف؟")) return
    try {
      const res = await fetch(`/api/partners/${id}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("تم الحذف بنجاح")
        fetchPartners()
      }
    } catch (e) {
      toast.error("حدث خطأ أثناء الحذف")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#0D2240]">إدارة شركاء النجاح</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>إضافة شريك جديد</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
            <div className="space-y-2">
              <Label>اسم الشريك</Label>
              <Input required value={name} onChange={e => setName(e.target.value)} placeholder="مثال: شركة سابك" />
            </div>
            <div className="space-y-2">
              <Label>رابط الشعار (صورة)</Label>
              <Input required value={logoUrl} onChange={e => setLogoUrl(e.target.value)} placeholder="/partner-logo.png" />
            </div>
            <div className="space-y-2">
              <Label>الترتيب</Label>
              <Input type="number" value={order} onChange={e => setOrder(e.target.value)} />
            </div>
            <Button disabled={loading} type="submit" className="bg-[#0D2240] text-white">إضافة</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>الشركاء الحاليين</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {partners.map(p => (
              <div key={p._id} className="border p-4 rounded-xl flex flex-col items-center gap-3">
                <div className="relative w-32 h-20">
                  <Image src={p.logoUrl} alt={p.name} fill className="object-contain" />
                </div>
                <h3 className="font-bold">{p.name}</h3>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(p._id)}>حذف</Button>
              </div>
            ))}
            {partners.length === 0 && <p className="text-gray-500">لا يوجد شركاء حاليا. (تأكد من الاتصال بقاعدة البيانات)</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
