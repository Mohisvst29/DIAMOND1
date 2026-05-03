import connectDB from "@/lib/db"
import SiteContent from "@/models/SiteContent"
import ClientContactInfo from "./client-contact-info"

export default async function ContactInfo() {
  let email = "info@nmudiamond.com"
  let phone = "+966536788004"
  let location = "طريق الملك عبدالعزيز، السعودية والأردن"
  
  let facebook = ""
  let twitter = ""
  let instagram = ""
  let linkedin = ""
  let snapchat = ""
  let tiktok = ""

  try {
    const db = await connectDB()
    if (db) {
      const content = await SiteContent.find({ key: { $in: [
        'contact_email', 'contact_phone', 'contact_location',
        'social_facebook', 'social_twitter', 'social_instagram', 'social_linkedin', 'social_snapchat', 'social_tiktok'
      ] } }).lean()
      
      const getVal = (k: string) => content.find((c: any) => c.key === k)?.value as string || ""
      
      if (getVal('contact_email')) email = getVal('contact_email')
      if (getVal('contact_phone')) phone = getVal('contact_phone')
      if (getVal('contact_location')) location = getVal('contact_location')
      
      facebook = getVal('social_facebook')
      twitter = getVal('social_twitter')
      instagram = getVal('social_instagram')
      linkedin = getVal('social_linkedin')
      snapchat = getVal('social_snapchat')
      tiktok = getVal('social_tiktok')
    }
  } catch (error) {
    console.error("Failed to fetch contact info settings:", error)
  }

  return (
    <ClientContactInfo 
      email={email}
      phone={phone}
      location={location}
      facebook={facebook}
      twitter={twitter}
      instagram={instagram}
      linkedin={linkedin}
      snapchat={snapchat}
      tiktok={tiktok}
    />
  )
}
