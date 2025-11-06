import { Link, useLocation } from "react-router-dom";
import { Home, Code, Target, FolderOpen, LogOut, User } from "lucide-react";

import { cn } from "../utils/cn";
import { useAuth } from "../../features/auth/context/AuthContext";
import { Button } from "../ui/Button";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Technologies", href: "/technologies", icon: Code },
  { name: "Skills", href: "/skills", icon: Target },
  { name: "Projects", href: "/projects", icon: FolderOpen },
];

export const Header = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (item: { href: string }) => location.pathname === item.href;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-gray-300 shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" data-testid="hero-logo">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-gray-950 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Portfolio CMS</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive(item) ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Navigation */}
          <nav className="md:hidden flex space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    isActive(item) ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                  )}
                  title={item.name}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Link
              to="/api-keys"
              className={cn(
                "flex items-center space-x-2 px-3 py-1.5 text-sm rounded-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
                isActive({ href: "/api-keys" })
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
              )}
              data-testid="user-settings-link"
            >
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{user?.name}</span>
              </div>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center space-x-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
