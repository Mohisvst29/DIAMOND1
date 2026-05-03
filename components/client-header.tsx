"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"

export default function ClientHeader({ logoUrl = "/logo.png", logoHeight = "48" }: { logoUrl?: string, logoHeight?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  const navigation = [
    { name: "الرئيسية", href: "/" },
    { name: "من نحن", href: "/about" },
    {
      name: "الخدمات",
      href: "/services",
      hasDropdown: true,
      subItems: [
        { name: "الأعمال المدنية والكهروميكانيكية", href: "/services/civil-mep" },
        { name: "أنظمة التيار الخفيف", href: "/services/low-current" },
        { name: "البنية التحتية والاتصالات", href: "/services/infrastructure" },
      ],
    },
    { name: "معرض الأعمال", href: "/projects" },
    { name: "المدونة", href: "/blog" },
  ]

  return (
    <header className="fixed top-0 left-0 w-full z-[9999]">
      <div className="bg-white/90 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img
                src={logoUrl}
                alt="DGR Diamond Growth"
                style={{ height: `${logoHeight}px`, width: 'auto' }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  {item.hasDropdown ? (
                    <>
                      <Link
                        href={item.href}
                        className="flex items-center text-[#0D2240] hover:text-[#C4D600] font-medium transition-colors"
                      >
                        {item.name}
                        <ChevronDown className="w-4 h-4 mr-1" />
                      </Link>

                      <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div className="py-2">
                          {item.subItems?.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-[#0D2240] hover:text-[#C4D600] hover:bg-gray-50 transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link href={item.href} className="text-[#0D2240] hover:text-[#C4D600] font-medium transition-colors">
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Contact Button Only */}
            <div className="hidden md:flex items-center gap-x-4 pr-8">
              <Link href="/contact">
                <Button className="bg-[#C4D600] hover:bg-[#b3c200] text-[#0D2240] font-medium px-8">
                  تواصل معنا
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6 text-[#0D2240]" /> : <Menu className="w-6 h-6 text-[#0D2240]" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t bg-white">
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <>
                        <button
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          className="flex items-center justify-between w-full text-[#0D2240] hover:text-[#C4D600] font-medium transition-colors text-right"
                        >
                          {item.name}
                          <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
                        </button>
                        {isServicesOpen && (
                          <div className="mt-2 mr-4 space-y-2">
                            {item.subItems?.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block text-[#2D3640] hover:text-[#C4D600] transition-colors text-sm"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-[#0D2240] hover:text-[#C4D600] font-medium transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-[#C4D600] hover:bg-[#b3c200] text-[#0D2240] font-medium">
                      تواصل معنا
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
