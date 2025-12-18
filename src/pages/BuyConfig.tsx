import { useState } from "react";
import { Smartphone, Tablet, ShoppingCart, Check, Info, Copy, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";
import { QRCodeSVG } from "qrcode.react";

const iphoneServices = [
  { id: 1, name: "سرویس 1 کاربره آیفون - 2 گیگ 7 روزه", price: 8000, users: 1, traffic: 2, days: 7 },
  { id: 2, name: "سرویس 1 کاربره آیفون - 10 گیگ 30 روزه", price: 40000, users: 1, traffic: 10, days: 30 },
  { id: 3, name: "سرویس 2 کاربره آیفون - 20 گیگ 30 روزه", price: 74000, users: 2, traffic: 20, days: 30 },
  { id: 4, name: "سرویس 2 کاربره آیفون - 30 گیگ 30 روزه", price: 110000, users: 2, traffic: 30, days: 30 },
  { id: 5, name: "سرویس 3 کاربره آیفون - 50 گیگ 30 روزه", price: 180000, users: 3, traffic: 50, days: 30 },
  { id: 6, name: "سرویس 3 کاربره آیفون - 100 گیگ 90 روزه", price: 370000, users: 3, traffic: 100, days: 90 },
  { id: 7, name: "سرویس 4 کاربره آیفون - 200 گیگ 90 روزه", price: 740000, users: 4, traffic: 200, days: 90 },
];

const androidServices = [
  { id: 101, name: "سرویس 1 کاربره اندروید - 2 گیگ 7 روزه", price: 7000, users: 1, traffic: 2, days: 7 },
  { id: 102, name: "سرویس 1 کاربره اندروید - 10 گیگ 30 روزه", price: 35000, users: 1, traffic: 10, days: 30 },
  { id: 103, name: "سرویس 2 کاربره اندروید - 20 گیگ 30 روزه", price: 65000, users: 2, traffic: 20, days: 30 },
  { id: 104, name: "سرویس 2 کاربره اندروید - 30 گیگ 30 روزه", price: 95000, users: 2, traffic: 30, days: 30 },
  { id: 105, name: "سرویس 3 کاربره اندروید - 50 گیگ 30 روزه", price: 160000, users: 3, traffic: 50, days: 30 },
  { id: 106, name: "سرویس 3 کاربره اندروید - 100 گیگ 90 روزه", price: 320000, users: 3, traffic: 100, days: 90 },
];

function CopyButtonLarge({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${label} کپی شد!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="gap-2 border-border/50 hover:bg-primary/10 hover:text-primary"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-success" />
          کپی شد!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          کپی لینک
        </>
      )}
    </Button>
  );
}

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  services: typeof iphoneServices;
  gradient: string;
  iconBg: string;
  onSuccess: (configId: string, configLink: string) => void;
}

function ServiceCard({ icon: Icon, title, services, gradient, iconBg, onSuccess }: ServiceCardProps) {
  const [selectedService, setSelectedService] = useState<string>("");
  const [displayName, setDisplayName] = useState("");

  const selected = services.find(s => s.id.toString() === selectedService);

  const handleBuy = () => {
    if (!selectedService) {
      toast.error("لطفا یک سرویس انتخاب کنید");
      return;
    }
    // Generate a random config ID
    const configId = Math.random().toString(36).substring(2, 12);
    const configLink = `vless://${configId}@example.server.com:443?type=ws&security=tls&path=/ws#Config-${displayName || configId}`;
    
    toast.success("سرویس با موفقیت خریداری شد!");
    onSuccess(configId, configLink);
    
    // Reset form
    setSelectedService("");
    setDisplayName("");
  };

  return (
    <Card className={`glass-card glow-border overflow-hidden animate-slide-up`}>
      {/* Header */}
      <div className={`p-6 bg-gradient-to-r ${gradient} border-b border-border/50`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${iconBg}`}>
            <Icon className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-primary-foreground">{title}</h3>
            <p className="text-sm text-primary-foreground/70">{services.length} سرویس موجود</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5">
        {/* Service Select */}
        <div className="space-y-2">
          <Label className="text-muted-foreground">انتخاب سرویس</Label>
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger className="bg-secondary/50 border-border/50 h-12">
              <SelectValue placeholder="انتخاب کنید" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border z-50">
              {services.map((service) => (
                <SelectItem
                  key={service.id}
                  value={service.id.toString()}
                  className="py-3 focus:bg-secondary cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full gap-4">
                    <span>{service.name}</span>
                    <span className="text-foreground font-bold">
                      {service.price.toLocaleString('en-US')} تومان
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Selected Service Details */}
        {selected && (
          <Card className="p-4 bg-secondary/30 border-border/50 animate-fade-in">
            <div className="flex items-center gap-2 mb-3 text-muted-foreground">
              <Info className="w-4 h-4" />
              <span className="text-sm font-medium">جزئیات سرویس</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-foreground">{selected.users}</p>
                <p className="text-xs text-muted-foreground">کاربر</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{selected.traffic}</p>
                <p className="text-xs text-muted-foreground">گیگابایت</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{selected.days}</p>
                <p className="text-xs text-muted-foreground">روز</p>
              </div>
            </div>
          </Card>
        )}

        {/* Display Name */}
        <div className="space-y-2">
          <Label className="text-muted-foreground">
            نام نمایشی
            <span className="text-xs text-muted-foreground/70 mr-2">(اختیاری)</span>
          </Label>
          <Input
            placeholder="نام دلخواه برای کانفیگ..."
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="bg-secondary/50 border-border/50 h-12"
          />
        </div>

        {/* Price & Buy */}
        {selected && (
          <div className="pt-4 border-t border-border/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground">مبلغ قابل پرداخت:</span>
              <span className="text-2xl font-bold text-foreground">
                {selected.price.toLocaleString('en-US')} تومان
              </span>
            </div>
          </div>
        )}

        <Button
          onClick={handleBuy}
          disabled={!selectedService}
          className="w-full h-12 bg-primary hover:bg-primary/90 transition-opacity gap-2 text-lg font-medium text-primary-foreground"
        >
          <ShoppingCart className="w-5 h-5" />
          خرید سرویس
        </Button>
      </div>
    </Card>
  );
}

export default function BuyConfig() {
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [createdConfig, setCreatedConfig] = useState<{ id: string; link: string } | null>(null);

  const handleSuccess = (configId: string, configLink: string) => {
    setCreatedConfig({ id: configId, link: configLink });
    setSuccessDialogOpen(true);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">خرید کانفیگ</h1>
          <p className="text-muted-foreground">سرویس مورد نظر خود را انتخاب کنید</p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <ServiceCard
            icon={Smartphone}
            title="سرویس های مخصوص آیفون"
            services={iphoneServices}
            gradient="from-blue-600/80 to-purple-600/80"
            iconBg="bg-primary-foreground/20"
            onSuccess={handleSuccess}
          />
          <ServiceCard
            icon={Tablet}
            title="سرویس های مخصوص اندروید"
            services={androidServices}
            gradient="from-green-600/80 to-emerald-600/80"
            iconBg="bg-primary-foreground/20"
            onSuccess={handleSuccess}
          />
        </div>

        {/* Info Card */}
        <Card className="glass-card p-6 animate-slide-up">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-info/20 text-info">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">نکات مهم</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  پس از خرید، کانفیگ بلافاصله فعال می‌شود
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  امکان تمدید قبل از اتمام اعتبار وجود دارد
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  پشتیبانی 24 ساعته از طریق تلگرام
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Success Dialog */}
        <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
          <DialogContent className="glass-card border-border/50 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center flex items-center justify-center gap-2">
                <Check className="w-6 h-6 text-success" />
                کانفیگ با موفقیت ساخته شد!
              </DialogTitle>
              <DialogDescription className="text-center">
                کانفیگ شما آماده استفاده است. لینک و QR کد زیر را ذخیره کنید.
              </DialogDescription>
            </DialogHeader>
            {createdConfig && (
              <div className="space-y-6 py-4">
                {/* QR Code */}
                <div className="flex flex-col items-center gap-4 p-6 bg-secondary/30 rounded-2xl border border-border/50">
                  <div className="bg-white rounded-xl p-4">
                    <QRCodeSVG
                      value={createdConfig.link}
                      size={160}
                      level="M"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    QR Code را اسکن کنید یا لینک زیر را کپی نمایید
                  </p>
                </div>

                {/* Config ID */}
                <div className="p-3 bg-secondary/30 rounded-xl border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">شناسه کانفیگ:</p>
                  <p className="font-mono text-accent">{createdConfig.id}</p>
                </div>

                {/* Config Link */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">لینک کانفیگ:</p>
                  <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-xl border border-border/50">
                    <code className="flex-1 text-xs font-mono text-accent break-all line-clamp-2">
                      {createdConfig.link}
                    </code>
                    <CopyButtonLarge text={createdConfig.link} label="لینک کانفیگ" />
                  </div>
                </div>

                <Button
                  onClick={() => setSuccessDialogOpen(false)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  متوجه شدم
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
