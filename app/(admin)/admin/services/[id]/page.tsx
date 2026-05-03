import ServiceForm from "@/components/service-form"
import connectDB from "@/lib/db"
import Service from "@/models/Service"
import { notFound } from "next/navigation"

export default async function EditServicePage({ params }: { params: { id: string } }) {
    await connectDB()
    const service = await Service.findById(params.id)

    if (!service) {
        notFound()
    }

    return (
        <div className="space-y-6 pt-6 pb-12">
            <h1 className="text-3xl font-bold text-[#0D2240] text-right">تعديل الخدمة</h1>
            <ServiceForm service={service} isEdit />
        </div>
    )
}
