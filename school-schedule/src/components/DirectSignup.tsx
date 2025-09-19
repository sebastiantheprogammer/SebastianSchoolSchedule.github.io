import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
import { ImageUpload } from './ImageUpload'
import { ArrowLeft, User, Mail, Lock, CheckCircle, Copy } from 'lucide-react'

interface DirectSignupProps {
  onComplete: () => void
  onBack: () => void
}

export function DirectSignup({ onComplete, onBack }: DirectSignupProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [accessCode, setAccessCode] = useState('')
  const [codeCopied, setCodeCopied] = useState(false)

  const generateAccessCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const handleNext = () => {
    console.log('handleNext called, currentStep:', currentStep)
    console.log('canProceed():', canProceed())
    console.log('userInfo:', userInfo)
    
    if (currentStep === 0) {
      // Move to image upload
      console.log('Moving to step 1')
      setCurrentStep(1)
    } else if (currentStep === 1) {
      // Start processing
      console.log('Starting processing')
      setIsProcessing(true)
      setAccessCode(generateAccessCode())
      setTimeout(() => {
        setIsProcessing(false)
        setCurrentStep(2)
      }, 3000)
    } else if (currentStep === 2) {
      // Complete the process
      console.log('Completing process')
      handleComplete()
    }
  }

  const handleComplete = () => {
    onComplete()
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return userInfo.name.trim() !== '' && userInfo.email.trim() !== '' && userInfo.password.trim() !== ''
      case 1:
        return true // Allow proceeding even without image for testing
      case 2:
        return true
      default:
        return true
    }
  }

  const steps = [
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
                  {accessCode}
                </div>
              </div>
              
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(accessCode)
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
              <li>• Enter your code: <span className="font-mono text-white">{accessCode}</span></li>
              <li>• Your schedule will be instantly available!</li>
            </ul>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <BackgroundBeams />
      
      {/* Back Button */}
      <motion.button
        onClick={currentStep === 0 ? onBack : () => setCurrentStep(currentStep - 1)}
        className="absolute top-8 left-8 z-50 text-white/80 hover:text-white transition-colors"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ArrowLeft className="w-6 h-6" />
      </motion.button>

      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-2xl">
                {steps[currentStep].title}
              </CardTitle>
              <CardDescription className="text-white/70">
                {steps[currentStep].description}
              </CardDescription>
              <div className="text-white/50 text-sm mt-2">
                Step {currentStep + 1} of {steps.length}
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {steps[currentStep].content}
              </motion.div>
            </CardContent>

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
                onClick={currentStep === 0 ? onBack : () => setCurrentStep(currentStep - 1)}
                className="border-white/20 text-white hover:bg-white/10"
              >
                {currentStep === 0 ? 'Back to Home' : 'Previous'}
              </Button>
              
              <Button
                onClick={() => {
                  console.log('Button clicked!')
                  handleNext()
                }}
                className="bg-white text-black hover:bg-white/90"
                disabled={!canProceed()}
              >
                {currentStep === steps.length - 1 ? 'Complete' : 
                 currentStep === 1 ? 'Process Schedule' : 'Next'}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
