import { AdminApp } from "@/components/admin/admin-app";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[hsl(var(--background))] text-foreground">
      <AdminApp />
    </main>
  );
}
