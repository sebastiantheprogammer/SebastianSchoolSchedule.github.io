import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  HeroHighlight
} from "@/components/ui/aceternity-ui"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
import { DirectLogin } from "@/components/DirectLogin"
import { DirectSignup } from "@/components/DirectSignup"
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar"
import { HoverEffect } from "@/components/ui/card-hover-effect"
import ScheduleDemo from "@/components/ScheduleDemo"

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [showDemo, setShowDemo] = useState(false)

  const handleLogin = () => {
    setShowLogin(true)
  }

  const handleSignup = () => {
    setShowSignup(true)
  }

  const handleDemoClick = () => {
    setShowDemo(true)
  }

  const handleDemoBack = () => {
    setShowDemo(false)
  }

  const handleLoginComplete = () => {
    console.log('handleLoginComplete called')
    setShowLogin(false)
    // Here you would typically redirect to the actual app or dashboard
    alert("Welcome to ScheduleSnap! You're now logged in.")
  }

  const handleSignupComplete = () => {
    console.log('handleSignupComplete called')
    setShowSignup(false)
    // Here you would typically redirect to the actual app or dashboard
    alert("Welcome to ScheduleSnap! Your schedule has been created.")
  }

  const handleBackToHome = () => {
    setShowLogin(false)
    setShowSignup(false)
  }

  const navItems = [
    { name: "Features", link: "#features", key: "features" },
    { name: "How It Works", link: "#how-it-works", key: "how-it-works" },
    { name: "Demo", link: "demo", key: "demo" },
  ]

  // Show demo if active
  if (showDemo) {
    return (
      <ScheduleDemo 
        onBack={handleDemoBack}
        onComplete={handleLoginComplete}
      />
    )
  }

  // Show login if active
  if (showLogin) {
    return (
      <DirectLogin 
        onLogin={handleLoginComplete}
        onBack={handleBackToHome}
        onSignup={handleSignup}
      />
    )
  }

  // Show signup if active
  if (showSignup) {
    return (
      <DirectSignup 
        onComplete={handleSignupComplete}
        onBack={handleBackToHome}
      />
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <BackgroundBeams />
      
      {/* Navigation */}
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} onDemoClick={handleDemoClick} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary" onClick={handleLogin}>Login</NavbarButton>
            <NavbarButton variant="primary" onClick={handleSignup}>Get Started</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item) => (
              item.link === "demo" ? (
                <button
                  key={item.key}
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    handleDemoClick()
                  }}
                  className="relative text-white hover:text-white/80 transition-colors cursor-pointer"
                >
                  <span className="block">{item.name}</span>
                </button>
              ) : (
                <a
                  key={item.key}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-white hover:text-white/80 transition-colors"
                >
                  <span className="block">{item.name}</span>
                </a>
              )
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  handleLogin()
                }}
                variant="secondary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  handleSignup()
                }}
                variant="primary"
                className="w-full"
              >
                Get Started
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Hero Section */}
      <HeroHighlight className="pt-16 sm:pt-20 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-4 sm:mb-6 border-white/20 text-white/80 text-sm sm:text-base">
              🚫 No Phones? No Problem!
            </Badge>
          </motion.div>
          
          <motion.div
            className="mb-4 sm:mb-6 px-2 sm:px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              <TypewriterEffectSmooth words={[
                { text: "Turn", className: "text-white" },
                { text: "Your", className: "text-white" },
                { text: "Schedule", className: "text-white" },
                { text: "Into", className: "text-white" },
                { text: "a", className: "text-white" },
                { text: "Beautiful", className: "text-white" },
                { text: "App", className: "text-white" }
              ]} />
            </div>
          </motion.div>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2 sm:px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            NYC students, we've got you covered! With the new phone ban in schools, 
            access your schedule instantly on any Chromebook. Upload your schedule 
            and get a personalized, always-accessible schedule app in seconds.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-2 sm:px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-white text-black hover:bg-white/90" 
              onClick={handleSignup}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto border-white text-white bg-transparent hover:bg-white hover:text-black"
              onClick={handleDemoClick}
            >
              View Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-2 sm:px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-center py-2">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">500+</div>
              <div className="text-white/60 text-xs sm:text-sm md:text-base">NYC Students Helped</div>
            </div>
            <div className="text-center py-2">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">30s</div>
              <div className="text-white/60 text-xs sm:text-sm md:text-base">Average Setup Time</div>
            </div>
            <div className="text-center py-2">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">100%</div>
              <div className="text-white/60 text-xs sm:text-sm md:text-base">Chromebook Compatible</div>
            </div>
          </motion.div>
        </div>
      </HeroHighlight>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white px-4">Perfect for NYC Students</h2>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto px-4">
              Designed specifically for the challenges NYC students face with the new phone policies
            </p>
          </motion.div>

          <HoverEffect items={[
            {
              title: "📱 No Phone Needed",
              description: "Access your schedule on any Chromebook or school computer. No need to sneak your phone out during class.",
              link: "#"
            },
            {
              title: "⚡ Instant Setup",
              description: "Upload a photo of your schedule and get a beautiful, personalized app in under 30 seconds.",
              link: "#"
            },
            {
              title: "🎯 Always Updated",
              description: "Real-time updates show your current class, next class, and remaining time in each period.",
              link: "#"
            },
            {
              title: "🌍 Multi-Timezone",
              description: "Perfect for students with different schedules or those who travel between time zones.",
              link: "#"
            },
            {
              title: "📚 All Schools Supported",
              description: "Works with any NYC school schedule format. From block schedules to traditional periods.",
              link: "#"
            },
            {
              title: "🔒 Privacy First",
              description: "Your schedule data stays private. No accounts required, no data collection, just your schedule when you need it.",
              link: "#"
            }
          ]} />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white px-4">How It Works</h2>
            <p className="text-lg sm:text-xl text-white/70 px-4">
              Three simple steps to get your schedule app
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Upload Photo",
                description: "Take a photo of your schedule or upload an existing screenshot. Our AI will automatically read and parse your schedule."
              },
              {
                step: "2",
                title: "Review & Edit",
                description: "Check that all your classes, times, and rooms are correct. Make any adjustments needed for your specific schedule."
              },
              {
                step: "3",
                title: "Access Anywhere",
                description: "Get a shareable link to your schedule app. Access it on any Chromebook, computer, or device with internet access."
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{step.title}</h3>
                <p className="text-white/70">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section id="get-started" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white/5 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white px-4">
              Ready to Never Miss a Class Again?
            </h2>
            <p className="text-lg sm:text-xl mb-8 text-white/70 px-4">
              Join hundreds of NYC students who've already made the switch to ScheduleSnap
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Button size="lg" className="bg-white text-black hover:bg-white/90" onClick={handleSignup}>
                Create Your Schedule App
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white bg-transparent hover:bg-white hover:text-blue-600"
                onClick={handleDemoClick}
              >
                View Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SS</span>
                </div>
                <span className="text-xl font-bold text-white">ScheduleSnap</span>
      </div>
              <p className="text-white/60">
                Making school schedules accessible for every NYC student.
        </p>
      </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-white">Product</h3>
              <ul className="space-y-2 text-white/60">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="https://github.com/sebastiantheprogammer/schoolscheduleapp" target="_blank" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-white">Support</h3>
              <ul className="space-y-2 text-white/60">
                <li><a href="https://github.com/sebastiantheprogammer/schoolscheduleapp/issues" target="_blank" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="mailto:support@schedulesnap.com" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="https://github.com/sebastiantheprogammer/schoolscheduleapp/discussions" target="_blank" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-2 text-white/60">
                <li><a href="https://github.com/sebastiantheprogammer/schoolscheduleapp/blob/main/PRIVACY.md" target="_blank" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="https://github.com/sebastiantheprogammer/schoolscheduleapp/blob/main/TERMS.md" target="_blank" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="https://github.com/sebastiantheprogammer/schoolscheduleapp" target="_blank" className="hover:text-white transition-colors">Open Source</a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8 bg-white/10" />
          
          <div className="text-center text-white/60">
            <p>&copy; 2024 ScheduleSnap. Made with ❤️ for NYC students.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
