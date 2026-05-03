import { getGridFSBucket } from "@/lib/gridfs"
import connectDB from "@/lib/db"
import MediaUploader from "./media-uploader"
import ImageCard from "./image-card"

export const dynamic = "force-dynamic"

export default async function MediaPage() {
    const db = await connectDB()
    let plainFiles: any[] = []

    if (db) {
        try {
            const bucket = await getGridFSBucket()
            const files = await bucket.find({}).sort({ uploadDate: -1 }).toArray()
            plainFiles = files.map(f => ({
                _id: f._id.toString(),
                filename: f.filename,
                contentType: (f.metadata as any)?.contentType || 'unknown',
                uploadDate: f.uploadDate.toISOString(),
                url: `/api/images/${f.filename}`
            }))
        } catch (e) {
            plainFiles = []
        }
    }

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
            </div>

            <MediaUploader />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                {plainFiles.map((file) => (
                    <ImageCard key={file._id} file={file} />
                ))}
                {plainFiles.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                        No images uploaded yet.
                    </div>
                )}
            </div>
        </div>
    )
}
