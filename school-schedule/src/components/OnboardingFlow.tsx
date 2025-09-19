import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
import { LoginPage } from './LoginPage'
import ScheduleDemo from './ScheduleDemo'
import { ImageUpload } from './ImageUpload'
import { Copy, CheckCircle, User, Mail, Lock } from 'lucide-react'

interface OnboardingFlowProps {
  onComplete: () => void
  onBack: () => void
}

export function OnboardingFlow({ onComplete, onBack }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [, setIsLoggedIn] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [accessCode, setAccessCode] = useState('')
  const [codeCopied, setCodeCopied] = useState(false)

  const steps = [
    {
      title: "Welcome to ScheduleSnap",
      description: "The perfect solution for NYC students dealing with phone bans in schools.",
      content: (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-white border border-black rounded-lg flex items-center justify-center mx-auto">
            <span className="text-black font-bold text-2xl">SS</span>
          </div>
          <p className="text-white/70 text-lg">
            Upload your schedule photo and get a beautiful, always-accessible schedule app in seconds.
          </p>
        </div>
      )
    },
    {
      title: "Create Your Account",
      description: "Let's set up your account to get started.",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={userInfo.name}
                onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
              <Input
                id="email"
                type="email"
                placeholder="student@school.edu"
                value={userInfo.email}
                onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
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
                placeholder="Create a secure password"
                value={userInfo.password}
                onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
                required
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Upload Your Schedule",
      description: "Take a photo of your schedule or upload an existing image.",
      content: (
        <ImageUpload
          onImageUpload={setUploadedImage}
          onRemove={() => setUploadedImage(null)}
          uploadedImage={uploadedImage}
          isProcessing={isProcessing}
        />
      )
    },
    {
      title: "Processing Your Schedule",
      description: "Our AI is analyzing your schedule image...",
      content: (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto">
            <div className="animate-spin w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full"></div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Processing Your Schedule</h3>
            <p className="text-white/70 text-sm">
              Our AI is extracting class information, times, and room numbers from your image.
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/70">Image Analysis</span>
                <span className="text-green-400">✓ Complete</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/70">Text Extraction</span>
                <span className="text-green-400">✓ Complete</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/70">Schedule Parsing</span>
                <span className="text-blue-400">⏳ Processing...</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Your Schedule is Ready!",
      description: "Here's your unique access code to view your schedule.",
      content: (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-2">Schedule Created Successfully!</h3>
            <p className="text-white/70 text-sm">
              Your schedule has been processed and is ready to use.
            </p>
          </div>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-center">Your Access Code</CardTitle>
              <CardDescription className="text-white/70 text-center">
                Save this code to access your schedule anytime
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-black/50 border border-white/20 rounded-lg p-4 mb-4">
                <div className="text-2xl font-mono font-bold text-white tracking-widest">
                  {accessCode || 'ABC12345'}
                </div>
              </div>
              
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(accessCode || 'ABC12345')
                  setCodeCopied(true)
                  setTimeout(() => setCodeCopied(false), 2000)
                }}
                variant="outline"
                className="border-white/20 text-white bg-transparent hover:bg-white/10"
              >
                {codeCopied ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">📱 How to access your schedule:</h4>
            <ul className="text-white/70 text-sm space-y-1 text-left">
              <li>• Visit ScheduleSnap.com</li>
              <li>• Click "Login" and select "Access Code"</li>
              <li>• Enter your code: <span className="font-mono text-white">{accessCode || 'ABC12345'}</span></li>
              <li>• Your schedule will be instantly available!</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "How It Works",
      description: "Three simple steps to get your personalized schedule app.",
      content: (
        <div className="space-y-6">
          {[
            { step: "1", title: "Upload Photo", desc: "Take a photo of your schedule or upload an existing screenshot." },
            { step: "2", title: "AI Processing", desc: "Our AI automatically reads and parses your schedule data." },
            { step: "3", title: "Access Anywhere", desc: "Get a shareable link to access your schedule on any device." }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center space-x-4"
            >
              <div className="w-8 h-8 bg-white/10 border border-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">{item.step}</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">{item.title}</h3>
                <p className="text-white/70 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      title: "Perfect for NYC Students",
      description: "Designed specifically for the challenges you face with phone policies.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: "📱", title: "No Phone Needed", desc: "Access on any Chromebook" },
            { icon: "⚡", title: "Instant Setup", desc: "Ready in under 30 seconds" },
            { icon: "🔒", title: "Privacy First", desc: "No accounts required" },
            { icon: "🌍", title: "Multi-Timezone", desc: "Works anywhere" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-lg p-4"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <h3 className="text-white font-semibold text-sm">{feature.title}</h3>
                  <p className="text-white/70 text-xs">{feature.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      title: "See It In Action",
      description: "Preview how your schedule will look with real-time updates.",
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center mx-auto">
            <span className="text-4xl">📅</span>
          </div>
          <p className="text-white/70 text-lg">
            Experience a live demo of your personalized schedule with current time tracking and class highlighting.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">Demo Features:</h4>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Real-time clock and current class highlighting</li>
              <li>• Full schedule with teacher and room information</li>
              <li>• Next class notifications</li>
              <li>• Mobile-responsive design</li>
            </ul>
          </div>
        </div>
      )
    }
  ]

  const handleViewDemo = () => {
    setShowDemo(true)
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      onBack()
    }
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    // After successful login, complete onboarding
    setTimeout(() => {
      onComplete()
    }, 1000)
  }

  const generateAccessCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const handleNext = () => {
    if (currentStep === 2 && uploadedImage) {
      // Start processing when moving from image upload
      setIsProcessing(true)
      setAccessCode(generateAccessCode())
      setTimeout(() => {
        setIsProcessing(false)
        setCurrentStep(currentStep + 1)
      }, 3000)
    } else if (currentStep === 3) {
      // Move to final step after processing
      setCurrentStep(currentStep + 1)
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return true
      case 1:
        return userInfo.name && userInfo.email && userInfo.password
      case 2:
        return uploadedImage !== null
      case 3:
        return !isProcessing
      case 4:
        return true
      default:
        return true
    }
  }

  const handleDemoBack = () => {
    setShowDemo(false)
  }

  const handleDemoComplete = () => {
    setShowDemo(false)
    setCurrentStep(-1) // Move to login
  }

  if (showDemo) {
    return <ScheduleDemo onBack={handleDemoBack} onComplete={handleDemoComplete} />
  }

  if (currentStep === -1) {
    return <LoginPage onLogin={handleLogin} onBack={() => setCurrentStep(steps.length - 1)} />
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <BackgroundBeams />
      
      {/* Back Button */}
      <motion.button
        onClick={handlePrev}
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
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <TypewriterEffectSmooth words={[
                  { text: steps[currentStep].title, className: "text-white" }
                ]} />
              </motion.div>
              <CardDescription className="text-white/70 text-lg mt-4">
                {steps[currentStep].description}
              </CardDescription>
            </CardHeader>
            
            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {steps[currentStep].content}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center space-x-2 mb-6">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between px-6 pb-6">
              <Button
                variant="outline"
                onClick={handlePrev}
                className="border-white/20 text-white hover:bg-white/10"
              >
                {currentStep === 0 ? 'Back to Home' : 'Previous'}
              </Button>
              
              <Button
                onClick={currentStep === steps.length - 1 ? handleViewDemo : handleNext}
                className="bg-white text-black hover:bg-white/90"
                disabled={!canProceed()}
              >
                {currentStep === steps.length - 1 ? 'View Demo' : 
                 currentStep === 2 ? 'Process Schedule' :
                 currentStep === 3 ? 'Continue' : 'Next'}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
