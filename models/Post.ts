import mongoose, { Schema, Document, Model } from "mongoose"

export interface IPost extends Document {
    slug: string
    title: string
    excerpt?: string
    content?: string
    featuredImage?: string
    isPublished: boolean
    publishedAt?: Date
    author?: string
    tags: string[]
    // SEO fields
    autoSEO?: boolean
    autoInternalLinks?: boolean
    metaTitle?: string
    metaDescription?: string
    metaKeywords?: string[]
    manualSEO?: {
        title?: string
        description?: string
        keywords?: string[]
        ogImage?: string
        canonicalUrl?: string
        noIndex?: boolean
        noFollow?: boolean
    }
    // Internal linking fields
    manualLinks?: any[]
    processedContent?: string
    internalLinksApplied?: string[]
    createdAt: Date
    updatedAt: Date
}

const PostSchema = new Schema<IPost>(
    {
        slug: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        excerpt: String,
        content: String,
        featuredImage: String,
        isPublished: { type: Boolean, default: false },
        publishedAt: Date,
        author: String,
        tags: [String],
        // SEO fields
        autoSEO: { type: Boolean, default: true },
        autoInternalLinks: { type: Boolean, default: true },
        metaTitle: String,
        metaDescription: String,
        metaKeywords: [String],
        manualSEO: {
            title: String,
            description: String,
            keywords: [String],
            ogImage: String,
            canonicalUrl: String,
            noIndex: Boolean,
            noFollow: Boolean,
        },
        // Internal linking fields
        manualLinks: { type: Array },
        processedContent: { type: String },
        internalLinksApplied: { type: [String], default: [] },
    },
    {
        timestamps: true,
    }
)

// Prevent overwriting model if already compiled
const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema)

export default Post
