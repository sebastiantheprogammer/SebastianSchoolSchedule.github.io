import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
import { LoginPage } from './LoginPage'

interface OnboardingFlowProps {
  onComplete: () => void
  onBack: () => void
}

export function OnboardingFlow({ onComplete, onBack }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Move to login
      setCurrentStep(-1) // -1 indicates login step
    }
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
                onClick={handleNext}
                className="bg-white text-black hover:bg-white/90"
              >
                {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
