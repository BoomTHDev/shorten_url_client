import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Globe,
  Link2,
  Lock,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function LandingPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="border-border/40 bg-background/95 supports-backdrop-filter:bg-background/60 border-b backdrop-blur">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <Link2 size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">LinkShort</span>
          </div>
          <nav className="flex items-center gap-2">
            <Link href="/auth/signin">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-36">
        <div className="mx-auto max-w-4xl space-y-10 text-center">
          <div className="space-y-6">
            <div className="border-border text-muted-foreground mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
              <Zap size={16} />
              <span>Trusted by thousands of developers worldwide</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-6xl lg:text-7xl">
              Shorten Link,{" "}
              <span className="text-primary block">Track Performance</span>
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed text-balance">
              The modern URL shortener built for developers and teams. Create,
              manage, and analyze your links with powerful, real-time analytics.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/auth/signup">
              <Button size="lg" className="gap-2 px-8">
                Start for free
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button size="lg" variant="outline" className="px-8">
                View Live Demo
              </Button>
            </Link>
          </div>
          <div className="text-muted-foreground pt-8 text-sm">
            No credit card required • Free forever plan • Set up in minutes
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-border/40 bg-muted/30 border-y">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div className="space-y-2">
              <div className="text-2xl font-bold md:text-3xl">10M+</div>
              <div className="text-muted-foreground text-sm">
                Links Shortened
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold md:text-3xl">99.9%</div>
              <div className="text-muted-foreground text-sm">Uptime</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold md:text-3xl">50K+</div>
              <div className="text-muted-foreground text-sm">Active Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold md:text-3xl">500ms</div>
              <div className="text-muted-foreground text-sm">
                Avg. Redirect Time
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
              Built for developers who care about performance
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Everything you need to create, manage, and analyze your links at
              scale.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Link2 size={24} />}
              title="Custom Short Links"
              description="Create branded short links with custom aliases. Make your URLs memorable and trustworthy."
            />
            <FeatureCard
              icon={<BarChart3 size={24} />}
              title="Real-time Analytics"
              description="Track clicks, locations, devices, and referrers with detailed, real-time insights."
            />
            <FeatureCard
              icon={<Zap size={24} />}
              title="Lightning Fast"
              description="Built for speed with global CDN. Your links redirect in milliseconds with 99.9% uptime."
            />
            <FeatureCard
              icon={<Lock size={24} />}
              title="Enterprise Security"
              description="End-to-end encryption and secure data handling. GDPR and CCPA compliant."
            />
            <FeatureCard
              icon={<Users size={24} />}
              title="Team Collaboration"
              description="Share link collections, manage permissions, and collaborate seamlessly with your team."
            />
            <FeatureCard
              icon={<Globe size={24} />}
              title="Global Performance"
              description="Multiple data centers worldwide ensure fast redirects for your global audience."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="bg-card border-border mx-auto max-w-4xl space-y-8 rounded-xl border p-12 text-center shadow-sm">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
              Ready to optimize your links?
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Join 50,000+ developers and marketers who trust LinkShort for
              their link management.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/auth/signup">
              <Button size="lg" className="gap-2 px-8">
                Create your account
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="px-8">
                Read Documentation
              </Button>
            </Link>
          </div>
          <div>Get started in 2 minutes • No credit card required</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-border/40 bg-muted/20 border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
                <Link2 size={20} />
              </div>
              <span className="font-bold tracking-tight">LinkShort</span>
            </div>
            <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link
                href="/docs"
                className="hover:text-foreground transition-colors"
              >
                Documentation
              </Link>
              <Link
                href="/pricing"
                className="hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-foreground transition-colors"
              >
                Terms
              </Link>
            </div>
            <p className="text-muted-foreground text-center text-sm md:text-right">
              @ 2026 LinkShort. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group border-border bg-card hover:border-accent rounded-xl border p-8 transition-all duration-300 hover:shadow-sm">
      <div className="bg-primary/10 text-primary mb-6 flex size-12 items-center justify-center rounded-lg transition-transform group-hover:scale-105">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
