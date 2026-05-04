// Locale-aware redirect for admin login
import { redirect } from 'next/navigation';

export default function LocaleAdminLoginRedirect() {
  // Immediately redirect to the core admin login page (non‑localized)
  redirect('/admin/login');
  // This return is never reached but satisfies React component requirements
  return null;
}
