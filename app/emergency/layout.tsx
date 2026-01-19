import { Navbar } from "@/components/navbar";

export default function EmergencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 w-full pt-20">
        <div className="container mx-auto px-4 md:px-6">
          {children}
        </div>
      </main>
      
      <footer className="bg-muted/5 border-t py-12 mt-20">
        <div className="container mx-auto px-6 text-center text-sm font-bold text-muted-foreground uppercase tracking-widest">
          © 2026 UIU Health Portal • Emergency Services
        </div>
      </footer>
    </div>
  );
}
