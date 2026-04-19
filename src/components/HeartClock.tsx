import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { coupleStory, relationshipStartDate, timelineMoments } from '../content/story';

type LoveTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const relationshipStart = new Date(relationshipStartDate);

const createLoveTime = (): LoveTime => {
  const now = new Date();
  const diff = Math.max(now.getTime() - relationshipStart.getTime(), 0);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const formatValue = (value: number) => String(value).padStart(2, '0');

const HeartClock = ({ onHeartClick }: { onHeartClick: () => void }) => {
  const [loveTime, setLoveTime] = useState<LoveTime>(() => createLoveTime());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLoveTime(createLoveTime());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const formattedStartDate = new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(relationshipStart);

  const metrics = [
    { label: 'Ngày', value: String(loveTime.days) },
    { label: 'Giờ', value: formatValue(loveTime.hours) },
    { label: 'Phút', value: formatValue(loveTime.minutes) },
    { label: 'Giây', value: formatValue(loveTime.seconds) },
  ];

  return (
    <section className="relative flex min-h-screen items-center px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <div className="space-y-5">
            <span className="story-badge">
              {coupleStory.eyebrow} · since {formattedStartDate}
            </span>

            <div className="space-y-4">
              <p className="section-kicker">A softer and more modern first impression</p>
              <h1 className="font-title max-w-4xl text-[clamp(3rem,5.8vw,5.5rem)] leading-[0.94] text-slate-900">
                {coupleStory.title}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-700/80 sm:text-lg">
                {coupleStory.subtitle}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12 * index }}
                className="countdown-card"
              >
                <p className="text-xs uppercase tracking-[0.32em] text-slate-500/80">{metric.label}</p>
                <p className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">{metric.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="story-panel rounded-[34px] p-6 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="text-sm uppercase tracking-[0.32em] text-rose-500/75">Why this landing exists</p>
                <p className="mt-3 text-base leading-7 text-slate-700/80">{coupleStory.summary}</p>
              </div>

              <button type="button" onClick={onHeartClick} className="primary-button">
                Mở immersive timeline
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <button
            type="button"
            onClick={onHeartClick}
            className="story-panel group relative block w-full overflow-hidden rounded-[40px] p-6 text-left sm:p-8"
          >
            <div className="absolute -left-10 top-16 h-40 w-40 rounded-full bg-white/50 blur-3xl" />
            <div className="absolute -right-14 bottom-12 h-52 w-52 rounded-full bg-rose-300/40 blur-3xl" />

            <div className="relative flex min-h-[560px] flex-col justify-between">
              <div className="flex items-start justify-between gap-4">
                <div className="max-w-xs">
                  <span className="story-badge">Tap the heart</span>
                  <p className="mt-4 text-sm leading-7 text-slate-700/80">
                    Chạm vào trái tim để đi tiếp
                  </p>
                </div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="rounded-full border border-white/60 bg-white/65 px-4 py-2 text-sm font-semibold text-slate-700 shadow-[0_18px_40px_rgba(255,134,167,0.18)]"
                >
                  {timelineMoments.length} chapters
                </motion.div>
              </div>

              <div className="relative flex flex-1 items-center justify-center py-10">
                <motion.div
                  animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.85, 0.45] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute h-72 w-72 rounded-full bg-gradient-to-br from-white/80 via-rose-200/60 to-transparent blur-2xl"
                />
                <motion.div
                  animate={{ rotate: [0, 8, 0], scale: [1, 1.02, 1] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-56 w-56 drop-shadow-[0_24px_45px_rgba(233,91,143,0.4)] transition-transform duration-300 group-hover:scale-[1.03] sm:h-72 sm:w-72"
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      animate={{
                        fill: ['#f857a6', '#ec4899', '#fb7185', '#f857a6'],
                        scale: [1, 1.03, 1],
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </svg>

                  <motion.div
                    animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.92, 1, 0.92] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 rounded-full border border-white/50"
                  />
                </motion.div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[28px] border border-white/50 bg-white/72 p-5 shadow-[0_20px_40px_rgba(255,145,184,0.16)] backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-500/75">Now counting</p>
                  <p className="mt-3 text-2xl font-bold text-slate-900">
                    {loveTime.days} ngày yêu thương
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600/75">
                    Kể từ {formattedStartDate}, chiếc card này luôn sống cùng nhịp đồng hồ thật.
                  </p>
                </div>

                <div className="rounded-[28px] bg-slate-950 p-5 text-white shadow-[0_20px_40px_rgba(15,23,42,0.28)]">
                  <p className="text-xs uppercase tracking-[0.32em] text-white/55">Next section</p>
                  <p className="mt-3 text-2xl font-bold">Timeline immersive view</p>
                  <p className="mt-2 text-sm leading-6 text-white/72">
                    Chạm vào trái tim để đi tiếp tới nơi bạn có thể gắn ảnh và video theo từng cột mốc.
                  </p>
                </div>
              </div>
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeartClock;
