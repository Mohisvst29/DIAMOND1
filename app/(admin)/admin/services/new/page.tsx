import ServiceForm from "@/components/service-form"

export default function NewServicePage() {
    return (
        <div className="space-y-6 pt-6 pb-12">
            <h1 className="text-3xl font-bold text-[#0D2240] text-right">إضافة خدمة جديدة</h1>
            <ServiceForm />
        </div>
    )
}
