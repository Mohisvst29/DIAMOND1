import connectDB from "@/lib/db"
import SiteContent from "@/models/SiteContent"
import ContentEditor from "./content-editor"

export const dynamic = "force-dynamic"

export default async function ContentPage() {
    const db = await connectDB()
    let contentDocs: any[] = []
    if (db) {
        try {
            contentDocs = await SiteContent.find({}).lean()
        } catch (e) {
            contentDocs = []
        }
    }

    // Serialize _id
    const serializedContent = contentDocs.map((doc: any) => ({
        ...doc,
        _id: doc._id.toString(),
        value: doc.value // Pass value as is (mixed type)
    }))

    return (
        <div className="space-y-6 pt-6 pb-12">
            <h1 className="text-3xl font-bold">Site Content</h1>
            <p className="text-muted-foreground">
                Manage static text, images, and slides across the website.
            </p>

            <ContentEditor initialContent={serializedContent} />
        </div>
    )
}
