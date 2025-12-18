import { Link, useLocation } from "react-router-dom";
import { Home, List, ShoppingCart, Wallet, Search, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const navItems = [
  { path: "/", label: "داشبورد", icon: Home },
  { path: "/search", label: "جستجو", icon: Search },
  { path: "/configs", label: "لیست کانفیگ ها", icon: List },
  { path: "/buy", label: "خرید کانفیگ", icon: ShoppingCart },
  { path: "/charge", label: "شارژ پنل", icon: Wallet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Navbar */}
      <nav className="hidden md:flex items-center justify-between px-6 py-4 glass-card border-b border-border/50 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg">
            V
          </div>
          <span className="text-xl font-bold text-foreground">VPN Panel</span>
        </div>

        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-base font-semibold">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-2 text-base font-semibold"
        >
          <LogOut className="w-5 h-5" />
          <span>خروج</span>
        </Button>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden flex items-center justify-between px-4 py-3 glass-card border-b border-border/50 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
            V
          </div>
          <span className="font-bold gradient-text">VPN Panel</span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-14 z-40 bg-background/95 backdrop-blur-xl animate-fade-in">
          <div className="flex flex-col p-4 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-4 rounded-xl transition-all ${
                    isActive
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-base font-semibold">{item.label}</span>
                </Link>
              );
            })}
            <hr className="border-border my-2" />
            <Button
              variant="ghost"
              className="justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-3 px-4 text-base font-semibold"
            >
              <LogOut className="w-5 h-5" />
              <span>خروج</span>
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
