import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LogOut, Users, BookOpen, Zap, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: BarChart3 },
    { label: 'Students', path: '/admin/students', icon: Users },
    { label: 'Courses', path: '/admin/courses', icon: BookOpen },
    { label: 'Allotment', path: '/admin/allotment', icon: Zap },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-60 bg-card border-r flex flex-col">
        {/* Logo */}
        <div className="p-5 border-b">
          <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Admin Portal
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">Course Allotment System</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full flex items-center justify-start gap-3 text-muted-foreground hover:text-destructive"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
