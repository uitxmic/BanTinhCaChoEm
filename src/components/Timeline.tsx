import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { coupleStory, timelineMoments, type TimelineMedia } from '../content/story';

type TimelineProps = {
  onBackClick: () => void;
  onOpenSecret: () => void;
};

const renderMedia = (media: TimelineMedia) => {
  if (media.type === 'video') {
    return (
      <video
        controls
        playsInline
        preload="metadata"
        poster={media.poster}
        className="h-full w-full object-cover"
      >
        <source src={media.src} />
        Trình duyệt của bạn chưa hỗ trợ video cho mốc thời gian này.
      </video>
    );
  }

  return <img src={media.src} alt={media.alt} className="h-full w-full object-cover" />;
};

const renderMobileMedia = (media: TimelineMedia) => {
  if (media.type === 'video') {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={media.poster}
        className="h-full w-full object-cover"
      >
        <source src={media.src} />
      </video>
    );
  }

  return <img src={media.src} alt={media.alt} className="h-full w-full object-cover" />;
};

type MobileTimelineSlideProps = {
  index: number;
  total: number;
  moment: (typeof timelineMoments)[number];
  activeId: string;
  onVisible: (id: string) => void;
};

const MobileTimelineSlide = ({ index, total, moment, activeId, onVisible }: MobileTimelineSlideProps) => {
  const featuredMedia = moment.media[0];
  const secondaryMedia = moment.media.slice(1);
  const [ref, inView] = useInView({
    threshold: 0.65,
  });

  useEffect(() => {
    if (inView) {
      onVisible(moment.id);
    }
  }, [inView, moment.id, onVisible]);

  return (
    <section
      ref={ref}
      className="mobile-story-slide relative min-h-[100svh] snap-start"
      style={{ '--chapter-accent': moment.accent } as CSSProperties}
    >
      <div className="mobile-story-glow" />

      {featuredMedia ? (
        <div className="absolute inset-0">
          {renderMobileMedia(featuredMedia)}
          <div className="mobile-story-media-overlay" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.34),transparent_30%),linear-gradient(180deg,rgba(255,243,247,0.92),rgba(255,228,239,0.94))]" />
      )}

      <div className="pointer-events-none absolute right-4 top-[50%] z-20 flex -translate-y-1/2 flex-col gap-2">
        {timelineMoments.map((item) => (
          <span
            key={item.id}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              activeId === item.id ? 'bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.18)]' : 'bg-white/38'
            }`}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-between px-4 pb-[max(1.4rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="mobile-story-topbar">
          <span className="mobile-story-counter">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-2">
            <span className="mobile-story-chip">{moment.date}</span>
            <span className="mobile-story-chip">{moment.location}</span>
          </div>
        </div>

        <div className="mobile-story-card">
          <div className="flex flex-wrap items-center gap-2">
            {moment.tags.map((tag) => (
              <span key={tag} className="mobile-story-tag">
                {tag}
              </span>
            ))}
          </div>

          <h3 className="mobile-story-title">
            {moment.title}
          </h3>

          <p className="mobile-story-description">
            {moment.description}
          </p>

          {moment.quote?.trim() ? (
            <blockquote className="mobile-story-quote">
              “{moment.quote}”
            </blockquote>
          ) : null}

          {featuredMedia?.caption ? (
            <p className="mobile-story-caption">
              {featuredMedia.caption}
            </p>
          ) : null}

          {secondaryMedia.length ? (
            <div className="mobile-story-gallery">
              {secondaryMedia.map((media) => (
                <figure key={`${moment.id}-${media.src}`} className="mobile-story-thumb">
                  {media.type === 'video' ? (
                    <video muted playsInline preload="metadata" poster={media.poster} className="h-full w-full object-cover">
                      <source src={media.src} />
                    </video>
                  ) : (
                    <img src={media.src} alt={media.alt} className="h-full w-full object-cover" />
                  )}
                </figure>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

const Timeline = ({ onBackClick, onOpenSecret }: TimelineProps) => {
  const [activeIntroRef, activeIntroInView] = useInView({
    threshold: 0.65,
  });

  useEffect(() => {
    if (activeIntroInView) {
      setActiveSlideId('intro');
    }
  }, [activeIntroInView]);

  const [activeSecretRef, activeSecretInView] = useInView({
    threshold: 0.65,
  });

  useEffect(() => {
    if (activeSecretInView) {
      setActiveSlideId('secret');
    }
  }, [activeSecretInView]);

  const [activeSlideId, setActiveSlideId] = useState('intro');

  const totalSlides = timelineMoments.length;

  return (
    <section className="lg:px-10 lg:py-6">
      <div className="mx-auto max-w-6xl">
        <div className="mobile-timeline-shell lg:hidden">
          <div className="mobile-timeline-feed">
            <section
              ref={activeIntroRef}
              className="mobile-story-slide relative flex min-h-[100svh] snap-start items-end"
              style={{ '--chapter-accent': '#fb7185' } as CSSProperties}
            >
              <div className="mobile-story-glow" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,212,222,0.98),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(251,191,36,0.22),transparent_18%),linear-gradient(180deg,rgba(255,247,250,0.96),rgba(255,233,241,0.98))]" />

              <div className="pointer-events-none absolute right-4 top-[50%] z-20 flex -translate-y-1/2 flex-col gap-2">
                <span
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    activeSlideId === 'intro' ? 'bg-slate-900 shadow-[0_0_0_4px_rgba(15,23,42,0.12)]' : 'bg-slate-900/22'
                  }`}
                />
                {timelineMoments.map((item) => (
                  <span
                    key={item.id}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      activeSlideId === item.id ? 'bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.16)]' : 'bg-slate-900/18'
                    }`}
                  />
                ))}
                <span
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    activeSlideId === 'secret' ? 'bg-slate-900 shadow-[0_0_0_4px_rgba(15,23,42,0.12)]' : 'bg-slate-900/22'
                  }`}
                />
              </div>

              <div className="relative z-10 px-4 pb-[max(1.4rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
                <div className="mobile-intro-card">
                  <span className="story-badge">{coupleStory.eyebrow}</span>
                  <p className="section-kicker mt-5">Swipe-based timeline for mobile</p>
                  <h2 className="mt-4 font-title text-[clamp(3rem,13vw,4.5rem)] leading-[0.94] text-slate-900">
                    Vuốt để đi qua từng chương
                  </h2>
                  <p className="mt-5 text-base leading-8 text-slate-700/78">
                    Trên mobile, timeline giờ hoạt động như một feed short video: mỗi cột mốc là một màn hình riêng, vuốt lên để đi tiếp,
                    vuốt xuống để xem lại.
                  </p>
                  <div className="mt-6 flex items-center justify-between gap-3 rounded-[24px] bg-slate-950 px-5 py-4 text-white">
                    <div>
                      <p className="text-xs uppercase tracking-[0.32em] text-white/52">Ready to swipe</p>
                      <p className="mt-2 text-lg font-semibold">{timelineMoments.length} chapters đang chờ phía dưới</p>
                    </div>
                    <span className="text-2xl">↓</span>
                  </div>
                </div>
              </div>
            </section>

            {timelineMoments.map((moment, index) => (
              <MobileTimelineSlide
                key={moment.id}
                index={index}
                total={totalSlides}
                moment={moment}
                activeId={activeSlideId}
                onVisible={setActiveSlideId}
              />
            ))}

            <section
              ref={activeSecretRef}
              className="mobile-story-slide relative flex min-h-[100svh] snap-start items-end"
              style={{ '--chapter-accent': '#0f172a' } as CSSProperties}
            >
              <div className="mobile-story-glow" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(30,41,59,0.98))]" />

              <div className="pointer-events-none absolute right-4 top-[50%] z-20 flex -translate-y-1/2 flex-col gap-2">
                <span className="h-2 w-2 rounded-full bg-white/22" />
                {timelineMoments.map((item) => (
                  <span
                    key={item.id}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      activeSlideId === item.id ? 'bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.16)]' : 'bg-white/22'
                    }`}
                  />
                ))}
                <span
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    activeSlideId === 'secret' ? 'bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.16)]' : 'bg-white/22'
                  }`}
                />
              </div>

              <div className="relative z-10 px-4 pb-[max(1.4rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
                <div className="mobile-story-card border-white/14 bg-white/10 text-white shadow-[0_24px_64px_rgba(15,23,42,0.28)]">
                  <span className="story-badge bg-white/12 text-white">Secret ending</span>
                  <h3 className="mt-4 font-title text-4xl leading-none text-white">
                    Chương cuối là một chiếc phong bì
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/80">
                    Vẫn còn một chương nữa, em hãy tiếp tục tìm hiểu để mở ra nó nhé. Đây sẽ là một phần rất đặc biệt mà anh đã chuẩn bị riêng cho em.
                  </p>

                  <div className="mt-6 flex flex-col gap-3">
                    <button type="button" onClick={onOpenSecret} className="primary-button w-full">
                      Đi tới lá thư bí mật
                    </button>
                    <button type="button" onClick={onBackClick} className="ghost-button w-full border-white/18 bg-white/12 text-white">
                      Quay lại landing
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="hidden lg:block">
        <div className="sticky top-4 z-30 mb-6 flex justify-end">
          <div className="story-panel flex flex-wrap items-center gap-2 rounded-full px-2 py-2">
            <button type="button" onClick={onBackClick} className="ghost-button">
              Trang đầu
            </button>
            <button type="button" onClick={onOpenSecret} className="primary-button">
              Mở thư bí mật
            </button>
          </div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="story-panel relative overflow-hidden rounded-[36px] p-6 sm:p-8 lg:p-10"
        >
          <div className="absolute inset-y-0 right-[-10%] w-[38%] rounded-full bg-white/45 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <span className="story-badge">Immersive timeline</span>
              <p className="section-kicker mt-5">Scroll-based love archive</p>
              <h2 className="mt-4 font-title text-5xl leading-none text-slate-900 sm:text-6xl">
                Timeline bây giờ là một story experience
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-white/55 bg-white/68 p-5 shadow-[0_18px_45px_rgba(255,138,171,0.14)] backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.32em] text-slate-500/72">Chapters</p>
                <p className="mt-3 text-3xl font-bold text-slate-900">{timelineMoments.length}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600/75">Mỗi mốc đều có phần mô tả, quote, tags và gallery.</p>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="mt-10 space-y-8">
          {timelineMoments.map((moment, index) => {
            const featuredMedia = moment.media[0];
            const secondaryMedia = moment.media.slice(1);
            const reverseLayout = index % 2 === 1;

            return (
              <motion.section
                key={moment.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.24 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="story-section"
                style={{ '--chapter-accent': moment.accent } as CSSProperties}
              >
                <div className="story-panel relative overflow-hidden rounded-[34px] p-5 sm:p-7 lg:p-8">
                  <div className="story-section__glow" />

                  <div className="relative grid gap-6 lg:grid-cols-2 lg:items-start">
                    <div className={`space-y-6 ${reverseLayout ? 'lg:order-2 lg:pl-4' : 'lg:pr-4'}`}>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="story-index">{String(index + 1).padStart(2, '0')}</span>
                        <span className="story-chip">{moment.date}</span>
                        <span className="story-chip">{moment.location}</span>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-title text-4xl leading-none text-slate-900 sm:text-5xl">{moment.title}</h3>
                        <p className="text-base leading-8 text-slate-700/82 sm:text-lg">{moment.description}</p>
                      </div>

                      {moment.quote?.trim() ? (
                        <blockquote className="rounded-[28px] border border-white/55 bg-white/68 px-5 py-4 text-base leading-8 text-slate-700/78 shadow-[0_18px_45px_rgba(255,142,176,0.14)] backdrop-blur-xl">
                          “{moment.quote}”
                        </blockquote>
                      ) : null}

                      <div className="flex flex-wrap gap-2">
                        {moment.tags.map((tag) => (
                          <span key={tag} className="story-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={`space-y-4 ${reverseLayout ? 'lg:order-1 lg:pr-4' : 'lg:pl-4'}`}>
                      {featuredMedia ? (
                        <figure className="story-media-frame aspect-[16/10] overflow-hidden">
                          {renderMedia(featuredMedia)}
                          {featuredMedia.caption ? (
                            <figcaption className="story-media-caption">{featuredMedia.caption}</figcaption>
                          ) : null}
                        </figure>
                      ) : (
                        <div className="story-media-placeholder">
                          <p className="text-xs uppercase tracking-[0.32em] text-slate-500/70">Media slot</p>
                          <p className="mt-4 text-2xl font-semibold text-slate-900">Chỗ này đang chờ ảnh hoặc video</p>
                          <p className="mt-3 max-w-xl text-base leading-8 text-slate-700/74">
                            Bạn chỉ cần thêm phần tử <code>{`{ type: 'image' | 'video', src: '/images/...' }`}</code> vào mảng{' '}
                            <code>media</code> của mốc thời gian tương ứng.
                          </p>
                        </div>
                      )}

                      {secondaryMedia.length ? (
                        <div className={`grid gap-4 ${secondaryMedia.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                          {secondaryMedia.map((media) => (
                            <figure key={`${moment.id}-${media.src}`} className="story-media-frame aspect-[4/5] overflow-hidden">
                              {renderMedia(media)}
                              {media.caption ? <figcaption className="story-media-caption">{media.caption}</figcaption> : null}
                            </figure>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </motion.section>
            );
          })}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="story-panel mt-10 rounded-[34px] p-6 sm:p-8 lg:p-10"
        >
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="story-badge">Secret ending</span>
              <h3 className="mt-5 font-title text-4xl leading-none text-slate-900 sm:text-5xl">
                {coupleStory.title} vẫn còn một đoạn kết riêng
              </h3>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700/80 sm:text-lg">
                Timeline dừng lại ở đây để nhường sân cho một chiếc phong bì thư bí mật.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <button type="button" onClick={onOpenSecret} className="primary-button">
                Đi tới lá thư bí mật
              </button>
              <button type="button" onClick={onBackClick} className="ghost-button">
                Quay lại landing
              </button>
            </div>
          </div>
        </motion.section>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
