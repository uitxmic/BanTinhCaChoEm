import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ThankYou from './ThankYou'; // Thêm dòng này

interface TimelineProps {
    onBackClick: () => void;
    showThankYou: boolean;
    setShowThankYou: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TimelineEvent {
    date: string;
    title: string;
    description: string;
    emoji: string;
}

const Timeline: React.FC<TimelineProps> = ({ onBackClick, showThankYou, setShowThankYou }) => {

    const timelineEvents: TimelineEvent[] = [
        {
            date: '20/04/2024',
            title: 'Ngày đầu tiền quen nhau',
            description: 'Ngày đầu tiên chúng ta cảm thấy có sự kết nối đặc biệt.',
            emoji: '👫',
        },
        {
            date: '21/04/2024',
            title: 'Cuộc hẹn đầu tiên',
            description: 'Buổi hẹn hò đầu tiên của chúng ta tại quán ăn ở Bình Thạnh',
            emoji: '☕',
        },
        {
            date: '23/04/2024',
            title: 'Kỷ niệm 6 tháng yêu nhau',
            description: 'Hôm ấy có bánh kem ăn rất ngon và chúng ta đã cùng nhau đi dạo.',
            emoji: '💝',
        },
        {
            date: '31/05/2024',
            title: 'Cùng xem pháo hoa lần đầu tiên',
            description: 'Không nhớ rõ là sự kiện gì, nhưng hôm ấy chúng ta đã đi xem pháo hoa cùng nhau.',
            emoji: '💝',
        },
        {
            date: '24/07/2024',
            title: 'Kỷ niệm 2 tháng và chuyến đi chơi cùng nhau lần đầu tiên',
            description: 'Đi Vũng Tàu cùng nhau, kỷ niệm 2 tháng yêu nhau, và là sinh nhật của Như Anh',
            emoji: '🎉',
        },
        {
            date: '07/12/2024',
            title: 'Lần đầu đi xem phim ở Làng Đại học',
            description: 'Lần đầu Như Anh đến Làng của mình để xem phim cùng nhau.',
            emoji: '🌹',
        },
        {
            date: '27/03/2025',
            title: 'Mình có điện thoại mới để chụp ảnh cho Như Anh',
            description: 'Sắp tròn một năm yêu nhau, tình yêu chúng ta ngày càng bền chặt.',
            emoji: '💕',
        },
        {
            date: '20/04/2025',
            title: 'Kỷ niệm 1 năm yêu nhau!',
            description: 'Cùng đi xem pháo hoa, kỷ niệm một năm yêu nhau, và là ngày đặc biệt của Đất nước.',
            emoji: '🥳',
        },
        {
            date: '15/01/2025',
            title: 'Kỷ niệm 1 năm yêu nhau! 🎊',
            description: 'Một năm đầy yêu thương, hạnh phúc và những kỷ niệm không thể nào quên!',
            emoji: '🥳',
        },
    ];

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.42, 0, 0.58, 1] as const,
            },
        },
    };

    return (
        <>
            {/* Always call hooks above! */}
            {showThankYou ? (
                <ThankYou onBack={() => setShowThankYou(false)} />
            ) : (
                <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 py-12 px-4 overflow-visible">
                    {/* Header */}
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12 relative"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-serif">
                            <span className="font-[Poppins,Segoe UI,Arial,sans-serif]">Timeline Tình Yêu</span>
                        </h1>
                        <p className="text-xl text-pink-100">
                            Hành trình một năm yêu thương của chúng ta 💖
                        </p>
                    </motion.div>

                    {/* Nút Trở về nổi góc phải dưới */}
                    <button
                        onClick={onBackClick}
                        className="fixed bottom-8 right-8 bg-white/20 backdrop-blur-sm rounded-full p-4 text-white hover:bg-white/30 transition-all z-50 shadow-lg"
                        style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}
                    >
                        ← Trở về
                    </button>
                    {/* Nút Lời cảm ơn */}
                    <button
                        onClick={() => setShowThankYou(true)}
                        className="fixed bottom-8 right-32 bg-pink-400 text-white rounded-full p-4 hover:bg-pink-500 transition-all z-50 shadow-lg"
                        style={{ position: 'fixed', bottom: '2rem', right: '9rem' }} // tăng khoảng cách
                    >
                        💌 Lời cảm ơn
                    </button>
                    {/* Timeline */}
                    <div className="max-w-4xl mx-auto relative pb-20">
                        {/* Central connecting line with enhanced styling */}
                        <div className="left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-pink-300 via-purple-300 to-pink-300 min-h-full rounded-full shadow-lg"></div>

                        {timelineEvents.map((event, index) => {
                            const controls = useAnimation();
                            const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

                            React.useEffect(() => {
                                if (inView) {
                                    controls.start('visible');
                                }
                            }, [controls, inView]);

                            // Alternate card position (left/right)
                            const isLeft = index % 2 === 0;

                            return (
                                <motion.div
                                    ref={ref}
                                    initial="hidden"
                                    animate={controls}
                                    variants={itemVariants}
                                    key={index}
                                    className={`relative flex ${isLeft ? 'justify-start' : 'justify-end'} mb-16`}
                                >
                                    {/* Connection line from dot to card */}
                                    <div
                                        className={`absolute top-8 w-12 h-0.5 bg-gradient-to-r ${isLeft
                                            ? 'from-pink-300 to-transparent left-1/2 ml-3'
                                            : 'from-transparent to-pink-300 right-1/2 mr-3'
                                            } opacity-70`}
                                    ></div>

                                    {/* Enhanced Timeline Dot */}
                                    <div className="absolute left-1/2 -translate-x-1/2 top-6 z-20">
                                        <div className="w-8 h-8 bg-gradient-to-br from-pink-200 to-purple-300 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                                            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                                        </div>
                                    </div>

                                    {/* Enhanced Card with better rounded corners */}
                                    <motion.div
                                        whileHover={{
                                            scale: 1.02,
                                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                        }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className={`w-[42%] ${isLeft ? 'mr-12' : 'ml-12'}`}
                                    >
                                        <div className="bg-white/25 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 hover:bg-white/30 transition-all duration-300">
                                            {/* Emoji with enhanced styling */}
                                            <div className="text-center mb-4">
                                                <span className="text-5xl block mb-3 filter drop-shadow-lg">{event.emoji}</span>
                                                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto"></div>
                                            </div>

                                            {/* Content */}
                                            <h3 className="text-2xl font-bold text-white mb-3 text-center font-serif leading-tight">
                                                <span className="font-[Poppins,Segoe UI,Arial,sans-serif]">{event.title}</span>
                                            </h3>
                                            <div className="bg-white/20 rounded-full px-4 py-2 mb-4 text-center">
                                                <p className="text-pink-100 text-sm font-medium">{event.date}</p>
                                            </div>
                                            <p className="text-white/95 text-center leading-relaxed text-lg">
                                                <span className="font-[Poppins,Segoe UI,Arial,sans-serif]">{event.description}</span>
                                            </p>

                                            {/* Decorative elements */}
                                            <div className="mt-6 flex justify-center space-x-1">
                                                <div className="w-2 h-2 bg-pink-300 rounded-full opacity-60"></div>
                                                <div className="w-2 h-2 bg-purple-300 rounded-full opacity-60"></div>
                                                <div className="w-2 h-2 bg-pink-300 rounded-full opacity-60"></div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                    <br />

                    {/* Footer */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-center mt-20 pb-12"
                    >
                        <div className="bg-white/25 backdrop-blur-lg rounded-3xl p-10 max-w-3xl mx-auto border border-white/20 shadow-2xl">
                            <h2 className="text-4xl font-bold text-white mb-6 font-serif">
                                <span className="font-[Poppins,Segoe UI,Arial,sans-serif]">Và câu chuyện vẫn tiếp tục... 💕</span>
                            </h2>
                            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto mb-6"></div>
                            <p className="text-xl text-pink-100 leading-relaxed mb-6">
                                Một năm đã qua, nhưng đây chỉ là khởi đầu cho những năm tháng hạnh phúc phía trước.
                                Cảm ơn em vì đã làm cuộc sống anh trở nên ý nghĩa hơn. Yêu em nhiều!
                            </p>
                            <div className="mt-8 text-5xl filter drop-shadow-lg">💖✨🌟💖</div>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );

};

export default Timeline;