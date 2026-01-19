import { Navbar } from "@/components/navbar";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-20">
        <div className="w-full max-w-6xl mx-auto px-4">
          {children}
        </div>
      </main>
    </div>
  );
}
