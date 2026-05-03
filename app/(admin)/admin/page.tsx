"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import {
    FileText,
    Image as ImageIcon,
    Building2,
    Wrench,
    ArrowRight,
    Search,
    PlusCircle,
    Settings,
    Clock
} from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#0D2240]">لوحة التحكم</h1>
                    <p className="text-gray-500 mt-1">أهلاً بك، إليك ملخص لأداء الموقع والمحتوى</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/projects" className="inline-flex h-10 items-center justify-center rounded-md bg-[#0D2240] px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-[#1a3a5c]">
                        <PlusCircle className="mr-2 h-4 w-4 ml-2" />
                        إضافة مشروع
                    </Link>
                    <Link href="/admin/blog" className="inline-flex h-10 items-center justify-center rounded-md bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-[#0D2240] shadow-sm transition-colors hover:bg-gray-50">
                        <PlusCircle className="mr-2 h-4 w-4 ml-2" />
                        إضافة مقال
                    </Link>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <DashboardCard
                    title="المشاريع"
                    value="6"
                    description="مشروع منجز"
                    icon={Building2}
                    href="/admin/projects"
                    color="bg-blue-500"
                />
                <DashboardCard
                    title="الخدمات"
                    value="8"
                    description="خدمة نشطة"
                    icon={Wrench}
                    href="/admin/services"
                    color="bg-green-500"
                />
                <DashboardCard
                    title="المالات"
                    value="12"
                    description="مقال منشور"
                    icon={FileText}
                    href="/admin/blog"
                    color="bg-purple-500"
                />
                <DashboardCard
                    title="الوسائط"
                    value="24"
                    description="صورة وملف"
                    icon={ImageIcon}
                    href="/admin/media"
                    color="bg-orange-500"
                />
            </div>

            {/* Quick Actions & Recent */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-2 border-0 shadow-sm bg-white">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-[#0D2240]">وصول سريع</CardTitle>
                        <CardDescription>روابط سريعة لإدارة أقسام الموقع الرئيسية</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <QuickAction
                            title="إدارة المشاريع"
                            description="إضافة وتعديل وحذف مشاريع الشركة"
                            icon={Building2}
                            href="/admin/projects"
                        />
                        <QuickAction
                            title="إدارة الخدمات"
                            description="تحديث قائمة الخدمات والأسعار"
                            icon={Wrench}
                            href="/admin/services"
                        />
                        <QuickAction
                            title="مكتبة الوسائط"
                            description="رفع وتنظيم صور المشاريع"
                            icon={ImageIcon}
                            href="/admin/media"
                        />
                        <QuickAction
                            title="إعدادات الموقع"
                            description="تغيير الصور الرئيسية والنصوص"
                            icon={Settings}
                            href="/admin/content"
                        />
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-[#0D2240]">آخر التحديثات</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mt-1">
                                        <Clock className="h-4 w-4 text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[#0D2240]">تم تحديث مشروع "فيلا سكنية"</p>
                                        <p className="text-xs text-gray-500 mt-1">منذ ساعتين</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function DashboardCard({
    title,
    value,
    description,
    icon: Icon,
    href,
    color
}: {
    title: string
    value: string
    description: string
    icon: any
    href: string
    color: string
}) {
    return (
        <Link href={href}>
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
                    <div className={`p-2 rounded-lg ${color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
                        <Icon className={`h-4 w-4 ${color.replace('bg-', 'text-')}`} />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-[#0D2240]">{value}</div>
                    <p className="text-xs text-gray-400 mt-1">
                        {description}
                    </p>
                </CardContent>
            </Card>
        </Link>
    )
}

function QuickAction({ title, description, icon: Icon, href }: { title: string, description: string, icon: any, href: string }) {
    return (
        <Link href={href} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 Hover:border-[#C4D600] hover:bg-gray-50 transition-all group">
            <div className="bg-gray-100 p-3 rounded-lg group-hover:bg-[#0D2240] transition-colors">
                <Icon className="h-5 w-5 text-gray-600 group-hover:text-[#C4D600] transition-colors" />
            </div>
            <div>
                <h3 className="font-semibold text-[#0D2240] mb-1 group-hover:text-[#C4D600] transition-colors">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </Link>
    )
}
