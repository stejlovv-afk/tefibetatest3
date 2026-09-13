import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, CheckCircle2 } from 'lucide-react';
import { Review } from '../types';
import { useTheme } from '../context/ThemeContext';

interface NewReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Review) => void;
}

export const NewReviewModal: React.FC<NewReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  const { isDark } = useTheme();
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [service, setService] = useState('');
  const [text, setText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;

    const newRev: Review = {
      id: 'rev-user-' + Date.now(),
      author: author.trim(),
      date: 'Сегодня',
      rating,
      source: 'site',
      text: text.trim(),
      service: service.trim() || undefined,
      verified: true,
      avatarColor: 'bg-[#FB7185] text-white',
    };

    onSubmitReview(newRev);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setAuthor('');
      setText('');
      setService('');
      setRating(5);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`rounded-2xl max-w-md w-full overflow-hidden border relative text-left my-6 flex flex-col shadow-2xl transition-colors ${
              isDark ? 'bg-[#121217] border-[#27272A] text-white' : 'bg-white border-[#FCE7F3] text-[#18181B]'
            }`}
          >
            {/* Header */}
            <div className={`px-5 py-4 border-b flex items-center justify-between ${
              isDark ? 'bg-[#181820] border-[#27272A]' : 'bg-[#FFF8F9] border-[#FCE7F3]'
            }`}>
              <div>
                <h3 className="font-display text-base font-bold flex items-center gap-2">
                  <span>Оставить отзыв о салоне «Тэфи»</span>
                  <span className="w-2 h-2 rounded-full bg-[#FB7185]" />
                </h3>
                <p className="text-xs text-neutral-400">ул. Владимира Невского, 35</p>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center space-y-3"
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto bg-[#FB7185] text-white shadow-lg shadow-[#FB7185]/30">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-display text-lg font-bold">
                  Спасибо за ваш отзыв!
                </h4>
                <p className="text-xs text-neutral-400">
                  Ваш отзыв опубликован на сайте салона «Тэфи».
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                {/* Rating Stars */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Оценка работы мастеров салона:
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const filled = hoverRating ? star <= hoverRating : star <= rating;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          className="p-1.5 text-amber-400 cursor-pointer transition-transform active:scale-90"
                        >
                          <Star
                            className={`w-7 h-7 ${filled ? 'fill-amber-400 text-amber-400' : 'stroke-neutral-500 fill-none'}`}
                          />
                        </button>
                      );
                    })}
                    <span className="ml-2 text-xs font-bold text-[#FB7185]">
                      {rating} из 5
                    </span>
                  </div>
                </div>

                {/* Author */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Например: Екатерина"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border outline-none min-h-[44px] transition-colors ${
                      isDark
                        ? 'bg-[#181820] border-[#27272A] text-white focus:border-[#FB7185]'
                        : 'bg-[#FFF8F9] border-[#FCE7F3] text-[#18181B] focus:border-[#FB7185]'
                    }`}
                  />
                </div>

                {/* Service */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Процедура
                  </label>
                  <input
                    type="text"
                    placeholder="Стрижка, Маникюр, Лазерная эпиляция..."
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border outline-none min-h-[44px] transition-colors ${
                      isDark
                        ? 'bg-[#181820] border-[#27272A] text-white focus:border-[#FB7185]'
                        : 'bg-[#FFF8F9] border-[#FCE7F3] text-[#18181B] focus:border-[#FB7185]'
                    }`}
                  />
                </div>

                {/* Text */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Текст отзыва *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Поделитесь вашими впечатлениями от визита в «Тэфи»..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border outline-none transition-colors ${
                      isDark
                        ? 'bg-[#181820] border-[#27272A] text-white focus:border-[#FB7185]'
                        : 'bg-[#FFF8F9] border-[#FCE7F3] text-[#18181B] focus:border-[#FB7185]'
                    }`}
                  />
                </div>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer min-h-[44px] bg-[#FB7185] text-white shadow-lg shadow-[#FB7185]/25 hover:bg-[#F43F5E]"
                  >
                    Опубликовать отзыв
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
