"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Music } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const router = useRouter()

  const redirectUrl = "https://maynsta.com/home"

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push("/home")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ein Fehler ist aufgetreten")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: redirectUrl },
      })
      if (error) throw error
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ein Fehler ist aufgetreten")
      setIsLoading(false)
    }
  }

  const handleMicrosoftLogin = async () => {
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "azure",
        options: {
          redirectTo: redirectUrl,
          scopes: "email",
        },
      })
      if (error) throw error
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ein Fehler ist aufgetreten")
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      setError("Bitte gib deine E-Mail-Adresse ein.")
      return
    }

    const supabase = createClient()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://maynsta.com/auth/reset-password",
      })
      if (error) throw error
      setSuccess("Wir haben dir eine E-Mail mit einem Link zum Zurücksetzen deines Passworts gesendet.")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ein Fehler ist aufgetreten")
    } finally {
      setIsLoading(false)
    }
  }

  const resetState = () => {
    setError(null)
    setSuccess(null)
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
              <Music className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Maynsta</span>
          </div>
          <Card className="border-border bg-card rounded-3xl">
            <CardHeader>
              <CardTitle className="text-2xl text-card-foreground">
                {isForgotPassword ? "Passwort vergessen" : "Anmelden"}
              </CardTitle>
              <CardDescription>
                {isForgotPassword
                  ? "Gib deine E-Mail-Adresse ein, um dein Passwort zurückzusetzen"
                  : "Gib deine E-Mail ein, um dich anzumelden"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isForgotPassword ? (
                <form onSubmit={handleForgotPassword}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">E-Mail</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@beispiel.de"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-background rounded-full"
                      />
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    {success && <p className="text-sm text-green-600">{success}</p>}
                    <Button type="submit" className="w-full rounded-full" disabled={isLoading}>
                      {isLoading ? "Senden..." : "Link senden"}
                    </Button>
                  </div>
                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(false)
                        resetState()
                      }}
                      className="text-primary underline underline-offset-4"
                    >
                      Zurück zur Anmeldung
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleLogin}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">E-Mail</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@beispiel.de"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-background rounded-full"
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Passwort</Label>
                        <button
                          type="button"
                          onClick={() => {
                            setIsForgotPassword(true)
                            resetState()
                          }}
                          className="text-sm text-primary underline underline-offset-4"
                        >
                          Passwort vergessen?
                        </button>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-background rounded-full"
                      />
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    <Button type="submit" className="w-full rounded-full" disabled={isLoading}>
                      {isLoading ? "Anmeldung läuft..." : "Anmelden"}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">oder weiter mit</span>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full rounded-full bg-transparent"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                      >
                        Mit Google anmelden
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full rounded-full bg-transparent"
                        onClick={handleMicrosoftLogin}
                        disabled={isLoading}
                      >
                        Mit Microsoft anmelden
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    Noch kein Konto?{" "}
                    <Link href="/auth/sign-up" className="text-primary underline underline-offset-4">
                      Registrieren
                    </Link>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
