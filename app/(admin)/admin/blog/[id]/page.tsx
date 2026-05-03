import connectDB from "@/lib/db"
import Post from "@/models/Post"
import PostForm from "@/components/post-form"
import { notFound } from "next/navigation"

export default async function EditPostPage({ params }: { params: { id: string } }) {
    await connectDB()
    const post = await Post.findById(params.id)

    if (!post) {
        notFound()
    }

    // Convert to plain object to pass to client component
    const plainPost = JSON.parse(JSON.stringify(post))

    return (
        <div className="space-y-6 pt-6 pb-12">
            <h1 className="text-3xl font-bold">Edit Post</h1>
            <PostForm post={plainPost} isEdit />
        </div>
    )
}
