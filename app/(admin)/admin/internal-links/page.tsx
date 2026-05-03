
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle, Pencil, Trash2, Link as LinkIcon, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface LinkMapping {
    _id: string
    keyword: string
    url: string
    priority: number
    maxOccurrences: number
    isActive: boolean
    caseSensitive: boolean
}

export default function InternalLinksPage() {
    const [mappings, setMappings] = useState<LinkMapping[]>([])
    const [loading, setLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingMapping, setEditingMapping] = useState<LinkMapping | null>(null)
    const [formData, setFormData] = useState({
        keyword: "",
        url: "",
        priority: 0,
        maxOccurrences: 1,
        isActive: true,
        caseSensitive: false
    })

    const router = useRouter()

    useEffect(() => {
        fetchMappings()
    }, [])

    const fetchMappings = async () => {
        try {
            const res = await fetch("/api/link-mappings")
            if (res.ok) {
                const data = await res.json()
                setMappings(data)
            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to fetch mappings")
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const url = editingMapping
                ? `/api/link-mappings/${editingMapping._id}`
                : "/api/link-mappings"

            const method = editingMapping ? "PUT" : "POST"

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                toast.success(editingMapping ? "Mapping updated" : "Mapping created")
                setIsDialogOpen(false)
                fetchMappings()
                resetForm()
            } else {
                const data = await res.json()
                toast.error(data.error || "Operation failed")
            }
        } catch (error) {
            console.error(error)
            toast.error("Operation failed")
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this mapping?")) return

        try {
            const res = await fetch(`/api/link-mappings/${id}`, { method: "DELETE" })
            if (res.ok) {
                toast.success("Mapping deleted")
                fetchMappings()
            } else {
                toast.error("Failed to delete mapping")
            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to delete mapping")
        }
    }

    const resetForm = () => {
        setEditingMapping(null)
        setFormData({
            keyword: "",
            url: "",
            priority: 0,
            maxOccurrences: 1,
            isActive: true,
            caseSensitive: false
        })
    }

    const openEdit = (mapping: LinkMapping) => {
        setEditingMapping(mapping)
        setFormData({
            keyword: mapping.keyword,
            url: mapping.url,
            priority: mapping.priority,
            maxOccurrences: mapping.maxOccurrences,
            isActive: mapping.isActive,
            caseSensitive: mapping.caseSensitive
        })
        setIsDialogOpen(true)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#0D2240]">الروابط الداخلية</h1>
                    <p className="text-gray-500 mt-1">إدارة الكلمات المفتاحية والروابط الداخلية للمدونة</p>
                </div>
                <Button onClick={() => { resetForm(); setIsDialogOpen(true) }} className="bg-[#0D2240] hover:bg-[#1a3a5c]">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    اضافة رابط
                </Button>
            </div>

            <div className="bg-white rounded-lg border shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-right">الكلمة المفتاحية</TableHead>
                            <TableHead className="text-right">الرابط</TableHead>
                            <TableHead className="text-center">الأولوية</TableHead>
                            <TableHead className="text-center">التكرار</TableHead>
                            <TableHead className="text-center">الحالة</TableHead>
                            <TableHead className="text-center">اجراءات</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-gray-400" />
                                </TableCell>
                            </TableRow>
                        ) : mappings.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-gray-500">
                                    لا توجد روابط مضافة
                                </TableCell>
                            </TableRow>
                        ) : (
                            mappings.map((mapping) => (
                                <TableRow key={mapping._id}>
                                    <TableCell className="font-medium">{mapping.keyword}</TableCell>
                                    <TableCell dir="ltr" className="text-blue-600 hover:underline">
                                        <a href={mapping.url} target="_blank" rel="noreferrer">{mapping.url}</a>
                                    </TableCell>
                                    <TableCell className="text-center">{mapping.priority}</TableCell>
                                    <TableCell className="text-center">{mapping.maxOccurrences}</TableCell>
                                    <TableCell className="text-center">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${mapping.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {mapping.isActive ? 'نشط' : 'غير نشط'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => openEdit(mapping)}>
                                                <Pencil className="h-4 w-4 text-gray-500 hover:text-[#0D2240]" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(mapping._id)}>
                                                <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingMapping ? "تعديل الرابط" : "إضافة رابط جديد"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="keyword">الكلمة المفتاحية</Label>
                            <Input
                                id="keyword"
                                value={formData.keyword}
                                onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="url">الرابط</Label>
                            <Input
                                id="url"
                                value={formData.url}
                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                required
                                dir="ltr"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="priority">الأولوية</Label>
                                <Input
                                    id="priority"
                                    type="number"
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="maxOccurrences">اقصى تكرار</Label>
                                <Input
                                    id="maxOccurrences"
                                    type="number"
                                    min="1"
                                    value={formData.maxOccurrences}
                                    onChange={(e) => setFormData({ ...formData, maxOccurrences: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-lg">
                            <Label htmlFor="isActive" className="flex-1 cursor-pointer">تفعيل الرابط</Label>
                            <Switch
                                id="isActive"
                                checked={formData.isActive}
                                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                            />
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>الغاء</Button>
                            <Button type="submit" className="bg-[#0D2240] text-white hover:bg-[#1a3a5c]">
                                {editingMapping ? "حفظ التعديلات" : "إضافة"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
