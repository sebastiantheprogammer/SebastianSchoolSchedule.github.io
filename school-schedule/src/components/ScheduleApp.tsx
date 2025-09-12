import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, MapPin, User, ChevronLeft, ChevronRight } from 'lucide-react'

interface ScheduleAppProps {
  onBack: () => void
}

interface ClassPeriod {
  id: string
  time: string
  subject: string
  teacher: string
  room: string
  isCurrent: boolean
  isNext: boolean
}

const ScheduleApp: React.FC<ScheduleAppProps> = ({ onBack }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentDay, setCurrentDay] = useState('Monday')
  const [currentDayIndex, setCurrentDayIndex] = useState(0)

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  // Real NYC high school schedule data
  const getCurrentDaySchedule = (day: string): ClassPeriod[] => {
    const daySchedules = {
      'Monday': [
        { id: '1', time: '07:50–08:00', subject: 'Homeroom', teacher: 'Florez, Karla', room: '302', isCurrent: false, isNext: false },
        { id: '2', time: '08:03–08:43', subject: 'British Lit ELA 10 Advanced', teacher: 'Camarda, Antoinette', room: '202', isCurrent: false, isNext: false },
        { id: '3', time: '08:45–09:25', subject: 'Algebra II 10 Advanced', teacher: 'Rubin De Celis, Miguel', room: '304', isCurrent: false, isNext: false },
        { id: '4', time: '09:27–10:07', subject: 'Chemistry 10 Advanced', teacher: 'Reyes, Jeremy', room: '301', isCurrent: false, isNext: false },
        { id: '5', time: '10:09–10:55', subject: 'Global Studies II: The Modern Era Advanced', teacher: 'Follenius, David', room: '204', isCurrent: false, isNext: false },
        { id: '6', time: '10:57–11:31', subject: 'Mass', teacher: 'Chapel', room: 'Chapel', isCurrent: false, isNext: false },
        { id: '7', time: '11:33–12:13', subject: 'Phys Ed 10 Advanced', teacher: 'Tucker III, Menzo', room: 'Gym', isCurrent: false, isNext: false },
        { id: '8', time: '11:33–12:00', subject: 'Lunch (Fresh/Sr)', teacher: 'Cafeteria', room: 'Cafeteria', isCurrent: false, isNext: false },
        { id: '9', time: '12:13–12:42', subject: 'Lunch (Soph/Jr)', teacher: 'Cafeteria', room: 'Cafeteria', isCurrent: false, isNext: false },
        { id: '10', time: '12:42–01:22', subject: 'Spanish 10 Intermediate Advanced', teacher: 'Florez, Karla', room: '201', isCurrent: false, isNext: false },
        { id: '11', time: '01:24–02:04', subject: 'Computer Science 10 Advanced', teacher: 'Rooney, Robert', room: '203', isCurrent: false, isNext: false },
        { id: '12', time: '02:06–02:46', subject: 'Computer Science 10 Advanced', teacher: 'Rooney, Robert', room: '203', isCurrent: false, isNext: false }
      ],
      'Tuesday': [
        { id: '1', time: '07:50–08:00', subject: 'Homeroom', teacher: 'Florez, Karla', room: '302', isCurrent: false, isNext: false },
        { id: '2', time: '08:03–08:43', subject: 'Mass', teacher: 'Chapel', room: 'Chapel', isCurrent: false, isNext: false },
        { id: '3', time: '08:45–09:25', subject: 'Intro to Sacred Script 10 Advanced', teacher: 'Neier, Steven', room: '305', isCurrent: false, isNext: false },
        { id: '4', time: '09:27–10:07', subject: 'Intro to Sacred Script 10 Advanced', teacher: 'Neier, Steven', room: '305', isCurrent: false, isNext: false },
        { id: '5', time: '10:09–10:55', subject: 'Algebra II 10 Advanced', teacher: 'Rubin De Celis, Miguel', room: '304', isCurrent: false, isNext: false },
        { id: '6', time: '10:57–11:31', subject: 'Spanish 10 Intermediate Advanced', teacher: 'Florez, Karla', room: '201', isCurrent: false, isNext: false },
        { id: '7', time: '11:33–12:13', subject: 'Chemistry 10 Advanced', teacher: 'Reyes, Jeremy', room: '301', isCurrent: false, isNext: false },
        { id: '8', time: '11:33–12:00', subject: 'Lunch (Fresh/Sr)', teacher: 'Cafeteria', room: 'Cafeteria', isCurrent: false, isNext: false },
        { id: '9', time: '12:13–12:42', subject: 'Lunch (Soph/Jr)', teacher: 'Cafeteria', room: 'Cafeteria', isCurrent: false, isNext: false },
        { id: '10', time: '12:42–01:22', subject: 'British Lit ELA 10 Advanced', teacher: 'Camarda, Antoinette', room: '202', isCurrent: false, isNext: false },
        { id: '11', time: '01:24–02:04', subject: 'Spanish 10 Intermediate Advanced', teacher: 'Florez, Karla', room: '201', isCurrent: false, isNext: false },
        { id: '12', time: '02:06–02:46', subject: 'Global Studies II: The Modern Era Advanced', teacher: 'Follenius, David', room: '204', isCurrent: false, isNext: false }
      ],
      'Wednesday': [
        { id: '1', time: '07:50–08:00', subject: 'Homeroom', teacher: 'Florez, Karla', room: '302', isCurrent: false, isNext: false },
        { id: '2', time: '08:03–08:43', subject: 'Intro to Sacred Script 10 Advanced', teacher: 'Neier, Steven', room: '305', isCurrent: false, isNext: false },
        { id: '3', time: '08:45–09:25', subject: 'Intro to Sacred Script 10 Advanced', teacher: 'Neier, Steven', room: '305', isCurrent: false, isNext: false },
        { id: '4', time: '09:27–10:07', subject: 'Chemistry 10 Advanced', teacher: 'Reyes, Jeremy', room: '301', isCurrent: false, isNext: false },
        { id: '5', time: '10:09–10:55', subject: 'Chemistry 10 Advanced', teacher: 'Reyes, Jeremy', room: '301', isCurrent: false, isNext: false },
        { id: '6', time: '10:57–11:31', subject: 'Mass', teacher: 'Chapel', room: 'Chapel', isCurrent: false, isNext: false },
        { id: '7', time: '11:33–12:13', subject: 'Global Studies II: The Modern Era Advanced', teacher: 'Follenius, David', room: '204', isCurrent: false, isNext: false },
        { id: '8', time: '11:33–12:00', subject: 'Lunch (Fresh/Sr)', teacher: 'Cafeteria', room: 'Cafeteria', isCurrent: false, isNext: false },
        { id: '9', time: '12:13–12:42', subject: 'Lunch (Soph/Jr)', teacher: 'Cafeteria', room: 'Cafeteria', isCurrent: false, isNext: false },
        { id: '10', time: '12:42–01:22', subject: 'Algebra II 10 Advanced', teacher: 'Rubin De Celis, Miguel', room: '304', isCurrent: false, isNext: false },
        { id: '11', time: '01:24–02:04', subject: 'British Lit ELA 10 Advanced', teacher: 'Camarda, Antoinette', room: '202', isCurrent: false, isNext: false },
        { id: '12', time: '02:06–02:46', subject: 'Early Dismissal (Prof. Dev.)', teacher: 'N/A', room: 'N/A', isCurrent: false, isNext: false }
      ],
      'Thursday': [
        { id: '1', time: '07:50–08:00', subject: 'Homeroom', teacher: 'Florez, Karla', room: '302', isCurrent: false, isNext: false },
        { id: '2', time: '08:03–08:43', subject: 'Mass', teacher: 'Chapel', room: 'Chapel', isCurrent: false, isNext: false },
        { id: '3', time: '08:45–09:25', subject: 'Phys Ed 10 Advanced', teacher: 'Tucker III, Menzo', room: 'Gym', isCurrent: false, isNext: false },
        { id: '4', time: '09:27–10:07', subject: 'Global Studies II: The Modern Era Advanced', teacher: 'Follenius, David', room: '204', isCurrent: false, isNext: false },
        { id: '5', time: '10:09–10:55', subject: 'British Lit ELA 10 Advanced', teacher: 'Camarda, Antoinette', room: '202', isCurrent: false, isNext: false },
        { id: '6', time: '10:57–11:31', subject: 'Spanish 10 Intermediate Advanced', teacher: 'Florez, Karla', room: '201', isCurrent: false, isNext: false },
        { id: '7', time: '11:33–12:13', subject: 'Chemistry 10 Advanced', teacher: 'Reyes, Jeremy', room: '301', isCurrent: false, isNext: false },
        { id: '8', time: '11:33–12:00', subject: 'Lunch (Fresh/Sr)', teacher: 'Cafeteria', room: 'Cafeteria', isCurrent: false, isNext: false },
        { id: '9', time: '12:13–12:42', subject: 'Lunch (Soph/Jr)', teacher: 'Cafeteria', room: 'Cafeteria', isCurrent: false, isNext: false },
        { id: '10', time: '12:42–01:22', subject: 'Algebra II 10 Advanced', teacher: 'Rubin De Celis, Miguel', room: '304', isCurrent: false, isNext: false },
        { id: '11', time: '01:24–02:04', subject: 'Computer Science 10 Advanced', teacher: 'Rooney, Robert', room: '203', isCurrent: false, isNext: false },
        { id: '12', time: '02:06–02:46', subject: 'Holy Hour', teacher: 'Chapel', room: 'Chapel', isCurrent: false, isNext: false }
      ],
      'Friday': [
        { id: '1', time: '07:50–08:00', subject: 'Homeroom', teacher: 'Florez, Karla', room: '302', isCurrent: false, isNext: false },
        { id: '2', time: '08:03–08:43', subject: 'Algebra II 10 Advanced', teacher: 'Rubin De Celis, Miguel', room: '304', isCurrent: false, isNext: false },
        { id: '3', time: '08:45–09:25', subject: 'Chemistry 10 Advanced', teacher: 'Reyes, Jeremy', room: '301', isCurrent: false, isNext: false },
        { id: '4', time: '09:27–10:07', subject: 'Guidance 10 Advanced', teacher: 'Nieves, Stacy', room: '303', isCurrent: false, isNext: false },
        { id: '5', time: '10:09–10:55', subject: 'British Lit ELA 10 Advanced', teacher: 'Camarda, Antoinette', room: '202', isCurrent: false, isNext: false },
        { id: '6', time: '10:57–11:31', subject: 'Mass', teacher: 'Chapel', room: 'Chapel', isCurrent: false, isNext: false },
        { id: '7', time: '11:33–12:13', subject: 'Phys Ed 10 Advanced', teacher: 'Tucker III, Menzo', room: 'Gym', isCurrent: false, isNext: false },
        { id: '8', time: '11:33–12:00', subject: 'Lunch (Fresh/Sr)', teacher: 'Cafeteria', room: 'Cafeteria', isCurrent: false, isNext: false },
        { id: '9', time: '12:13–12:42', subject: 'Lunch (Soph/Jr)', teacher: 'Cafeteria', room: 'Cafeteria', isCurrent: false, isNext: false },
        { id: '10', time: '12:42–01:22', subject: 'Spanish 10 Intermediate Advanced', teacher: 'Florez, Karla', room: '201', isCurrent: false, isNext: false },
        { id: '11', time: '01:24–02:04', subject: 'Global Studies II: The Modern Era Advanced', teacher: 'Follenius, David', room: '204', isCurrent: false, isNext: false },
        { id: '12', time: '02:06–02:46', subject: 'Computer Science 10 Advanced', teacher: 'Rooney, Robert', room: '203', isCurrent: false, isNext: false }
      ]
    }
    
    return daySchedules[day as keyof typeof daySchedules] || daySchedules['Monday']
  }

  const schedule = getCurrentDaySchedule(currentDay)

  // Function to parse time string to minutes since midnight
  const parseTimeToMinutes = (timeStr: string): number => {
    const [time] = timeStr.split('–')
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  // Function to get current and next classes based on actual time
  const getCurrentAndNextClasses = (schedule: ClassPeriod[]): { current: ClassPeriod | null, next: ClassPeriod | null } => {
    const now = new Date()
    const currentMinutes = now.getHours() * 60 + now.getMinutes()
    
    let currentClass: ClassPeriod | null = null
    let nextClass: ClassPeriod | null = null
    
    for (let i = 0; i < schedule.length; i++) {
      const period = schedule[i]
      const [startTime, endTime] = period.time.split('–')
      const startMinutes = parseTimeToMinutes(startTime)
      const endMinutes = parseTimeToMinutes(endTime)
      
      // Check if current time is within this period
      if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
        currentClass = period
        // Next class is the one after this
        if (i + 1 < schedule.length) {
          nextClass = schedule[i + 1]
        }
        break
      }
      
      // Check if current time is before this period (next class)
      if (currentMinutes < startMinutes && !nextClass) {
        nextClass = period
      }
    }
    
    return { current: currentClass, next: nextClass }
  }

  const { current: currentClass, next: nextClass } = getCurrentAndNextClasses(schedule)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePreviousDay()
      } else if (event.key === 'ArrowRight') {
        handleNextDay()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentDayIndex])

  const handleNextDay = () => {
    if (currentDayIndex < days.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1)
      setCurrentDay(days[currentDayIndex + 1])
    }
  }

  const handlePreviousDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1)
      setCurrentDay(days[currentDayIndex - 1])
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      
      {/* Header */}
      <div className="relative z-10 p-4 sm:p-6">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </motion.button>

        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">ScheduleSnap Demo</h1>
            <p className="text-white/70">Real NYC High School Schedule</p>
          </motion.div>

          {/* Current Time and Day Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <Clock className="w-5 h-5 text-white/70" />
              <span className="text-2xl font-mono">{formatTime(currentTime)}</span>
            </div>
            
            {/* Day Navigation */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <Button
                onClick={handlePreviousDay}
                disabled={currentDayIndex === 0}
                variant="outline"
                size="sm"
                className="border-white/20 text-white bg-white/10 hover:bg-white/20 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </Button>
              
              <Badge variant="outline" className="border-white/20 text-white/80 px-4 py-2 text-lg">
                {currentDay}
              </Badge>
              
              <Button
                onClick={handleNextDay}
                disabled={currentDayIndex === days.length - 1}
                variant="outline"
                size="sm"
                className="border-white/20 text-white bg-white/10 hover:bg-white/20 disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </Button>
            </div>
            
            <p className="text-white/50 text-sm">Use arrow keys to navigate between days</p>
          </motion.div>

          {/* Current Class Highlight */}
          {currentClass && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-white flex items-center justify-center gap-2">
                    <User className="w-5 h-5" />
                    Current Class
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{currentClass.subject}</h3>
                  <p className="text-white/70 mb-1">{currentClass.teacher}</p>
                  <div className="flex items-center justify-center gap-2 text-white/60">
                    <MapPin className="w-4 h-4" />
                    <span>{currentClass.room}</span>
                  </div>
                  <Badge className="mt-3 bg-green-500/20 text-green-400 border-green-500/30">
                    {currentClass.time}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Next Class */}
          {nextClass && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold">Next: {nextClass.subject}</h4>
                      <p className="text-white/60 text-sm">{nextClass.time}</p>
                    </div>
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                      Upcoming
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Full Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-center">Full Schedule - {currentDay}</CardTitle>
                <p className="text-white/60 text-sm text-center">
                  Real NYC high school schedule with actual teachers and room numbers
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {schedule.map((period, index) => (
                    <motion.div
                      key={period.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      className={`p-4 rounded-lg border transition-all ${
                        currentClass && period.id === currentClass.id
                          ? 'bg-green-500/20 border-green-500/30'
                          : nextClass && period.id === nextClass.id
                          ? 'bg-blue-500/20 border-blue-500/30'
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className={`font-semibold ${
                            currentClass && period.id === currentClass.id ? 'text-green-400' : 
                            nextClass && period.id === nextClass.id ? 'text-blue-400' : 'text-white'
                          }`}>
                            {period.subject}
                          </h4>
                          <p className="text-white/60 text-sm">{period.teacher}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-white/50 text-xs">{period.room}</span>
                            <span className="text-white/50 text-xs">{period.time}</span>
                          </div>
                        </div>
                        {currentClass && period.id === currentClass.id && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            Now
                          </Badge>
                        )}
                        {nextClass && period.id === nextClass.id && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            Next
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={onBack}
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white hover:text-black"
              size="lg"
            >
              Back to Home
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ScheduleApp
