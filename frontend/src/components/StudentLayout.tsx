import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, ListOrdered, ClipboardList, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const nav = [
  { to: '/', end: true, label: 'Dashboard', icon: LayoutDashboard },
  { to: '/courses', end: false, label: 'Available Courses', icon: BookOpen },
  { to: '/preferences', end: false, label: 'My Preferences', icon: ListOrdered },
  { to: '/result', end: false, label: 'Allotment Result', icon: ClipboardList },
  { to: '/profile', end: false, label: 'Profile', icon: User },
] as const;

export function StudentLayout() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const isStudent = role === 'student';

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-60 border-r bg-card flex flex-col shrink-0">
        <div className="p-5 border-b">
          <h2 className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Course Allotment</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{isStudent ? 'Student Portal' : 'Admin Portal'}</p>
        </div>
        <nav className="p-3 flex-1 space-y-1">
          {nav.map(({ to, end, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                  isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t">
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b bg-card px-6 flex items-center gap-4 shrink-0">
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{user?.name ?? user?.email}</span>
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
              {(user?.name ?? user?.email ?? '?').charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
