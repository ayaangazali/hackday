"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ReactNode, useState, FormEvent } from "react"
import { useStackApp } from "@stackframe/stack"

// Reusable animated login choice button component
interface LoginChoiceButtonProps {
  icon: ReactNode
  label: string
  onClick: () => void
  accent?: "google" | "github" | "microsoft" | "spotify"
}

function LoginChoiceButton({ icon, label, onClick, accent = "google" }: LoginChoiceButtonProps) {
  const accentGradients = {
    google: "from-sky-500 to-emerald-400",
    github: "from-gray-700 to-purple-600",
    microsoft: "from-blue-500 to-sky-400",
    spotify: "from-green-500 to-emerald-400",
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="relative w-full text-base flex items-center justify-center gap-3 px-4 py-3 border-2 border-slate-200 rounded-xl overflow-hidden bg-white text-slate-700 font-medium"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${accentGradients[accent]} opacity-0 rounded-xl`}
        initial={{ x: "-100%", opacity: 0 }}
        whileHover={{ x: 0, opacity: 0.1 }}
        transition={{ type: "tween", duration: 0.3 }}
      />
      <motion.div className="relative z-10" whileHover={{ y: -2, rotate: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
        {icon}
      </motion.div>
      <span className="relative z-10">{label}</span>
    </motion.button>
  )
}

export default function SignInClient() {
  const app = useStackApp()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    try {
      await app.signInWithOAuth("google")
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google")
    }
  }

  const handleGitHubSignIn = async () => {
    try {
      await app.signInWithOAuth("github")
    } catch (err: any) {
      setError(err.message || "Failed to sign in with GitHub")
    }
  }

  const handleMicrosoftSignIn = async () => {
    try {
      await app.signInWithOAuth("microsoft")
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Microsoft")
    }
  }

  const handleSpotifySignIn = async () => {
    try {
      await app.signInWithOAuth("spotify")
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Spotify")
    }
  }

  const handleEmailSignIn = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await app.signInWithCredential({ email, password })
      router.push("/pages/dashboard")
    } catch (err: any) {
      setError(err.message || "Failed to sign in")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full max-w-md px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, type: "spring", stiffness: 100 }} className="flex flex-col w-full p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-slate-200">
          <motion.h1 className="text-3xl font-bold text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Sign in</motion.h1>
          <motion.p className="text-sm text-center text-slate-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Don't have an account? <Link className="text-emerald-600 font-medium underline hover:text-emerald-700 transition-colors" href="/sign-up">Sign up</Link></motion.p>

          <motion.div className="grid grid-cols-2 gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
            <LoginChoiceButton icon={<svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>} label="Google" onClick={handleGoogleSignIn} accent="google" />
            <LoginChoiceButton icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>} label="GitHub" onClick={handleGitHubSignIn} accent="github" />
            <LoginChoiceButton icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/></svg>} label="Microsoft" onClick={handleMicrosoftSignIn} accent="microsoft" />
            <LoginChoiceButton icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>} label="Spotify" onClick={handleSpotifySignIn} accent="spotify" />
          </motion.div>

          <motion.div className="relative" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-500 font-medium">Or continue with email</span>
            </div>
          </motion.div>

          <motion.form onSubmit={handleEmailSignIn} className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <motion.div className="space-y-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <Label htmlFor="email" className="text-base text-slate-700 font-medium">Email</Label>
              <Input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required disabled={loading} className="text-base border-2 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 transition-all" />
            </motion.div>
            <motion.div className="space-y-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-base text-slate-700 font-medium">Password</Label>
                <Link className="text-sm text-emerald-600 underline hover:text-emerald-700 transition-colors" href="/forgot-password">Forgot Password?</Link>
              </div>
              <Input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" required disabled={loading} className="text-base border-2 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 transition-all" />
            </motion.div>

            {error && (<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-sm text-rose-600">{error}</motion.div>)}

            <motion.div whileHover={{ scale: loading ? 1 : 1.01, y: loading ? 0 : -2 }} whileTap={{ scale: loading ? 1 : 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
              <Button type="submit" disabled={loading} className="w-full text-base shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">{loading ? "Signing In..." : "Sign in"}</Button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  )
}
