import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Award, CheckCircle2, MessageSquarePlus, ExternalLink } from 'lucide-react';
import { REVIEWS_DATA, SALON_INFO } from '../data/salonData';
import { Review } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ReviewsSectionProps {
  onOpenNewReviewModal: () => void;
  customReviews: Review[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  onOpenNewReviewModal,
  customReviews,
}) => {
  const { isDark } = useTheme();
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  const allReviews = [...customReviews, ...REVIEWS_DATA];

  const filteredReviews = allReviews.filter((rev) => {
    if (filterRating === 'all') return true;
    return rev.rating === filterRating;
  });

  return (
    <section
      id="reviews"
      className={`py-16 lg:py-24 border-b transition-colors scroll-mt-16 ${
        isDark ? 'bg-[#0c0c10] border-[#27272A] text-white' : 'bg-[#FFF0F3]/30 border-[#FCE7F3] text-[#18181B]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-neutral-500/20"
        >
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase font-bold tracking-widest mb-1.5">
              <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#FB7185]' : 'bg-[#FB7185]'}`} />
              <span className={isDark ? 'text-[#A1A1AA]' : 'text-[#64748B]'}>отзывы гостей</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight lowercase">
              впечатления{' '}
              <span className={isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}>
                клиентов
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenNewReviewModal}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm ${
                isDark
                  ? 'bg-[#FB7185] text-white hover:bg-[#F43F5E] shadow-[#FB7185]/20'
                  : 'bg-[#18181B] text-white hover:bg-[#FB7185]'
              }`}
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Оставить отзыв</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Big Rating Summary Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className={`rounded-2xl p-6 sm:p-8 border mb-10 transition-colors ${
            isDark ? 'bg-[#121217] border-[#27272A]' : 'bg-white border-[#FCE7F3] shadow-xs'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Score box */}
            <div className="md:col-span-4 flex items-center gap-4">
              <div
                className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-display font-extrabold shrink-0 ${
                  isDark ? 'bg-[#181822] text-[#FB7185] border border-[#27272A]' : 'bg-[#FFF0F3] text-[#FB7185]'
                }`}
              >
                <span className="text-3xl leading-none">4.8</span>
                <span className="text-[10px] uppercase font-bold tracking-wider mt-1 text-neutral-400">из 5.0</span>
              </div>

              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <div className="font-display font-bold text-sm mt-1">
                  Яндекс Карты Воронеж
                </div>
                <a
                  href={SALON_INFO.yandexMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[11px] underline flex items-center gap-1 mt-0.5 ${
                    isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-[#18181B]'
                  }`}
                >
                  <span>55 проверенных отзывов на Картах</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Micro Highlights directly from Yandex rating analysis */}
            <div className={`md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 ${
              isDark ? 'border-[#27272A] text-neutral-300' : 'border-[#FCE7F3] text-neutral-700'
            }`}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}`} />
                <span>Персонал: 90% положительных отзывов (43+)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}`} />
                <span>Компетентность: 89% рекомендаций</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}`} />
                <span>Точное попадание в блонд & сложные окрашивания</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}`} />
                <span>Знак «Хорошее место» от Яндекс Карт</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Rating Filter Tabs */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setFilterRating('all')}
              className={`px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                filterRating === 'all'
                  ? isDark ? 'bg-[#FB7185] text-white' : 'bg-[#18181B] text-white'
                  : isDark ? 'bg-[#121217] text-neutral-400 border border-[#27272A]' : 'bg-white text-neutral-600 border border-[#FCE7F3]'
              }`}
            >
              Все ({allReviews.length})
            </button>
            <button
              onClick={() => setFilterRating(5)}
              className={`px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1 ${
                filterRating === 5
                  ? isDark ? 'bg-[#FB7185] text-white' : 'bg-[#18181B] text-white'
                  : isDark ? 'bg-[#121217] text-neutral-400 border border-[#27272A]' : 'bg-white text-neutral-600 border border-[#FCE7F3]'
              }`}
            >
              <span>5 звезд</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </button>
          </div>
          <span className="text-xs text-neutral-400">
            {filteredReviews.length} {filteredReviews.length === 1 ? 'отзыв' : 'отзывов'}
          </span>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReviews.map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.4,
                delay: (index % 3) * 0.08,
                ease: 'easeOut',
              }}
              className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                isDark
                  ? 'bg-[#121217] border-[#27272A] hover:border-[#FB7185]/60 hover:shadow-[0_12px_28px_rgba(251,113,133,0.15)]'
                  : 'bg-white border-[#FCE7F3] shadow-xs hover:border-[#FB7185]/60 hover:shadow-[0_12px_24px_rgba(251,113,133,0.1)]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        isDark ? 'bg-[#181822] text-[#FB7185]' : 'bg-[#FFF0F3] text-[#FB7185]'
                      }`}
                    >
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-display text-xs font-bold flex items-center gap-1">
                        <span>{rev.author}</span>
                        {rev.verified && (
                          <CheckCircle2 className={`w-3 h-3 ${isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}`} />
                        )}
                      </div>
                      <span className="text-[10px] text-neutral-400">{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>

                {rev.service && (
                  <div className="mb-2">
                    <span className={`px-2 py-0.5 text-[10px] font-medium rounded ${
                      isDark ? 'bg-[#181820] text-neutral-300' : 'bg-[#FFF8F9] text-neutral-600'
                    }`}>
                      {rev.service}
                    </span>
                  </div>
                )}

                <p className={`text-xs leading-relaxed ${
                  isDark ? 'text-neutral-300' : 'text-neutral-600'
                }`}>
                  «{rev.text}»
                </p>
              </div>

              <div className={`pt-3 mt-3 border-t text-[10px] flex items-center justify-between ${
                isDark ? 'border-[#27272A] text-neutral-500' : 'border-[#FCE7F3] text-neutral-400'
              }`}>
                <span>{rev.source === 'yandex' ? 'Яндекс Карты' : 'Сайт салона «Тэфи»'}</span>
                <span>Проверенный визит ✓</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
