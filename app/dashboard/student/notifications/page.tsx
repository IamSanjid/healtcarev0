import db from "@/lib/db";
import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Check, Trash2, Calendar, ClipboardCheck, Info } from "lucide-react";
import { format } from "date-fns";

export default async function NotificationsPage() {
  const session = await getSession();
  if (!session || session.user.role !== "STUDENT") {
    redirect("/login");
  }

  const notifications = await db.notification.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("appointment")) return <Calendar className="h-4 w-4" />;
    if (t.includes("prescription") || t.includes("form")) return <ClipboardCheck className="h-4 w-4" />;
    return <Info className="h-4 w-4" />;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground italic">"Stay updated with your healthcare activities."</p>
        </div>
        <Button variant="outline" size="sm" className="rounded-full gap-1.5 h-9">
          <Check className="h-4 w-4" />
          Mark all as read
        </Button>
      </div>

      {notifications.length === 0 ? (
        <Card className="border-dashed flex flex-col items-center justify-center p-12 text-center bg-muted/20 rounded-3xl">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Bell className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="mb-2">All caught up!</CardTitle>
          <CardDescription className="max-w-xs">
            You don't have any new notifications at the moment.
          </CardDescription>
        </Card>
      ) : (
        <div className="space-y-4">
          {notifications.map((notif) => (
            <Card key={notif.id} className={`overflow-hidden border-none shadow-sm transition-all rounded-2xl ${notif.read ? 'bg-card opacity-80' : 'bg-primary/5 ring-1 ring-primary/10'}`}>
              <CardContent className="p-4 flex gap-4">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${notif.read ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}`}>
                  {getIcon(notif.title)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`text-sm font-bold truncate ${notif.read ? '' : 'text-primary'}`}>{notif.title}</h4>
                    <span className="text-[10px] text-muted-foreground shrink-0">{format(notif.createdAt, "PP p")}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {notif.message}
                  </p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-destructive/10 hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                   </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
