import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Copy, Check, Wallet, Users, Tag, ShoppingBag,
  CreditCard, List, ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";

// Mock data - replace with real data
const userData = {
  username: "botuser_5198418510",
  inviteCode: "nsRyYvso",
  walletBalance: 909189,
  discount: 0,
  configsCount: 841,
  referralCount: 9,
  referralIncome: 146720,
};

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${label} کپی شد!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className="h-8 w-8 hover:bg-primary/20 hover:text-primary transition-all"
    >
      {copied ? (
        <Check className="w-4 h-4 text-success" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </Button>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  gradient = "from-primary/20 to-primary/5",
  iconColor = "text-primary"
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  suffix?: string;
  gradient?: string;
  iconColor?: string;
}) {
  return (
    <Card className={`glass-card glow-border p-5 bg-gradient-to-br ${gradient} animate-slide-up hover-glow`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-xl bg-background/50 ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">
        {typeof value === 'number' ? value.toLocaleString('en-US') : value}
        {suffix && <span className="text-sm text-muted-foreground mr-1">{suffix}</span>}
      </p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </Card>
  );
}

function QuickActionCard({
  icon: Icon,
  label,
  to,
  variant = "default"
}: {
  icon: React.ElementType;
  label: string;
  to: string;
  variant?: "default" | "primary" | "accent";
}) {
  const variants = {
    default: "hover:border-primary/50 hover:bg-primary/5",
    primary: "border-primary/30 bg-primary/10 hover:bg-primary/20",
    accent: "border-accent/30 bg-accent/10 hover:bg-accent/20",
  };

  return (
    <Link to={to}>
      <Card className={`glass-card p-4 transition-all duration-300 group cursor-pointer ${variants[variant]}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-background/50">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <span className="font-medium">{label}</span>
          </div>
          <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" />
        </div>
      </Card>
    </Link>
  );
}

export default function Dashboard() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">داشبورد</h1>
          <p className="text-muted-foreground">خوش آمدید! وضعیت حساب خود را مشاهده کنید</p>
        </div>

        {/* User Info Card */}
        <Card className="glass-card glow-border p-6 animate-slide-up">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Username */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50">
              <div>
                <p className="text-xs text-muted-foreground mb-1">نام کاربری شما</p>
                <p className="font-mono text-lg font-semibold text-foreground">{userData.username}</p>
              </div>
              <CopyButton text={userData.username} label="نام کاربری" />
            </div>

            {/* Invite Code */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50">
              <div>
                <p className="text-xs text-muted-foreground mb-1">کد دعوت شما</p>
                <p className="font-mono text-lg font-semibold text-primary">{userData.inviteCode}</p>
              </div>
              <CopyButton text={userData.inviteCode} label="کد دعوت" />
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Wallet}
            label="موجودی کیف پول"
            value={userData.walletBalance}
            suffix="تومان"
            gradient="from-primary/20 to-primary/5"
            iconColor="text-primary"
          />
          <StatCard
            icon={Tag}
            label="تخفیف شما برای خرید"
            value={userData.discount}
            suffix="درصد"
            gradient="from-accent/20 to-accent/5"
            iconColor="text-accent"
          />
          <StatCard
            icon={ShoppingBag}
            label="تعداد کانفیگ خریداری شده"
            value={userData.configsCount}
            suffix="عدد"
            gradient="from-success/20 to-success/5"
            iconColor="text-success"
          />
          <StatCard
            icon={Users}
            label="تعداد زیرمجموعه"
            value={userData.referralCount}
            suffix="نفر"
            gradient="from-warning/20 to-warning/5"
            iconColor="text-warning"
          />
        </div>

        {/* Referral Income Card */}
        <Card className="glass-card glow-border p-6 bg-gradient-to-br from-warning/10 to-warning/5 animate-slide-up">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-warning/20">
                <Wallet className="w-8 h-8 text-warning" />
              </div>
              <div>
                <p className="text-muted-foreground mb-1">درآمد معرفی</p>
                <p className="text-3xl font-bold">
                  <span className="text-foreground">{userData.referralIncome.toLocaleString('en-US')}</span>
                  <span className="text-sm text-muted-foreground mr-2">تومان</span>
                </p>
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                از {userData.referralCount} زیرمجموعه
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-muted-foreground">دسترسی سریع</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <QuickActionCard
              icon={List}
              label="لیست کانفیگ های شما"
              to="/configs"
              variant="primary"
            />
            <QuickActionCard
              icon={Wallet}
              label="شارژ کیف پول"
              to="/charge"
              variant="accent"
            />
            <QuickActionCard
              icon={CreditCard}
              label="لیست پرداخت های شما"
              to="/payments"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
