import { AdminApp } from "@/components/admin/admin-app";
import { isAdminConfigured } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  if (!isAdminConfigured()) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 text-center text-muted-foreground">
        Admin is disabled until ADMIN_PASSWORD and JWT_SECRET are configured.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] text-foreground">
      <AdminApp />
    </main>
  );
}
