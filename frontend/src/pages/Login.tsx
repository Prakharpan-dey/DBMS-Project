import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AuthCard } from '@/components/AuthCard';
import { PasswordInput } from '@/components/PasswordInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Login() {
  const [emailOrRoll, setEmailOrRoll] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!emailOrRoll.trim() || !password) {
      setError('Enter email/roll number and password');
      return;
    }
    setLoading(true);
    try {
      const userRole = await login(emailOrRoll.trim(), password);
      // Navigate based on user role
      if (userRole === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
        <div className="relative flex flex-col justify-center px-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Course Allotment Portal</h1>
          <p className="text-lg text-white/80 max-w-md">Manage your course preferences, view allotment results, and track your academic journey — all in one place.</p>
          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">1</div>
              <span>Submit your course preferences</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">2</div>
              <span>CGPA-based fair allotment</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">3</div>
              <span>View your results instantly</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <AuthCard
          title="Course Allotment Portal"
          description="Sign in with your roll number or email"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email_or_roll">Roll No / Email</Label>
              <Input
                id="email_or_roll"
                type="text"
                placeholder="Roll number or rollnumber@nith.ac.in"
                value={emailOrRoll}
                onChange={(e) => setEmailOrRoll(e.target.value)}
                autoComplete="username"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled={loading}
              />
            </div>
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in…' : 'Login'}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              <Link to="/forgot-password" className="underline hover:text-foreground">
                Forgot password?
              </Link>
              {' · '}
              <Link to="/signup" className="underline hover:text-foreground">
                Sign up
              </Link>
            </div>
          </form>
        </AuthCard>
      </div>
    </div>
  );
}
