import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
import { ArrowLeft, User, Mail, Lock, Key } from 'lucide-react'

interface DirectLoginProps {
  onLogin: () => void
  onBack: () => void
  onSignup: () => void
}

export function DirectLogin({ onLogin, onBack, onSignup }: DirectLoginProps) {
  const [loginMethod, setLoginMethod] = useState<'code' | 'email'>('code')
  const [accessCode, setAccessCode] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleCodeLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Code login submitted with code:', accessCode)
    setIsLoading(true)
    
    // Simulate access code validation
    setTimeout(() => {
      setIsLoading(false)
      onLogin()
    }, 1500)
  }

  const handleCodeLoginClick = () => {
    console.log('Code login button clicked directly')
    console.log('Access code:', accessCode)
    setIsLoading(true)
    
    // Simulate access code validation
    setTimeout(() => {
      setIsLoading(false)
      console.log('Calling onLogin()')
      onLogin()
    }, 1500)
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Email login submitted with:', email, password)
    setIsLoading(true)
    
    // Simulate email login
    setTimeout(() => {
      setIsLoading(false)
      onLogin()
    }, 2000)
  }

  const handleEmailLoginClick = () => {
    console.log('Email login button clicked directly')
    console.log('Email:', email, 'Password:', password)
    setIsLoading(true)
    
    // Simulate email login
    setTimeout(() => {
      setIsLoading(false)
      console.log('Calling onLogin()')
      onLogin()
    }, 2000)
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
        <ArrowLeft className="w-6 h-6" />
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
              Access your schedule instantly
            </motion.p>
          </div>

          {/* Login Method Toggle */}
          <div className="flex bg-white/5 rounded-lg p-1 mb-6">
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
          </div>

          {/* Login Form */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-center">
                {loginMethod === 'code' ? 'Enter Access Code' : 'Sign In'}
              </CardTitle>
              <CardDescription className="text-white/70 text-center">
                {loginMethod === 'code' 
                  ? 'Enter your unique access code to view your schedule'
                  : 'Use your email and password to sign in'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-6">
              {loginMethod === 'code' ? (
                <form onSubmit={handleCodeLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="accessCode" className="text-white">Access Code</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                      <Input
                        id="accessCode"
                        type="text"
                        placeholder="Enter your 8-digit access code"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10 text-center text-lg tracking-widest"
                        maxLength={8}
                        required
                      />
                    </div>
                    <p className="text-white/50 text-xs text-center">
                      Your access code was provided when you created your schedule
                    </p>
                  </div>

                  <Button
                    type="submit"
                    onClick={handleCodeLoginClick}
                    className="w-full bg-white text-black hover:bg-white/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Accessing..." : "Access Schedule"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="student@school.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    onClick={handleEmailLoginClick}
                    className="w-full bg-white text-black hover:bg-white/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-6 text-center"
          >
            <p className="text-white/50 text-sm">
              {loginMethod === 'code' ? (
                <>
                  Demo access code: <br />
                  <span className="font-mono text-white/70">ABC12345</span>
                </>
              ) : (
                <>
                  Demo credentials: <br />
                  Email: demo@schedule.com <br />
                  Password: demo123
                </>
              )}
            </p>
          </motion.div>

          {/* Sign Up Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="mt-6 text-center"
          >
            <p className="text-white/60 text-sm">
              Don't have an account?{' '}
              <button
                onClick={onSignup}
                className="text-white hover:text-white/80 underline transition-colors"
              >
                Create your schedule
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
