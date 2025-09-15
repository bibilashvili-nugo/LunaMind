export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka">
      <body className="bg-gray-50">
        <div className="flex min-h-screen">
          <aside className="w-64 bg-gray-900 text-white p-4">
            <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
            <nav className="space-y-2">
              <a href="/admin" className="block hover:text-blue-400">
                Dashboard
              </a>
              <a href="/admin/users" className="block hover:text-blue-400">
                Users
              </a>
              <a href="/admin/settings" className="block hover:text-blue-400">
                Settings
              </a>
            </nav>
          </aside>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
