import { useEffect, useRef, useState, type ClipboardEvent, type FormEvent, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { secretLetter, secretPasscode } from '../content/story';

const DIGIT_COUNT = 6;

const createEmptyDigits = () => Array.from({ length: DIGIT_COUNT }, () => '');

type SecretLetterProps = {
  onBack: () => void;
  onReturnHome: () => void;
};

const SecretLetter = ({ onBack, onReturnHome }: SecretLetterProps) => {
  const [digits, setDigits] = useState<string[]>(() => createEmptyDigits());
  const [feedback, setFeedback] = useState('');
  const [isLoadingLetter, setIsLoadingLetter] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const joinedDigits = digits.join('');

  const focusDigit = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const clearDigits = () => {
    setDigits(createEmptyDigits());
    setFeedback('');
    focusDigit(0);
  };

  const handleDigitChange = (index: number, value: string) => {
    const nextValue = value.replace(/\D/g, '').slice(-1);

    setDigits((currentDigits) => {
      const updatedDigits = [...currentDigits];
      updatedDigits[index] = nextValue;
      return updatedDigits;
    });

    if (feedback) {
      setFeedback('');
    }

    if (nextValue && index < DIGIT_COUNT - 1) {
      focusDigit(index + 1);
    }
  };

  const handleDigitKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      focusDigit(index - 1);
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      focusDigit(index - 1);
    }

    if (event.key === 'ArrowRight' && index < DIGIT_COUNT - 1) {
      event.preventDefault();
      focusDigit(index + 1);
    }
  };

  const handleDigitPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedDigits = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, DIGIT_COUNT)
      .split('');

    if (!pastedDigits.length) {
      return;
    }

    const nextDigits = createEmptyDigits();
    pastedDigits.forEach((digit, index) => {
      nextDigits[index] = digit;
    });

    setDigits(nextDigits);
    setFeedback('');
    focusDigit(Math.min(pastedDigits.length, DIGIT_COUNT - 1));
  };

  const handleUnlock = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (joinedDigits.length < DIGIT_COUNT) {
      setFeedback('Điền đủ 6 chữ số trước khi mở khóa nhé.');
      return;
    }

    if (joinedDigits !== secretPasscode) {
      setFeedback('Mật mã chưa đúng rồi, thử lại thêm một lần nữa nhé.');
      setDigits(createEmptyDigits());
      focusDigit(0);
      return;
    }

    setFeedback('');
    setIsLoadingLetter(true);

    timeoutRef.current = window.setTimeout(() => {
      setIsLoadingLetter(false);
      setIsUnlocked(true);
    }, 900);
  };

  const resetLetter = () => {
    setIsUnlocked(false);
    setIsEnvelopeOpen(false);
    setIsLoadingLetter(false);
    clearDigits();
  };

  const toggleEnvelope = () => {
    setIsEnvelopeOpen((currentState) => !currentState);
  };

  const handleEnvelopeKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleEnvelope();
    }
  };

  return (
    <section className="px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="sticky top-4 z-30 mb-6 flex justify-end">
          <div className="story-panel flex flex-wrap items-center gap-2 rounded-full px-2 py-2">
            <button type="button" onClick={onReturnHome} className="ghost-button">
              Trang đầu
            </button>
            <button type="button" onClick={onBack} className="ghost-button">
              Timeline
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="passcode"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]"
            >
              <div className="story-panel rounded-[34px] p-6 sm:p-8">
                <span className="story-badge">{secretLetter.overline}</span>
                <h2 className="mt-5 font-title text-5xl leading-none text-slate-900 sm:text-6xl">
                  Mở khóa phong bì bí mật
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-slate-700/80 sm:text-lg">
                  Nhập đúng passcode 6 số để hiện ra một phong bì thư. Khi phong bì xuất hiện, chạm vào nó để mở lá thư bên trong.
                </p>

                <form onSubmit={handleUnlock} className="mt-10 space-y-6">
                  <div className="flex flex-wrap gap-3">
                    {digits.map((digit, index) => (
                      <input
                        key={`digit-${index}`}
                        ref={(element) => {
                          inputRefs.current[index] = element;
                        }}
                        value={digit}
                        onChange={(event) => handleDigitChange(index, event.target.value)}
                        onKeyDown={(event) => handleDigitKeyDown(index, event)}
                        onPaste={handleDigitPaste}
                        inputMode="numeric"
                        maxLength={1}
                        aria-label={`Chữ số thứ ${index + 1}`}
                        className="pin-slot"
                      />
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button type="submit" className="primary-button">
                      Xác nhận mật mã
                    </button>
                    <button type="button" onClick={clearDigits} className="ghost-button">
                      Xóa nhanh
                    </button>
                  </div>

                  <p className={`text-sm ${feedback ? 'text-rose-600' : 'text-slate-500/70'}`}>
                    {feedback || 'Mật mã gồm 6 chữ số. 2 số đầu là ngày sinh của người duy nhất được nhận lá thư này, 2 số tiếp theo là tháng sinh của người viết lá thư, và 2 số cuối cùng là điểm chung của họ'}
                  </p>
                </form>
              </div>

              <div className="story-panel rounded-[34px] p-6 sm:p-8">
                <p className="section-kicker">After the correct code</p>
                <h3 className="mt-4 font-title text-4xl leading-none text-slate-900 sm:text-5xl">
                  Một phong bì chờ được mở
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700/78">
                  {secretLetter.hint}
                </p>

                <div className="mt-8 rounded-[32px] border border-white/55 bg-white/55 p-5 shadow-[0_22px_60px_rgba(255,136,173,0.14)] backdrop-blur-xl">
                  {isLoadingLetter ? (
                    <div className="flex min-h-[360px] flex-col items-center justify-center gap-5 text-center">
                      <div className="envelope-loader" />
                      <div>
                        <p className="text-sm uppercase tracking-[0.32em] text-slate-500/70">Loading letter</p>
                        <p className="mt-3 text-lg font-semibold text-slate-900">
                          Đang gọi phong bì ra khỏi góc bí mật...
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex min-h-[360px] flex-col justify-between gap-8">
                      <div>
                        <p className="text-sm uppercase tracking-[0.32em] text-slate-500/70">Preview</p>
                      </div>

                      <div className="mx-auto w-full max-w-lg">
                        <div className="envelope-stage">
                          <div className="envelope-preview">
                            <div className="envelope-preview__flap" />
                            <div className="envelope-preview__body" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]"
            >
              <div className="story-panel rounded-[34px] p-6 sm:p-8">
                <span className="story-badge">{secretLetter.overline}</span>
                <h2 className="mt-5 font-title text-5xl leading-none text-slate-900 sm:text-6xl">
                  {secretLetter.title}
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-700/78 sm:text-lg">
                  Phong bì đã sẵn sàng. Bạn có thể nhấn trực tiếp vào nó để mở hoặc đóng lại. Nội dung lá thư bên trong đang để mặc định để bạn thay sau.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={toggleEnvelope}
                    className="primary-button"
                  >
                    {isEnvelopeOpen ? 'Đóng phong bì' : 'Mở phong bì'}
                  </button>
                  <button type="button" onClick={resetLetter} className="ghost-button">
                    Nhập passcode lại
                  </button>
                </div>

                <p className="mt-6 text-sm text-slate-500/72">
                  Passcode hiện tại: <span className="font-semibold text-slate-700">{secretPasscode}</span>
                </p>
              </div>

              <div className="story-panel rounded-[34px] p-6 sm:p-8">
                <div className="envelope-scene">
                  <div
                    role="button"
                    tabIndex={0}
                    aria-pressed={isEnvelopeOpen}
                    onClick={toggleEnvelope}
                    onKeyDown={handleEnvelopeKeyDown}
                    className={`envelope-shell ${isEnvelopeOpen ? 'is-open' : ''}`}
                  >
                    <div className="letter-sheet" onClick={(event) => event.stopPropagation()}>
                      <p className="letter-overline">{secretLetter.overline}</p>
                      <h3 className="letter-title">{secretLetter.title}</h3>
                      {secretLetter.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="letter-paragraph">
                          {paragraph}
                        </p>
                      ))}
                      <p className="letter-signature">{secretLetter.signature}</p>
                    </div>

                    <div className="envelope-back" />
                    <div className="envelope-flap" />
                    <div className="envelope-front" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SecretLetter;
