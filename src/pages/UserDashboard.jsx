import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';
import ProtectedRoute from '../components/ProtectedRoute';

const UserDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-brand-soft">
                    <Icon name="User" size={40} color="white" strokeWidth={2} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                    <Icon name="Sparkles" size={14} color="white" strokeWidth={3} />
                  </div>
                </div>
              </div>
              <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
                Welcome, {user?.name}!
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage your travel preferences and bookings
              </p>
            </div>

            {/* Dashboard Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Profile Card */}
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl shadow-brand-soft border border-border/50 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="User" size={20} color="hsl(var(--primary))" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Profile</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Manage your personal information and preferences
                </p>
                <Button variant="outline" size="sm" fullWidth>
                  Edit Profile
                </Button>
              </div>

              {/* Bookings Card */}
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl shadow-brand-soft border border-border/50 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Calendar" size={20} color="hsl(var(--secondary))" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Bookings</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  View and manage your travel bookings
                </p>
                <Button variant="outline" size="sm" fullWidth>
                  View Bookings
                </Button>
              </div>

              {/* Favorites Card */}
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl shadow-brand-soft border border-border/50 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Heart" size={20} color="hsl(var(--accent))" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Favorites</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Your saved destinations and packages
                </p>
                <Button variant="outline" size="sm" fullWidth>
                  View Favorites
                </Button>
              </div>
            </div>

            {/* User Info */}
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl shadow-brand-soft border border-border/50 p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Name
                  </label>
                  <p className="text-foreground">{user?.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Email
                  </label>
                  <p className="text-foreground">{user?.email}</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border/50">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={logout}
                  iconName="LogOut"
                  iconPosition="left"
                  iconSize={16}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default UserDashboard;