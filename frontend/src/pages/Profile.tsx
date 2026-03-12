import { useAuth } from '@/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Hash, Building2, BookOpenCheck, TrendingUp } from 'lucide-react';

export function Profile() {
  const { user } = useAuth();

  const fields = [
    { label: 'Roll Number', value: user?.roll_no, icon: Hash },
    { label: 'Email', value: user?.email, icon: Mail },
    { label: 'Department', value: user?.department, icon: Building2 },
    { label: 'Semester', value: user?.semester, icon: BookOpenCheck },
    ...(user?.cgpa != null ? [{ label: 'CGPA', value: user.cgpa, icon: TrendingUp }] : []),
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground mt-1">Your account details.</p>
      </div>

      <Card className="max-w-lg">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b">
            <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold">
              {(user?.name ?? '?').charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-lg font-semibold">{user?.name ?? '–'}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="space-y-4">
            {fields.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="text-sm font-medium">{value ?? '–'}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
