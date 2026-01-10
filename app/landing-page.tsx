import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Music } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Fullscreen Background Animation */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="flex w-full h-full">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-full animated-stripe stripe-${i + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Header with Buttons */}
      <header className="absolute top-0 right-0 p-8 flex gap-4 z-20">
        <Link href="/auth/login">
          <Button variant="ghost" className="rounded-full px-8">Login</Button>
        </Link>
        <Link href="/auth/sign-up">
          <Button className="rounded-full px-8">Register</Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="text-center z-10 px-4 relative">
        <div className="relative z-10">
          <div className="flex justify-center mb-8">
            <div className="h-24 w-24 bg-primary rounded-full flex items-center justify-center shadow-2xl">
              <Music className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-4 text-foreground relative z-10">
            Maynsta
          </h1>
          <p className="text-xl md:text-2xl font-medium text-muted-foreground max-w-lg mx-auto leading-tight relative z-10">
            The best Music streaming and publishing App.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-8 text-sm text-muted-foreground opacity-50 z-20">
        &copy; 2026 Maynsta Inc.
      </footer>

      {/* Tailwind CSS Animations */}
      <style jsx>{`
        .animated-stripe {
          height: 100%;
          background: linear-gradient(120deg, rgba(255,0,150,0.2), rgba(0,200,255,0.2));
          animation: stripeMove 15s linear infinite;
        }

        @keyframes stripeMove {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
      `}</style>
    </div>
  )
}

