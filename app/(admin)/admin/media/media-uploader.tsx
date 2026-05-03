"use client"

import { useState, useRef } from "react"
import { uploadImage } from "@/actions/media-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function MediaUploader() {
    const [isUploading, setIsUploading] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    async function handleUpload(formData: FormData) {
        setIsUploading(true)
        try {
            const result = await uploadImage(formData)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success("Image uploaded successfully")
                formRef.current?.reset()
            }
        } catch (e) {
            toast.error("An unexpected error occurred")
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
            <h3 className="text-lg font-medium mb-4">Upload New Image</h3>
            <form ref={formRef} action={handleUpload} className="flex gap-4 items-center">
                <Input
                    type="file"
                    name="file"
                    accept="image/*"
                    required
                    disabled={isUploading}
                    className="max-w-xs cursor-pointer"
                />
                <Button type="submit" disabled={isUploading}>
                    {isUploading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                        </>
                    ) : (
                        <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload
                        </>
                    )}
                </Button>
            </form>
        </div>
    )
}
