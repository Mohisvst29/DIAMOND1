
import connectDB from "@/lib/db"
import Project from "@/models/Project"
import ProjectForm from "@/components/project-form"
import { notFound } from "next/navigation"

interface EditProjectPageProps {
    params: {
        id: string
    }
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
    // Await params if using Next.js 15+, but let's assume current version handles it or we await it to be safe if that's the version
    // Check if params need to be awaited. In recent versions params is a Promise.
    // Assuming standard Next.js 14 behavior where props are objects (but can be promises in 15).
    // Using a safe approach to valid id.

    await connectDB()

    // Check if ID is valid objectId hex string if needed, but mongoose throws cast error usually. 
    // We will let mongoose find it or return null.

    let project = null
    try {
        project = await Project.findById(params.id)
    } catch (e) {
        // Likely invalid ID format
    }

    if (!project) {
        notFound()
    }

    // Convert Mongoose document to plain object for client component
    const serializedProject = {
        _id: project._id.toString(),
        title: project.title,
        location: project.location,
        category: project.category,
        description: project.description,
        area: project.area,
        year: project.year,
        image: project.image,
    }

    return (
        <div className="space-y-6 pt-6 pb-12">
            <h1 className="text-3xl font-bold text-[#0D2240] text-right">تعديل المشروع</h1>
            <ProjectForm project={serializedProject} isEdit={true} />
        </div>
    )
}
