"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

type Partner = {
  _id: string
  name: string
  logoUrl: string
}

export default function SuccessPartners() {
  const [partners, setPartners] = useState<Partner[]>([])

  useEffect(() => {
    // Attempt to fetch from API
    fetch("/api/partners")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setPartners(data)
        } else {
          // Fallback to empty if nothing in DB or error
          setPartners([])
        }
      })
      .catch(() => {
        // Silent catch
      })
  }, [])

  if (partners.length === 0) return null

  return (
    <section className="py-16 bg-white overflow-hidden border-t border-gray-100">
      <div className="container mx-auto px-4 mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0D2240] mb-4">شركاء النجاح</h2>
        <div className="w-24 h-1 bg-[#C4D600] mx-auto rounded-full mb-4"></div>
        <p className="text-lg text-gray-600">نعتز بثقة شركائنا وعملائنا في المملكة العربية السعودية والأردن</p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[...partners, ...partners, ...partners].map((partner, i) => (
            <div key={`${partner._id}-${i}`} className="mx-8 w-40 h-20 relative grayscale hover:grayscale-0 transition-all duration-300">
              <Image 
                src={partner.logoUrl} 
                alt={partner.name} 
                fill 
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
