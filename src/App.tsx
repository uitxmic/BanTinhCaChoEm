import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeartClock from './components/HeartClock'
import Timeline from './components/Timeline'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState<'heart' | 'timeline'>('heart')

  const handleHeartClick = () => {
    setCurrentPage('timeline')
  }

  const handleBackClick = () => {
    setCurrentPage('heart')
  }

  const pageVariants = {
    initial: {
      opacity: 0,
      x: "100vw",
      scale: 0.8
    },
    in: {
      opacity: 1,
      x: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      x: "-100vw",
      scale: 1.2
    }
  }

  const pageTransition = {
    type: "tween" as const,
    ease: "anticipate" as const,
    duration: 0.8
  }

  const [showThankYou, setShowThankYou] = useState(false);

  // ...existing code...

  return (
    <div className="w-full h-screen overflow-visible bg-pink-100">

      <AnimatePresence mode="wait">
        {currentPage === 'heart' ? (
          <motion.div
            key="heart"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full h-full"
          >
            <HeartClock onHeartClick={handleHeartClick} />
          </motion.div>
        ) : (
          <motion.div
            key="timeline"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full h-full"
          >
            <Timeline 
              onBackClick={handleBackClick} 
              showThankYou={showThankYou} 
              setShowThankYou={setShowThankYou} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
