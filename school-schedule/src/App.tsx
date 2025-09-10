import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  BackgroundGrid, 
  HeroHighlight, 
  Highlight,
  TextRevealCard 
} from "@/components/ui/aceternity-ui"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
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

function App() {
  const [isUploading, setIsUploading] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleUpload = () => {
    setIsUploading(true)
    // Simulate upload process
    setTimeout(() => setIsUploading(false), 2000)
  }

  const navItems = [
    { name: "Features", link: "#features" },
    { name: "How It Works", link: "#how-it-works" },
    { name: "Demo", link: "#demo" },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <BackgroundBeams />
      
      {/* Navigation */}
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary">Login</NavbarButton>
            <NavbarButton variant="primary">Get Started</NavbarButton>
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
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-300 hover:text-white transition-colors"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
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
      <HeroHighlight className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-6 border-white/20 text-white/80">
              🚫 No Phones? No Problem!
            </Badge>
          </motion.div>
          
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TypewriterEffectSmooth words={[
              { text: "Turn", className: "text-white" },
              { text: "Your", className: "text-white" },
              { text: "Schedule", className: "text-white" },
              { text: "Into", className: "text-white" },
              { text: "a", className: "text-white" },
              { text: "Beautiful", className: "text-white" },
              { text: "App", className: "text-white" }
            ]} />
          </motion.div>
          
          <motion.p 
            className="text-xl text-white/70 max-w-3xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            NYC students, we've got you covered! With the new phone ban in schools, 
            access your schedule instantly on any Chromebook. Upload your schedule 
            and get a personalized, always-accessible schedule app in seconds.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-white text-black hover:bg-white/90" 
              onClick={handleUpload}
            >
              {isUploading ? "Creating Your App..." : "Upload Schedule Photo"}
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white bg-transparent hover:bg-white hover:text-black">
              View Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-white/60">NYC Students Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">30s</div>
              <div className="text-white/60">Average Setup Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-white/60">Chromebook Compatible</div>
            </div>
          </motion.div>
        </div>
      </HeroHighlight>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Perfect for NYC Students</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Designed specifically for the challenges NYC students face with the new phone policies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "📱",
                title: "No Phone Needed",
                description: "Access your schedule on any Chromebook or school computer. No need to sneak your phone out during class."
              },
              {
                icon: "⚡",
                title: "Instant Setup",
                description: "Upload a photo of your schedule and get a beautiful, personalized app in under 30 seconds."
              },
              {
                icon: "🎯",
                title: "Always Updated",
                description: "Real-time updates show your current class, next class, and remaining time in each period."
              },
              {
                icon: "🌍",
                title: "Multi-Timezone",
                description: "Perfect for students with different schedules or those who travel between time zones."
              },
              {
                icon: "📚",
                title: "All Schools Supported",
                description: "Works with any NYC school schedule format. From block schedules to traditional periods."
              },
              {
                icon: "🔒",
                title: "Privacy First",
                description: "Your schedule data stays private. No accounts required, no data collection, just your schedule when you need it."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TextRevealCard
                  text={
                    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                      <CardHeader>
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                          <span className="text-2xl">{feature.icon}</span>
                        </div>
                        <CardTitle className="text-white">{feature.title}</CardTitle>
                        <CardDescription className="text-white/70">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  }
                  revealText={
                    <Card className="bg-white/10 border-white/20">
                      <CardHeader>
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                          <span className="text-2xl">{feature.icon}</span>
                        </div>
                        <CardTitle className="text-white">{feature.title}</CardTitle>
                        <CardDescription className="text-white/80">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  }
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 text-white">How It Works</h2>
            <p className="text-xl text-white/70">
              Three simple steps to get your schedule app
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <section id="get-started" className="py-16 px-4 sm:px-6 lg:px-8 bg-white/5 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              Ready to Never Miss a Class Again?
            </h2>
            <p className="text-xl mb-8 text-white/70">
              Join hundreds of NYC students who've already made the switch to ScheduleSnap
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-black hover:bg-white/90">
                Create Your Schedule App
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-blue-600">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-white">Support</h3>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Open Source</a></li>
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
