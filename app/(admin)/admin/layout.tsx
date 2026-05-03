import Link from "next/link"
import { signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import {
    LayoutDashboard,
    FileText,
    Image as ImageIcon,
    Settings,
    LogOut,
    Building2,
    Wrench,
    Menu,
    X,
    FolderOpen,
    User,
    Link as LinkIcon
} from "lucide-react"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen w-full bg-[#F5F5F7]">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 right-0 z-50 hidden w-72 flex-col bg-[#0D2240] text-white shadow-xl lg:flex">
                <div className="flex h-20 items-center px-6 border-b border-white/10">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="bg-[#C4D600] rounded-lg p-2">
                            <LayoutDashboard className="h-6 w-6 text-[#0D2240]" />
                        </div>
                        <div>
                            <span className="block font-bold text-lg tracking-wide">لوحة التحكم</span>
                            <span className="text-xs text-[#C4D600] opacity-80">DGR Diamond Growth</span>
                        </div>
                    </Link>
                </div>

                <div className="flex-1 overflow-auto py-6 px-4 space-y-1">
                    <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">الرئيسية</p>
                    <NavItem href="/admin" icon={LayoutDashboard} label="لوحة التحكم" />

                    <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-2">المحتوى</p>
                    <NavItem href="/admin/projects" icon={Building2} label="المشاريع" />
                    <NavItem href="/admin/services" icon={Wrench} label="الخدمات" />
                    <NavItem href="/admin/blog" icon={FileText} label="المدونة" />
                    <NavItem href="/admin/partners" icon={User} label="شركاء النجاح" />
                    <NavItem href="/admin/internal-links" icon={LinkIcon} label="الروابط الداخلية" />
                    <NavItem href="/admin/media" icon={ImageIcon} label="مكتبة الوسائط" />
                    <NavItem href="/admin/content" icon={Settings} label="محتوى الموقع" />
                </div>

                <div className="p-4 border-t border-white/10 bg-[#0A1B33]">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-[#C4D600]" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">المدير العام</p>
                            <p className="text-xs text-gray-400">admin@admin.com</p>
                        </div>
                    </div>
                    <form
                        action={async () => {
                            "use server"
                            await signOut()
                        }}
                    >
                        <Button variant="destructive" className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 border-0 justify-start" size="sm">
                            <LogOut className="mr-2 h-4 w-4 ml-2" />
                            تسجيل خروج
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col lg:pr-72 transition-all duration-300">
                <header className="sticky top-0 z-40 flex h-20 items-center justify-between gap-4 border-b bg-white/80 px-6 backdrop-blur-sm shadow-sm lg:hidden">
                    <Link href="/admin" className="flex items-center gap-2 font-semibold">
                        <LayoutDashboard className="h-6 w-6 text-[#0D2240]" />
                        <span className="text-[#0D2240]">لوحة التحكم</span>
                    </Link>
                    {/* Mobile menu trigger would go here - for now rely on desktop first design */}
                </header>

                <main className="flex-1 p-8 overflow-x-hidden">
                    <div className="mx-auto max-w-7xl animate-fade-in">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

function NavItem({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition-all hover:bg-white/10 hover:text-white hover:-translate-x-1 group"
        >
            <Icon className="h-5 w-5 text-gray-400 group-hover:text-[#C4D600] transition-colors" />
            {label}
        </Link>
    )
}
