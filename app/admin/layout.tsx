import "@/app/globals.css"

export const metadata = {
  title: 'Admin Panel - Login',
  description: 'Admin login for Diamond Growth',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
