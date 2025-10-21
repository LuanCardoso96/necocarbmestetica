import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Home, Calendar, User, Settings, Bell, LogOut, 
  LayoutDashboard, Users, ClipboardList 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

const ADMIN_EMAIL = "admin@bmestetica.com";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const pendingNotifications = [];

  React.useEffect(() => {
    if (user) {
      setIsAdmin(user.email === ADMIN_EMAIL);
    }
  }, [user]);

  const clientNavigation = [
    { title: "Início", url: createPageUrl("Home"), icon: Home },
    { title: "Serviços", url: createPageUrl("Servicos"), icon: ClipboardList },
    { title: "Agendar", url: createPageUrl("Agendamento"), icon: Calendar },
    { title: "Meu Perfil", url: createPageUrl("Perfil"), icon: User },
  ];

  const adminNavigation = [
    { title: "Dashboard", url: createPageUrl("AdminDashboard"), icon: LayoutDashboard },
    { title: "Agendamentos", url: createPageUrl("AdminAgendamentos"), icon: Calendar },
    { title: "Clientes", url: createPageUrl("AdminClientes"), icon: Users },
    { title: "Serviços", url: createPageUrl("AdminServicos"), icon: Settings },
  ];

  const navigation = isAdmin ? adminNavigation : clientNavigation;

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <Sidebar className="border-r border-gray-200 bg-white">
          <SidebarHeader className="border-b border-gray-200 p-6 bg-white">
            <div className="flex items-center gap-3">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f51afc1323bf402418319c/ec62377ec_logo.png" 
                alt="BM Logo" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h2 className="font-bold text-lg text-blue-600">BM Estética</h2>
                <p className="text-xs text-gray-600">Automotiva Premium</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3 bg-white">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 py-2">
                Navegação
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigation.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 rounded-lg mb-1 ${
                          location.pathname === item.url 
                            ? 'bg-blue-100 text-blue-600 border-l-4 border-blue-600' 
                            : 'text-gray-700'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-3 py-2.5">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 py-2">
                Notificações
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <Link to={createPageUrl("Notificacoes")}>
                  <div className="px-3 py-3 hover:bg-blue-50 rounded-lg transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Bell className="w-5 h-5 text-blue-600" />
                        {pendingNotifications.length > 0 && (
                          <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-blue-600 text-white font-bold">
                            {pendingNotifications.length}
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-gray-700">Alertas</span>
                    </div>
                  </div>
                </Link>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200 p-4 bg-white">
            {user && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {user.full_name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-black text-sm truncate">
                      {user.full_name || 'Usuário'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            )}
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col bg-white">
          <header className="bg-white border-b border-gray-200 px-6 py-4 md:hidden shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-blue-50 p-2 rounded-lg transition-colors duration-200 text-blue-600" />
              <div className="flex items-center gap-2">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f51afc1323bf402418319c/ec62377ec_logo.png" 
                  alt="BM Logo" 
                  className="w-8 h-8 object-contain"
                />
                <h1 className="text-lg font-bold text-blue-600">BM Estética</h1>
              </div>
              <Link to={createPageUrl("Notificacoes")} className="ml-auto relative">
                <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50">
                  <Bell className="w-6 h-6" />
                  {pendingNotifications.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-blue-600 text-white font-bold text-xs">
                      {pendingNotifications.length}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </header>

          <div className="flex-1 overflow-auto bg-white">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
