import { getProjects, deleteProject } from "@/actions/project-actions"
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
import { Plus, Pencil, Trash2, MapPin, Layers } from "lucide-react"

export default async function ProjectsAdminPage() {
    const projects = await getProjects()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#0D2240] mb-2">إدارة المشاريع</h1>
                    <p className="text-gray-500">عرض وإدارة جميع مشاريع الشركة</p>
                </div>
                <Link href="/admin/projects/new">
                    <Button className="bg-[#0D2240] hover:bg-[#1a3a5c] text-white">
                        <Plus className="w-4 h-4 ml-2" />
                        إضافة مشروع جديد
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <Table>
                    <TableHeader className="bg-gray-50/50">
                        <TableRow>
                            <TableHead className="text-right">صورة المشروع</TableHead>
                            <TableHead className="text-right">عنوان المشروع</TableHead>
                            <TableHead className="text-right">الموقع</TableHead>
                            <TableHead className="text-right">التصنيف</TableHead>
                            <TableHead className="text-right">السنة</TableHead>
                            <TableHead className="text-right">الإجراءات</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                                    لا توجد مشاريع مضافة حالياً
                                </TableCell>
                            </TableRow>
                        ) : (
                            projects.map((project: any) => (
                                <TableRow key={project._id} className="group hover:bg-gray-50/50 transition-colors">
                                    <TableCell>
                                        <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-[#0D2240]">
                                        {project.title}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <MapPin className="w-3 h-3 ml-1" />
                                            {project.location}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            <Layers className="w-3 h-3 ml-1" />
                                            {project.category}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-500 text-sm">{project.year}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Link href={`/admin/projects/${project._id}`}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-[#0D2240] hover:text-[#C4D600] hover:bg-[#0D2240]">
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <form action={deleteProject.bind(null, project._id)}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-white hover:bg-red-500">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
