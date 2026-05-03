import ClientHeader from "./client-header"
import connectDB from "@/lib/db"
import SiteContent from "@/models/SiteContent"

export default async function Header() {
  let logoUrl = "/logo.png"
  let logoHeight = "48" // default px

  try {
    const db = await connectDB()
    if (db) {
      const content = await SiteContent.find({ key: { $in: ['logo_image', 'logo_height'] } }).lean()
      const urlDoc = content.find((c: any) => c.key === 'logo_image')
      const heightDoc = content.find((c: any) => c.key === 'logo_height')
      if (urlDoc && urlDoc.value) logoUrl = urlDoc.value as string
      if (heightDoc && heightDoc.value) logoHeight = heightDoc.value as string
    }
  } catch (error) {
    console.error("Failed to fetch logo settings:", error)
  }

  return <ClientHeader logoUrl={logoUrl} logoHeight={logoHeight} />
}
