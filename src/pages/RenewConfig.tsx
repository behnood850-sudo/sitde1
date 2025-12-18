import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const packages = [
  { id: 1, label: "سرویس 1 کاربره - 2 گیگ 7 روزه", price: 8000 },
  { id: 2, label: "سرویس 1 کاربره - 10 گیگ 30 روزه", price: 30000 },
  { id: 3, label: "سرویس 2 کاربره - 20 گیگ 30 روزه", price: 53000 },
  { id: 4, label: "سرویس 2 کاربره - 30 گیگ 30 روزه", price: 78000 },
  { id: 5, label: "سرویس 3 کاربره - 50 گیگ 30 روزه", price: 130000 },
  { id: 6, label: "سرویس 4 کاربره - 100 گیگ 90 روزه", price: 260000 },
  { id: 7, label: "سرویس 4 کاربره - 200 گیگ 90 روزه", price: 520000 },
  { id: 8, label: "سرویس 5 کاربره - 400 گیگ 90 روزه", price: 1040000 },
];

// Mock config data
const configData: Record<string, { displayName: string; configId: string }> = {
  "5876": { displayName: "کاربر ربات", configId: "x2clh9kwkl" },
  "6476": { displayName: "کاربر ربات", configId: "tnh8x5c9y2" },
  "6407": { displayName: "کاربر ربات", configId: "xge4c7drlc" },
};

export default function RenewConfig() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string>("");

  const config = id ? configData[id] : null;

  const handleRenew = () => {
    if (!selectedPackage) return;
    // Handle renewal logic
    navigate("/configs");
  };

  if (!config) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto text-center py-12">
          <h1 className="text-2xl font-bold text-foreground mb-4">کانفیگ یافت نشد</h1>
          <Button onClick={() => navigate("/configs")} variant="outline">
            بازگشت به لیست
          </Button>
        </div>
      </Layout>
    );
  }

  const selected = packages.find(p => p.id.toString() === selectedPackage);

  return (
    <Layout>
      <div className="max-w-xl mx-auto space-y-6">
        <Button
          variant="ghost"
          className="gap-2 text-muted-foreground"
          onClick={() => navigate("/configs")}
        >
          <ArrowRight className="w-4 h-4" />
          بازگشت
        </Button>

        <div className="text-center animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground mb-2">تمدید کانفیگ</h1>
          <p className="text-muted-foreground">
            تمدید کانفیگ <span className="text-accent font-mono">{config.configId}</span>
          </p>
        </div>

        <div className="glass-card glow-border p-6 rounded-xl space-y-6 animate-slide-up">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">انتخاب بسته</label>
            <Select value={selectedPackage} onValueChange={setSelectedPackage}>
              <SelectTrigger className="bg-secondary/50 border-border/50 h-12">
                <SelectValue placeholder="بسته مورد نظر را انتخاب کنید" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {packages.map((pkg) => (
                  <SelectItem key={pkg.id} value={pkg.id.toString()} className="py-3">
                    <div className="flex items-center justify-between w-full gap-4">
                      <span>{pkg.label}</span>
                      <span className="text-foreground font-bold">
                        {pkg.price.toLocaleString('en-US')} تومان
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selected && (
            <div className="p-4 bg-secondary/30 rounded-xl border border-border/50 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">مبلغ قابل پرداخت:</span>
                <span className="text-2xl font-bold text-foreground">
                  {selected.price.toLocaleString('en-US')} تومان
                </span>
              </div>
            </div>
          )}

          <Button
            onClick={handleRenew}
            disabled={!selectedPackage}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-medium"
          >
            تمدید کانفیگ
          </Button>
        </div>
      </div>
    </Layout>
  );
}
