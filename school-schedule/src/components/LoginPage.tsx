import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"

interface LoginPageProps {
  onLogin: () => void
  onBack: () => void
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accessCode, setAccessCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loginMethod, setLoginMethod] = useState<'email' | 'code'>('email')

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      onLogin()
    }, 2000)
  }

  const handleCodeLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate access code validation
    setTimeout(() => {
      setIsLoading(false)
      onLogin()
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <BackgroundBeams />
      
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        className="absolute top-8 left-8 z-50 text-white/80 hover:text-white transition-colors"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </motion.button>

      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-16 h-16 bg-white border border-black rounded-lg flex items-center justify-center mx-auto mb-4"
            >
              <span className="text-black font-bold text-xl">SS</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <TypewriterEffectSmooth words={[
                { text: "Welcome", className: "text-white" },
                { text: "Back", className: "text-white" }
              ]} />
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-white/70 mt-2"
            >
              Sign in to access your schedule
            </motion.p>
          </div>

          {/* Login Method Toggle */}
          <div className="flex bg-white/5 rounded-lg p-1 mb-6">
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                loginMethod === 'email'
                  ? 'bg-white text-black'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Email & Password
            </button>
            <button
              onClick={() => setLoginMethod('code')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                loginMethod === 'code'
                  ? 'bg-white text-black'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Access Code
            </button>
          </div>

          {/* Login Form */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-center">
                {loginMethod === 'email' ? 'Sign In' : 'Access Your Schedule'}
              </CardTitle>
              <CardDescription className="text-white/70 text-center">
                {loginMethod === 'email' 
                  ? 'Use your email and password to sign in'
                  : 'Enter your unique access code to view your schedule'
                }
              </CardDescription>
            </CardHeader>
            
            {loginMethod === 'email' ? (
              <form onSubmit={handleEmailLogin} className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="student@school.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-white/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleCodeLogin} className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="accessCode" className="text-white">Access Code</Label>
                  <Input
                    id="accessCode"
                    type="text"
                    placeholder="Enter your 8-digit access code"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-center text-lg tracking-widest"
                    maxLength={8}
                    required
                  />
                  <p className="text-white/50 text-xs text-center">
                    Your access code was provided when you created your schedule
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-white/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Accessing..." : "Access Schedule"}
                </Button>
              </form>
            )}
          </Card>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-6 text-center"
          >
            <p className="text-white/50 text-sm">
              {loginMethod === 'email' ? (
                <>
                  Demo credentials: <br />
                  Email: demo@schedule.com <br />
                  Password: demo123
                </>
              ) : (
                <>
                  Demo access code: <br />
                  <span className="font-mono text-white/70">ABC12345</span>
                </>
              )}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
