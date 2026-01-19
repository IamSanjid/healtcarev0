import db from "@/lib/db";
import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Search, UserCheck, UserX, Shield, MoreHorizontal, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function adminUsersPage() {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      doctorProfile: true,
    },
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN": return <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 border-none px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">Admin</Badge>;
      case "DOCTOR": return <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-none px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">Doctor</Badge>;
      case "STUDENT": return <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-none px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">Student</Badge>;
      default: return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground italic">"Overview and control of all registered users on the platform."</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-xl h-11 gap-2 shadow-sm">
              <Filter className="h-4 w-4" /> Filter
           </Button>
           <Button className="rounded-xl h-11 gap-2 shadow-lg shadow-primary/20 bg-primary">
              <Users className="h-4 w-4" /> Add User
           </Button>
        </div>
      </div>

      <Card className="rounded-3xl border-none shadow-sm bg-card overflow-hidden">
        <CardHeader className="border-b px-8 py-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input className="pl-12 h-14 bg-muted/30 border-none rounded-2xl text-lg shadow-inner" placeholder="Search by name, email, or UID..." />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b bg-muted/10 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <th className="px-8 py-5">User</th>
                  <th className="px-8 py-5">Role</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Date Joined</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted/30">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/10 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-11 w-11 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary font-bold ring-2 ring-background ring-offset-2 ring-offset-muted/10">
                          {user.name[0]}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-base leading-none mb-1">{user.name}</span>
                          <span className="text-xs text-muted-foreground">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-8 py-5">
                      {user.role === 'DOCTOR' ? (
                        user.doctorProfile?.approved ? (
                           <Badge variant="outline" className="text-[10px] font-bold uppercase text-green-600 border-green-200 bg-green-50 px-2 py-0.5 rounded-full">Approved</Badge>
                        ) : (
                           <Badge variant="outline" className="text-[10px] font-bold uppercase text-yellow-600 border-yellow-200 bg-yellow-50 px-2 py-0.5 rounded-full">Pending</Badge>
                        )
                      ) : (
                        <Badge variant="outline" className="text-[10px] font-bold uppercase text-muted-foreground border-muted px-2 py-0.5 rounded-full">Active</Badge>
                      )}
                    </td>
                    <td className="px-8 py-5 text-xs text-muted-foreground font-medium">
                       {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-5 text-right">
                       <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-5 w-5" />
                       </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
