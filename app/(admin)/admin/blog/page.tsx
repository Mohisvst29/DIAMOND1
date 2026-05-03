import connectDB from "@/lib/db"
import Post from "@/models/Post"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { deletePost } from "@/actions/blog-actions"

export const dynamic = "force-dynamic"

export default async function BlogAdminPage() {
    const db = await connectDB()
    let posts: any[] = []
    if (db) {
        try {
            posts = await Post.find({}).sort({ createdAt: -1 })
        } catch (e) {
            posts = []
        }
    }

    return (
        <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Blog Posts</h1>
                <Link href="/admin/blog/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> New Post
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border">
                <div className="flex flex-col">
                    <div className="grid grid-cols-12 gap-4 border-b bg-muted/50 p-4 font-medium">
                        <div className="col-span-6">Title</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2">Date</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>
                    {posts.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground">No posts found.</div>
                    ) : (
                        posts.map((post) => (
                            <div key={post._id} className="grid grid-cols-12 gap-4 border-b p-4 items-center last:border-0 hover:bg-muted/10">
                                <div className="col-span-6 font-medium">
                                    {post.title}
                                    <div className="text-xs text-muted-foreground">{post.slug}</div>
                                </div>
                                <div className="col-span-2">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${post.isPublished ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                        }`}>
                                        {post.isPublished ? "Published" : "Draft"}
                                    </span>
                                </div>
                                <div className="col-span-2 text-sm text-muted-foreground">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </div>
                                <div className="col-span-2 flex justify-end gap-2">
                                    <Link href={`/admin/blog/${post._id}`}>
                                        <Button variant="ghost" size="icon">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <form action={deletePost.bind(null, post._id.toString())}>
                                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
