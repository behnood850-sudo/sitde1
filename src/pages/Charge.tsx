import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CreditCard, Wallet, Copy, Check,
  ChevronLeft, ArrowUpRight, AlertCircle,
  Receipt
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";

const walletBalance = 909189;
const cardNumber = "6037-9974-1234-5678";
const cardHolder = "محمد احمدی";

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text.replace(/-/g, ''));
    setCopied(true);
    toast.success(`${label} کپی شد!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="gap-2 hover:bg-primary/20 hover:text-primary"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-success" />
          کپی شد
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          کپی
        </>
      )}
    </Button>
  );
}

export default function Charge() {
  const [amount, setAmount] = useState("");
  const [trackingCode, setTrackingCode] = useState("");

  const handleSubmit = () => {
    if (!amount || parseInt(amount) < 10000) {
      toast.error("حداقل مبلغ شارژ 10,000 تومان است");
      return;
    }
    if (!trackingCode) {
      toast.error("لطفا کد پیگیری را وارد کنید");
      return;
    }
    toast.success("درخواست شارژ با موفقیت ثبت شد!");
  };

  const quickAmounts = [50000, 100000, 200000, 500000];

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">شارژ کیف پول</h1>
          <p className="text-muted-foreground">کیف پول خود را شارژ کنید</p>
        </div>

        {/* Balance Card */}
        <Card className="glass-card glow-border p-6 animate-slide-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-primary/20">
                <Wallet className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">موجودی فعلی</p>
                <p className="text-3xl font-bold text-foreground">
                  {walletBalance.toLocaleString('en-US')}
                  <span className="text-sm text-muted-foreground mr-2">تومان</span>
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Card */}
        <Card className="glass-card glow-border overflow-hidden animate-slide-up">
          <div className="p-6 bg-gradient-to-r from-primary/20 to-accent/20 border-b border-border/50">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">اطلاعات کارت بانکی</h3>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border/50">
              <div>
                <p className="text-xs text-muted-foreground mb-1">شماره کارت</p>
                <p className="font-mono text-lg tracking-wider text-foreground">{cardNumber}</p>
              </div>
              <CopyButton text={cardNumber} label="شماره کارت" />
            </div>
            
            <div className="p-4 bg-secondary/30 rounded-xl border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">به نام</p>
              <p className="font-semibold text-foreground">{cardHolder}</p>
            </div>

            <div className="flex items-start gap-2 p-4 bg-warning/10 rounded-xl border border-warning/30">
              <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
              <div className="text-sm text-warning">
                <p className="font-semibold mb-1">توجه مهم:</p>
                <p className="text-warning/80">
                  لطفا پس از واریز، کد پیگیری تراکنش را در فرم زیر وارد کنید.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Charge Form */}
        <Card className="glass-card glow-border p-6 animate-slide-up">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" />
            ثبت واریز
          </h3>
          
          <div className="space-y-5">
            <div className="space-y-2">
              <Label className="text-muted-foreground">مبلغ واریزی (تومان)</Label>
              <Input
                type="number"
                placeholder="مثال: 100000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-secondary/50 border-border/50 h-12 text-lg"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {quickAmounts.map((qAmount) => (
                  <Button
                    key={qAmount}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(qAmount.toString())}
                    className="border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/50"
                  >
                    {qAmount.toLocaleString('en-US')}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">کد پیگیری تراکنش</Label>
              <Input
                placeholder="کد پیگیری را وارد کنید..."
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="bg-secondary/50 border-border/50 h-12"
              />
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-lg font-medium"
            >
              <ArrowUpRight className="w-5 h-5" />
              ثبت درخواست شارژ
            </Button>
          </div>
        </Card>

        {/* Transactions Link */}
        <Link to="/transactions">
          <Card className="glass-card p-4 transition-all duration-300 group cursor-pointer hover:border-primary/50 hover:bg-primary/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-background/50">
                  <Receipt className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium">تاریخچه تراکنش ها</span>
              </div>
              <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" />
            </div>
          </Card>
        </Link>
      </div>
    </Layout>
  );
}
