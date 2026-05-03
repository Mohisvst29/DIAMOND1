import { getServices, deleteService } from "@/actions/service-actions"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { Plus, Pencil, Trash2, ArrowUpDown } from "lucide-react"
import * as LucideIcons from "lucide-react"

export default async function ServicesAdminPage() {
    const services = await getServices()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#0D2240] mb-2">إدارة الخدمات</h1>
                    <p className="text-gray-500">عرض وإدارة الخدمات المقدمة</p>
                </div>
                <Link href="/admin/services/new">
                    <Button className="bg-[#0D2240] hover:bg-[#1a3a5c] text-white">
                        <Plus className="w-4 h-4 ml-2" />
                        إضافة خدمة جديدة
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <Table>
                    <TableHeader className="bg-gray-50/50">
                        <TableRow>
                            <TableHead className="text-right w-16">#</TableHead>
                            <TableHead className="text-right">الأيقونة</TableHead>
                            <TableHead className="text-right">عنوان الخدمة</TableHead>
                            <TableHead className="text-right">الوصف المختصر</TableHead>
                            <TableHead className="text-right">الإجراءات</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-12 text-gray-500">
                                    لا توجد خدمات مضافة حالياً
                                </TableCell>
                            </TableRow>
                        ) : (
                            services.map((service: any) => {
                                // Dynamic Icon Component
                                const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.HelpCircle;

                                return (
                                    <TableRow key={service._id} className="group hover:bg-gray-50/50 transition-colors">
                                        <TableCell className="font-mono text-gray-400">
                                            {service.order || 0}
                                        </TableCell>
                                        <TableCell>
                                            <div className="p-2 bg-gray-100 rounded-lg w-fit group-hover:bg-[#C4D600] group-hover:text-[#0D2240] transition-colors">
                                                <IconComponent className="w-5 h-5" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium text-[#0D2240]">
                                            {service.title}
                                        </TableCell>
                                        <TableCell className="text-gray-500 max-w-xs truncate">
                                            {service.description}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Link href={`/admin/services/${service._id}`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#0D2240] hover:text-[#C4D600] hover:bg-[#0D2240]">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <form action={deleteService.bind(null, service._id)}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-white hover:bg-red-500">
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </form>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
