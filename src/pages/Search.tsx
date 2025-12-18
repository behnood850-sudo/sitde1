import { useState } from "react";
import { Search as SearchIcon, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/Layout";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold gradient-text mb-2">جستجوی کانفیگ</h1>
          <p className="text-muted-foreground">با شناسه یا نام کانفیگ جستجو کنید</p>
        </div>

        {/* Search Box */}
        <Card className="glass-card glow-border p-6 animate-slide-up">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="شناسه کانفیگ، نام نمایشی یا سرور..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-12 h-14 text-lg bg-secondary/50 border-border/50"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <Button className="h-14 px-6 bg-primary hover:bg-primary/90 text-primary-foreground">
              <SearchIcon className="w-5 h-5" />
            </Button>
          </div>
        </Card>

        {/* No Results */}
        <Card className="glass-card p-12 text-center animate-slide-up">
          <SearchIcon className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            جستجو کنید
          </h3>
          <p className="text-sm text-muted-foreground/70">
            برای پیدا کردن کانفیگ، شناسه یا نام آن را وارد کنید
          </p>
        </Card>
      </div>
    </Layout>
  );
}
