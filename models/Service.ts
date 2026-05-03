import mongoose, { Schema, Document, Model } from "mongoose"

export interface IService extends Document {
    title: string
    description: string
    details: string
    href: string
    icon: string
    image: string
    order: number
    features: string[]
    benefits: string[]
    gallery: string[]
    createdAt: Date
    updatedAt: Date
}

const ServiceSchema = new Schema<IService>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        details: { type: String, required: true },
        href: { type: String, required: true },
        icon: { type: String, required: true },
        image: { type: String },
        order: { type: Number, default: 0 },
        features: [{ type: String, required: true }],
        benefits: [{ type: String, required: true }],
        gallery: [{ type: String }],
    },
    { timestamps: true }
)

const Service: Model<IService> = mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema)

export default Service
