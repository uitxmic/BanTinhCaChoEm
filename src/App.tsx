import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import HeartClock from './components/HeartClock';
import SecretLetter from './components/SecretLetter';
import Timeline from './components/Timeline';

type AppPage = 'landing' | 'timeline' | 'secret';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 32,
    filter: 'blur(18px)',
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: 'blur(12px)',
    scale: 1.01,
    transition: {
      duration: 0.35,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
};

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('landing');

  return (
    <div className="app-shell">
      <div className="ambient-grid" />
      <div className="ambient-orb ambient-orb--one" />
      <div className="ambient-orb ambient-orb--two" />
      <div className="ambient-orb ambient-orb--three" />

      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative z-10 min-h-screen"
        >
          {currentPage === 'landing' ? (
            <HeartClock onHeartClick={() => setCurrentPage('timeline')} />
          ) : null}

          {currentPage === 'timeline' ? (
            <Timeline
              onBackClick={() => setCurrentPage('landing')}
              onOpenSecret={() => setCurrentPage('secret')}
            />
          ) : null}

          {currentPage === 'secret' ? (
            <SecretLetter
              onBack={() => setCurrentPage('timeline')}
              onReturnHome={() => setCurrentPage('landing')}
            />
          ) : null}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

export default App;
