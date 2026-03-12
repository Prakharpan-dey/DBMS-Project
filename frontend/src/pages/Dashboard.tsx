import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ClipboardList, User, GraduationCap, BarChart3, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const { user, role } = useAuth();

  if (role === 'admin') {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage courses, students, and allotments.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Courses</p>
                  <p className="text-sm">Manage available courses</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Students</p>
                  <p className="text-sm">Approve and manage students</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Allotment</p>
                  <p className="text-sm">Run allotment algorithm</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Info</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Logged in as <span className="font-medium text-foreground">{user?.email}</span></p>
            <p className="text-sm text-muted-foreground mt-1">Use the sidebar to navigate between sections.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user?.name?.split(' ')[0] ?? 'Student'}</h1>
        <p className="text-muted-foreground mt-1">Here's an overview of your course allotment status.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Profile Summary</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Roll No</span> <span className="font-medium">{user?.roll_no}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Department</span> <span className="font-medium">{user?.department}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Semester</span> <span className="font-medium">{user?.semester}</span></div>
            {user?.cgpa != null && <div className="flex justify-between"><span className="text-muted-foreground">CGPA</span> <span className="font-medium">{user.cgpa}</span></div>}
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Allotment Status</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">Pending</p>
            <p className="text-xs text-muted-foreground mt-1">Submit preferences and wait for allotment run.</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Deadline</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">TBA</p>
            <p className="text-xs text-muted-foreground mt-1">Preference submission deadline.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link to="/courses" className="group">
          <Card className="hover:shadow-md transition-shadow hover:border-primary/30">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Browse Courses</p>
                  <p className="text-sm text-muted-foreground">View available elective courses</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/preferences" className="group">
          <Card className="hover:shadow-md transition-shadow hover:border-primary/30">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <ClipboardList className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">My Preferences</p>
                  <p className="text-sm text-muted-foreground">Set your course preferences</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
