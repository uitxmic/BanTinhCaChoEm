import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeartClock = ({ onHeartClick }: { onHeartClick: () => void }) => {
    const [loveTime, setLoveTime] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const startDate = new Date('2024-04-20');

    useEffect(() => {
        const calculateLoveTime = () => {
            const now = new Date();
            const timeDiff = now.getTime() - startDate.getTime();

            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            setLoveTime({ days, hours, minutes, seconds });
        };

        const interval = setInterval(calculateLoveTime, 1000);
        calculateLoveTime();

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-300 to-pink-400 flex flex-col items-center justify-center relative overflow-visible p-4">

            {/* Header */}
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-5xl font-bold text-white mb-8 font-serif text-center"
                style={{ textShadow: '0 4px 24px #ec4899, 0 1px 0 #fff' }}
            >
                Chuyện tình yêu của Như Anh và Minh Khôi
            </motion.h1>

            {/* Heart Container */}
            <motion.div
                className="relative cursor-pointer group"
                onClick={onHeartClick}
                whileTap={{ scale: 0.95 }}
            >
                {/* Main Heart Shape */}
                <motion.div
                    className="w-48 h-48 md:w-64 md:h-64"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                    <svg viewBox="0 0 24 24" className="w-full h-full" style={{ filter: 'drop-shadow(0px 10px 20px rgba(236, 72, 153, 0.5))' }}>
                        <motion.path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            animate={{
                                fill: [
                                    "rgba(244, 114, 182, 1)", // pink-400
                                    "rgba(236, 72, 153, 1)", // pink-500
                                    "rgba(244, 114, 182, 1)"
                                ],
                                scale: [1, 1.03, 1],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </svg>
                </motion.div>

                {/* Sparkles Effect */}
                {[...Array(8)].map((_, i) => {
                    const angle = (i / 8) * 2 * Math.PI;
                    const radius = 120; // md: 140
                    return (
                        <motion.div
                            key={i}
                            className="absolute text-yellow-300"
                            style={{
                                top: '50%',
                                left: '50%',
                                x: '-50%',
                                y: '-50%',
                                rotate: Math.random() * 360,
                            }}
                            animate={{
                                x: [`-50%`, `${Math.cos(angle) * radius - 50}%`],
                                y: [`-50%`, `${Math.sin(angle) * radius - 50}%`],
                                scale: [0, 1.5, 0],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.25,
                                ease: "easeInOut"
                            }}
                        >
                            ✨
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Time Details */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="flex flex-col items-center mt-12"
            >
                <motion.div
                    className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-white"
                    style={{
                        textShadow: '0 8px 40px rgba(236, 72, 153, 0.8), 0 4px 0 #fff, 0 0 20px rgba(244, 114, 182, 0.6)',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                    }}
                    animate={{
                        scale: [1, 1.02, 1],
                        opacity: [0.9, 1, 0.9]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {loveTime.days} Ngày : {loveTime.hours} Giờ : {loveTime.minutes} Phút : {loveTime.seconds} Giây
                </motion.div>
            </motion.div>
        </div>
    );
};

export default HeartClock;