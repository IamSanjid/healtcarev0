import db from "@/lib/db";
import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function MessagesPage() {
  const session = await getSession();
  if (!session || session.user.role !== "STUDENT") {
    redirect("/login");
  }

  // Fetch recent conversations
  const messages = await db.message.findMany({
    where: {
      OR: [
        { senderId: session.user.id },
        { receiverId: session.user.id },
      ],
    },
    include: {
      sender: true,
      receiver: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 50,
  });

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col space-y-4 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground italic">"Direct communication with your healthcare providers."</p>
      </div>

      <div className="flex-1 grid md:grid-cols-[300px_1fr] gap-6 overflow-hidden">
        {/* Sidebar: Conversations */}
        <Card className="rounded-2xl border-none shadow-sm flex flex-col overflow-hidden bg-card">
          <CardHeader className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9 h-10 bg-muted/50 border-none rounded-xl" placeholder="Search chats..." />
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto">
            <div className="divide-y divide-muted/30">
              {/* Dummy Conversation Items */}
              {[1, 2, 3].map((i) => (
                <div key={i} className={`p-4 hover:bg-muted/30 cursor-pointer transition-colors flex gap-3 ${i === 1 ? 'bg-primary/5' : ''}`}>
                  <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-sm truncate">Dr. Sarah Ahmed</span>
                      <span className="text-[10px] text-muted-foreground">10:45 AM</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      Regarding your recent checkup results...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="rounded-3xl border-none shadow-md flex flex-col overflow-hidden bg-card">
          <CardHeader className="p-4 border-b flex flex-row items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <User className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">Dr. Sarah Ahmed</CardTitle>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex flex-col items-center justify-center py-10 opacity-20 select-none pointer-events-none">
              <MessageSquare className="h-16 w-16 mb-4" />
              <p className="text-sm font-medium">Chat is encrypted and secure</p>
            </div>
            
            {/* Dummy Messages */}
            <div className="flex justify-start">
              <div className="bg-muted max-w-[80%] p-3 rounded-2xl rounded-tl-none text-sm shadow-sm">
                Hello! I've reviewed your latest reports. Can we discuss them briefly?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground max-w-[80%] p-3 rounded-2xl rounded-tr-none text-sm shadow-sm">
                Sure Doctor. I'm available now.
              </div>
            </div>
          </CardContent>

          <footer className="p-4 border-t bg-muted/20">
            <form className="flex gap-2">
              <Input className="flex-1 h-12 bg-background border-none rounded-xl px-4 shadow-inner" placeholder="Type your message..." />
              <Button size="icon" className="h-12 w-12 rounded-xl shadow-lg hover:scale-105 transition-transform">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </footer>
        </Card>
      </div>
    </div>
  );
}
