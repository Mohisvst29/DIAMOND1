import connectDB from "@/lib/db"
import SiteContent from "@/models/SiteContent"
import ClientFloatingContact from "./client-floating-contact"

export default async function FloatingContact() {
  let phone = "+966536788004"

  try {
    const db = await connectDB()
    if (db) {
      const doc = await SiteContent.findOne({ key: 'contact_phone' }).lean()
      if (doc && doc.value) phone = doc.value as string
    }
  } catch (error) {
    console.error("Failed to fetch contact phone:", error)
  }

  return <ClientFloatingContact phone={phone} />
}
