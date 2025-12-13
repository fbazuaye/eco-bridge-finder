import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, Search, Shield, BarChart3, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ecoba-gold">
              <Users className="h-5 w-5 text-background" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              ECOBA Alumni
            </span>
          </div>
          <Link to="/auth">
            <Button variant="default" className="bg-ecoba-gold hover:bg-ecoba-gold/90 text-background">
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Alumni Intelligence
            <span className="block text-ecoba-gold">Platform</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Discover, verify, and connect with alumni across social platforms using advanced AI-powered matching and verification.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to="/auth">
              <Button size="lg" className="w-full bg-ecoba-gold hover:bg-ecoba-gold/90 text-background sm:w-auto">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border/40 bg-muted/30 py-20">
        <div className="container">
          <h2 className="text-center font-display text-3xl font-bold text-foreground">
            Powerful Features
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={Search}
              title="Smart Discovery"
              description="Automatically scan LinkedIn, Facebook, Twitter, and more to find alumni profiles."
            />
            <FeatureCard
              icon={Shield}
              title="AI Verification"
              description="Advanced algorithms verify alumni identity with confidence scoring."
            />
            <FeatureCard
              icon={BarChart3}
              title="Rich Analytics"
              description="Comprehensive dashboards with insights on alumni distribution and engagement."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ECOBA Alumni Intelligence Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 transition-colors hover:border-ecoba-gold/50">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ecoba-gold/10">
        <Icon className="h-6 w-6 text-ecoba-gold" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}
