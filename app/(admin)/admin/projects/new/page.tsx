import ProjectForm from "@/components/project-form"

export default function NewProjectPage() {
    return (
        <div className="space-y-6 pt-6 pb-12">
            <h1 className="text-3xl font-bold text-[#0D2240] text-right">إضافة مشروع جديد</h1>
            <ProjectForm />
        </div>
    )
}
