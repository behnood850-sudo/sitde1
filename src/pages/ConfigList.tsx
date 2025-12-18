import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye, RefreshCw, QrCode, Trash2,
  Search, Filter, ChevronDown, Copy, Check,
  AlertCircle, CheckCircle, ExternalLink, Download, Calendar, Server, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { QRCodeSVG } from "qrcode.react";

// Mock data
const configs = [
  {
    id: 6476,
    displayName: "کاربر ربات",
    configId: "tnh8x5c9y2",
    price: 8000,
    expireDate: "1404/10/01 02:51",
    traffic: { used: 0.0, total: 2.0 },
    daysLeft: 4,
    status: "active",
    server: "fin1.everestip.site",
  },
  {
    id: 6407,
    displayName: "کاربر ربات",
    configId: "xge4c7drlc",
    price: 8000,
    expireDate: "1404/10/18 02:07",
    traffic: { used: 0.0, total: 10.0 },
    daysLeft: 21,
    status: "active",
    server: "fin1.everestip.site",
  },
  {
    id: 5876,
    displayName: "کاربر ربات",
    configId: "x2clh9kwkl",
    price: 30000,
    expireDate: "1404/08/30 11:10",
    traffic: { used: 10.01, total: 10.0 },
    daysLeft: 22,
    status: "expired",
    server: "fin1.everestip.site",
  },
  {
    id: 5871,
    displayName: "کاربر ربات",
    configId: "qi4uuun869",
    price: 520000,
    expireDate: "1404/10/29 20:51",
    traffic: { used: 95.97, total: 200.0 },
    daysLeft: 37,
    status: "active",
    server: "fin2.everestip.site",
  },
  {
    id: 5859,
    displayName: "کاربر ربات",
    configId: "gc89zsr413",
    price: 260000,
    expireDate: "1404/10/29 03:12",
    traffic: { used: 18.87, total: 100.0 },
    daysLeft: 32,
    status: "active",
    server: "fin1.everestip.site",
  },
  {
    id: 5856,
    displayName: "کاربر ربات",
    configId: "wqvizgh7mi",
    price: 260000,
    expireDate: "1404/10/28 18:26",
    traffic: { used: 100.0, total: 100.0 },
    daysLeft: 68,
    status: "expired",
    server: "fin1.everestip.site",
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("کپی شد!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1 hover:bg-primary/20 rounded transition-all"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-success" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
      )}
    </button>
  );
}

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

function StatusBadge({ status, daysLeft }: { status: string; daysLeft: number }) {
  if (status === "expired" || daysLeft <= 0) {
    return (
      <Badge className="bg-destructive/20 text-destructive border-destructive/30 gap-1">
        <AlertCircle className="w-3 h-3" />
        نیاز به تمدید
      </Badge>
    );
  }
  if (daysLeft <= 5) {
    return (
      <Badge className="bg-warning/20 text-warning border-warning/30 gap-1">
        <AlertCircle className="w-3 h-3" />
        در حال انقضا
      </Badge>
    );
  }
  return (
    <Badge className="bg-success/20 text-success border-success/30 gap-1">
      <CheckCircle className="w-3 h-3" />
      فعال
    </Badge>
  );
}

function TrafficBar({ used, total }: { used: number; total: number }) {
  const percentage = Math.min((used / total) * 100, 100);
  const isHigh = percentage >= 85;
  const isMedium = percentage >= 50 && percentage < 85;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">حجم مصرفی</span>
        <span className={isHigh ? "text-destructive" : isMedium ? "text-warning" : "text-success"}>
          {used} / {total} GB
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isHigh ? "bg-destructive" : isMedium ? "bg-warning" : "bg-success"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function TrafficCircle({ used, total }: { used: number; total: number }) {
  const percentage = Math.min((used / total) * 100, 100);
  const isHigh = percentage >= 85;
  const isMedium = percentage >= 50 && percentage < 85;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorClass = isHigh ? "text-destructive" : isMedium ? "text-warning" : "text-success";
  const strokeColor = isHigh ? "hsl(var(--destructive))" : isMedium ? "hsl(var(--warning))" : "hsl(var(--success))";

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={strokeColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-bold ${colorClass}`}>{percentage.toFixed(0)}%</span>
        <span className="text-xs text-muted-foreground">مصرف شده</span>
      </div>
    </div>
  );
}

export default function ConfigList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<typeof configs[0] | null>(null);
  const navigate = useNavigate();

  const filteredConfigs = configs.filter(
    (config) =>
      config.configId.includes(searchTerm) ||
      config.displayName.includes(searchTerm) ||
      config.id.toString().includes(searchTerm)
  );

  const openQrDialog = (config: typeof configs[0]) => {
    setSelectedConfig(config);
    setQrDialogOpen(true);
  };

  const openDetailDialog = (config: typeof configs[0]) => {
    setSelectedConfig(config);
    setDetailDialogOpen(true);
  };

  const openDeleteDialog = (config: typeof configs[0]) => {
    setSelectedConfig(config);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (selectedConfig) {
      toast.success(`کانفیگ ${selectedConfig.configId} با موفقیت حذف شد`);
      setDeleteDialogOpen(false);
      setSelectedConfig(null);
    }
  };

  const handleRenew = (configId: number) => {
    navigate(`/renew/${configId}`);
  };

  const getConfigLink = (configId: string) => {
    return `vless://${configId}@example.server.com:443?type=ws&security=tls&path=/ws#Config-${configId}`;
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">لیست کانفیگ ها</h1>
          <p className="text-muted-foreground">لیست کانفیگ های ساخته شده توسط شما</p>
        </div>

        {/* Search & Filter */}
        <Card className="glass-card p-4 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="جستجو با شناسه، نام یا کانفیگ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 bg-secondary/50 border-border/50"
              />
            </div>
            <Button variant="outline" className="gap-2 border-border/50">
              <Filter className="w-4 h-4" />
              فیلتر
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-primary">{configs.length}</p>
            <p className="text-xs text-muted-foreground">کل کانفیگ ها</p>
          </Card>
          <Card className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-success">
              {configs.filter(c => c.status === "active" && c.daysLeft > 5).length}
            </p>
            <p className="text-xs text-muted-foreground">فعال</p>
          </Card>
          <Card className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-warning">
              {configs.filter(c => c.daysLeft <= 5 && c.daysLeft > 0).length}
            </p>
            <p className="text-xs text-muted-foreground">در حال انقضا</p>
          </Card>
          <Card className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-destructive">
              {configs.filter(c => c.status === "expired" || c.daysLeft <= 0).length}
            </p>
            <p className="text-xs text-muted-foreground">منقضی</p>
          </Card>
        </div>

        {/* Config Cards - Mobile */}
        <div className="md:hidden space-y-4">
          {filteredConfigs.map((config, index) => (
            <Card
              key={config.id}
              className="glass-card p-4 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground">#{config.id}</span>
                    <StatusBadge status={config.status} daysLeft={config.daysLeft} />
                  </div>
                  <p className="font-medium">{config.displayName}</p>
                  <div className="flex items-center gap-1 text-sm text-accent font-mono">
                    {config.configId}
                    <CopyButton text={config.configId} />
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold text-foreground">
                    {config.price.toLocaleString('en-US')}
                  </p>
                  <p className="text-xs text-muted-foreground">تومان</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <TrafficBar used={config.traffic.used} total={config.traffic.total} />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">روز باقیمانده:</span>
                  <span className={config.daysLeft <= 5 ? "text-warning" : "text-foreground"}>
                    {config.daysLeft} روز
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">سرور:</span>
                  <span className="text-accent text-xs font-mono">{config.server}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => handleRenew(config.id)}
                >
                  <RefreshCw className="w-4 h-4" />
                  تمدید
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-border/50"
                  onClick={() => openQrDialog(config)}
                >
                  <QrCode className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-border/50"
                  onClick={() => openDetailDialog(config)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-destructive/50 text-destructive hover:bg-destructive/10"
                  onClick={() => openDeleteDialog(config)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Config Table - Desktop */}
        <Card className="hidden md:block glass-card overflow-hidden animate-slide-up">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-secondary/30">
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">شناسه</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">نام نمایشی</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">شناسه کانفیگ</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">قیمت</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">تاریخ انقضا</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">ترافیک</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">روز مانده</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">وضعیت</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">سرور</th>
                  <th className="text-center p-4 text-sm font-medium text-muted-foreground">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {filteredConfigs.map((config, index) => (
                  <tr
                    key={config.id}
                    className="border-b border-border/30 hover:bg-secondary/20 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <td className="p-4 text-sm">{config.id}</td>
                    <td className="p-4 text-sm">{config.displayName}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-mono text-accent">{config.configId}</span>
                        <CopyButton text={config.configId} />
                      </div>
                    </td>
                    <td className="p-4 text-sm text-foreground font-medium">
                      {config.price.toLocaleString('en-US')} تومان
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{config.expireDate}</td>
                    <td className="p-4 min-w-[150px]">
                      <TrafficBar used={config.traffic.used} total={config.traffic.total} />
                    </td>
                    <td className="p-4 text-sm">{config.daysLeft}</td>
                    <td className="p-4">
                      <StatusBadge status={config.status} daysLeft={config.daysLeft} />
                    </td>
                    <td className="p-4 text-xs font-mono text-accent">{config.server}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          size="sm"
                          className="h-8 px-3 gap-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={() => handleRenew(config.id)}
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          تمدید
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => openQrDialog(config)}
                        >
                          <QrCode className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => openDetailDialog(config)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => openDeleteDialog(config)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* QR Code Dialog */}
        <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
          <DialogContent className="glass-card border-border/50">
            <DialogHeader>
              <DialogTitle className="text-center">QR Code کانفیگ</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="w-48 h-48 bg-white rounded-xl p-4 flex items-center justify-center">
                {selectedConfig && (
                  <QRCodeSVG
                    value={getConfigLink(selectedConfig.configId)}
                    size={160}
                    level="M"
                  />
                )}
              </div>
              <p className="text-sm text-muted-foreground font-mono">
                {selectedConfig?.configId}
              </p>
            </div>
          </DialogContent>
        </Dialog>

        {/* Detail Dialog */}
        <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
          <DialogContent className="glass-card border-border/50 max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-center flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                جزئیات کانفیگ
              </DialogTitle>
              <DialogDescription className="text-center">
                اطلاعات کامل و لینک اتصال کانفیگ شما
              </DialogDescription>
            </DialogHeader>
            {selectedConfig && (
              <div className="space-y-6 py-4">
                {/* Traffic Circle */}
                <div className="bg-secondary/30 rounded-2xl p-6">
                  <TrafficCircle used={selectedConfig.traffic.used} total={selectedConfig.traffic.total} />
                  <div className="flex justify-center gap-8 mt-4">
                    <div className="text-center">
                      <p className="text-xl font-bold text-foreground">{selectedConfig.traffic.used} GB</p>
                      <p className="text-xs text-muted-foreground">مصرف شده</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-foreground">{selectedConfig.traffic.total} GB</p>
                      <p className="text-xs text-muted-foreground">کل حجم</p>
                    </div>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <Card className="p-3 bg-secondary/30 border-border/50">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs">روز باقیمانده</span>
                    </div>
                    <p className={`text-lg font-bold ${selectedConfig.daysLeft <= 5 ? "text-warning" : "text-foreground"}`}>
                      {selectedConfig.daysLeft} روز
                    </p>
                  </Card>
                  <Card className="p-3 bg-secondary/30 border-border/50">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Server className="w-4 h-4" />
                      <span className="text-xs">سرور</span>
                    </div>
                    <p className="text-sm font-mono text-accent truncate">{selectedConfig.server}</p>
                  </Card>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-xl border border-border/50">
                  <span className="text-sm text-muted-foreground">وضعیت کانفیگ:</span>
                  <StatusBadge status={selectedConfig.status} daysLeft={selectedConfig.daysLeft} />
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center gap-4 p-4 bg-secondary/30 rounded-xl border border-border/50">
                  <p className="text-sm text-muted-foreground">اسکن QR Code برای اتصال:</p>
                  <div className="bg-white rounded-xl p-3">
                    <QRCodeSVG
                      value={getConfigLink(selectedConfig.configId)}
                      size={120}
                      level="M"
                    />
                  </div>
                </div>

                {/* Config Link */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">لینک کانفیگ:</p>
                  <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-xl border border-border/50">
                    <code className="flex-1 text-xs font-mono text-accent break-all line-clamp-2">
                      {getConfigLink(selectedConfig.configId)}
                    </code>
                    <CopyButtonLarge text={getConfigLink(selectedConfig.configId)} label="لینک کانفیگ" />
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent className="glass-card border-border/50">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-5 h-5" />
                حذف کانفیگ
              </AlertDialogTitle>
              <AlertDialogDescription>
                آیا مطمئن هستید که می‌خواهید کانفیگ <strong className="text-foreground">{selectedConfig?.configId}</strong> را حذف کنید؟
                <br />
                <span className="text-destructive">این عمل قابل بازگشت نیست.</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-2">
              <AlertDialogCancel className="border-border/50">انصراف</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              >
                بله، حذف شود
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
}
