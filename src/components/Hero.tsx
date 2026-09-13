import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowDown, Sparkles, Star, ShieldCheck, Clock, Layers } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { useTheme } from '../context/ThemeContext';
import { SafeImage } from './SafeImage';
import { scrollToSection, goToServicesCategory } from '../utils/navigation';
import heroInteriorImg from '../assets/images/regenerated_image_1789297006071.jpg';

interface HeroProps {
  onOpenBooking: (serviceId?: string) => void;
  onExplorePortfolio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExplorePortfolio }) => {
  const { isDark } = useTheme();
  const [quickService, setQuickService] = useState('hair-cut-women-short');

  return (
    <section
      id="hero"
      className={`relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 transition-colors ${
        isDark ? 'bg-[#09090b] text-[#F4F4F5]' : 'bg-[#FFF8F9] text-[#18181B]'
      }`}
    >
      {/* Background Graphic Accents inspired by screenshot */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Subtle radial ambient animated glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.18, 0.28, 0.18],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl ${
            isDark ? 'bg-[#FB7185]/20' : 'bg-[#FB7185]/25'
          }`}
        />

        {/* Vertical Graphic Stripe cutting down on the right */}
        <div
          className={`hidden lg:block absolute top-0 bottom-0 right-[18%] w-5 ${
            isDark ? 'bg-[#FB7185]' : 'bg-[#FB7185]'
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Grid: Editorial Minimalist Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Bold Typography & Minimalist Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-7 text-left relative"
          >
            {/* Left micro index indicator matching the screenshot (● ○ ○ ○  01 — 05) */}
            <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono tracking-widest uppercase">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#FB7185]' : 'bg-[#FB7185]'}`} />
                <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-neutral-700' : 'bg-neutral-300'}`} />
                <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-neutral-700' : 'bg-neutral-300'}`} />
                <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-neutral-700' : 'bg-neutral-300'}`} />
              </div>
              <span className={isDark ? 'text-neutral-500' : 'text-neutral-400'}>
                01 — 05
              </span>
              <span className={isDark ? 'text-neutral-600' : 'text-neutral-300'}>/</span>
              <span className={`text-[10px] uppercase font-bold tracking-widest ${
                isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'
              }`}>
                салон красоты «тэфи»
              </span>
            </div>

            {/* Giant Minimal Headline (similar to "lol minimal") */}
            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.02] lowercase">
                чистая <br />
                <span className={isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}>
                  эстетика
                </span> <br />
                стиля.
              </h1>
              <p className={`text-sm sm:text-base max-w-md font-normal leading-relaxed ${
                isDark ? 'text-[#A1A1AA]' : 'text-[#4B5563]'
              }`}>
                Пространство в Воронеже для тех, кто ценит чистоту линий, идеальный блонд, безопасный аппаратный маникюр и бережную косметологию. Без компромиссов.
              </p>
            </div>

            {/* Action Box with arrow */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onOpenBooking(quickService)}
                className={`group flex items-center justify-between sm:justify-start gap-4 px-6 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest border transition-all duration-300 cursor-pointer min-h-[48px] ${
                  isDark
                    ? 'border-[#FB7185] bg-[#FB7185] text-white hover:bg-[#F43F5E] hover:border-[#F43F5E] shadow-lg shadow-[#FB7185]/25'
                    : 'border-[#18181B] bg-[#18181B] text-white hover:bg-[#FB7185] hover:border-[#FB7185] shadow-md'
                }`}
              >
                <span>Записаться на прием</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('services')}
                className={`px-5 py-4 text-xs font-semibold uppercase tracking-wider border transition-colors cursor-pointer text-center min-h-[48px] flex items-center justify-center ${
                  isDark
                    ? 'border-[#27272A] text-[#A1A1AA] hover:text-white hover:border-[#FB7185] bg-[#121216]'
                    : 'border-[#FCE7F3] text-[#4B5563] hover:text-[#18181B] hover:border-[#FB7185] bg-white'
                }`}
              >
                Смотреть услуги & цены
              </motion.button>
            </div>

            {/* Quick Quick-Select Dropdown for Instant Booking */}
            <div className={`p-4 rounded-xl border max-w-md transition-colors ${
              isDark
                ? 'bg-[#121217] border-[#27272A]'
                : 'bg-white border-[#FCE7F3] shadow-xs'
            }`}>
              <div className="text-[10px] uppercase font-bold tracking-wider mb-2 flex items-center justify-between">
                <span className={isDark ? 'text-neutral-400' : 'text-neutral-500'}>
                  Быстрый выбор процедуры:
                </span>
                <button
                  type="button"
                  onClick={() => scrollToSection('services')}
                  className="text-[10px] font-bold text-[#FB7185] hover:underline cursor-pointer"
                >
                  Все услуги в каталоге →
                </button>
              </div>
              <div className="flex gap-2">
                <select
                  value={quickService}
                  onChange={(e) => setQuickService(e.target.value)}
                  className={`w-full px-3 py-2 text-xs font-medium rounded-lg border outline-none cursor-pointer ${
                    isDark
                      ? 'bg-[#181820] text-white border-[#27272A] focus:border-[#FB7185]'
                      : 'bg-[#FFF8F9] text-[#18181B] border-[#FCE7F3] focus:border-[#FB7185]'
                  }`}
                >
                  <option value="hair-cut-women-short">Стрижка женская (короткие волосы) — 800 ₽</option>
                  <option value="hair-cut-men">Стрижка мужская (модельная) — 800 ₽</option>
                  <option value="laser-epilation-5-zones">Лазерная эпиляция (5 зон на выбор) — 5 000 ₽</option>
                  <option value="nail-manicure-gel-short">Маникюр с покрытием гель-лака (короткие ногти) — 1 900 ₽</option>
                  <option value="nail-pedicure-gel">Педикюр с покрытием гель-лака — 2 200 ₽</option>
                  <option value="brow-correction-color">Коррекция бровей с окрашиванием — 1 000 ₽</option>
                  <option value="lash-lamination">Ламинирование ресниц — 2 000 ₽</option>
                  <option value="permanent-makeup-zone">Перманент (любая зона) — 5 000 ₽</option>
                  <option value="hair-cut-women-medium">Стрижка женская (до лопаток) — 1 500 ₽</option>
                  <option value="hair-cut-women-long">Стрижка женская (ниже лопаток) — 2 000 ₽</option>
                </select>
                <button
                  onClick={() => onOpenBooking(quickService)}
                  className={`px-3 py-2 text-xs font-bold rounded-lg shrink-0 transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-[#FB7185] text-white hover:bg-[#F43F5E]'
                      : 'bg-[#FB7185] text-white hover:bg-[#F43F5E]'
                  }`}
                >
                  Записаться
                </button>
              </div>
            </div>

            {/* Minimal Stat Dots */}
            <div className={`pt-2 grid grid-cols-3 gap-4 max-w-md border-t text-xs ${
              isDark ? 'border-[#27272A] text-neutral-400' : 'border-[#FCE7F3] text-neutral-600'
            }`}>
              <div>
                <div className={`font-display text-xl font-extrabold ${isDark ? 'text-white' : 'text-[#18181B]'}`}>
                  4.8 ★
                </div>
                <div className="text-[10px] mt-0.5">Яндекс Карты</div>
              </div>
              <div>
                <div className={`font-display text-xl font-extrabold ${isDark ? 'text-white' : 'text-[#18181B]'}`}>
                  55
                </div>
                <div className="text-[10px] mt-0.5">отзывов на Яндексе</div>
              </div>
              <div>
                <div className={`font-display text-xl font-extrabold ${isDark ? 'text-white' : 'text-[#18181B]'}`}>
                  100%
                </div>
                <div className="text-[10px] mt-0.5">СанПиН стерилизация</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Frame with Organic Cutout & Yellow Accent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Organic Pebble Shape Accent (like in the screenshot behind the photo) */}
              <div
                className={`absolute -top-6 -left-6 w-36 h-36 rounded-full transition-transform duration-700 pointer-events-none z-0 ${
                  isDark ? 'bg-[#1C1C24]' : 'bg-[#FFE4E6]'
                }`}
                style={{ borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%' }}
              />

              {/* Accent Circle safely behind card in top-right, away from any text */}
              <div
                className={`absolute -top-4 -right-4 w-20 h-20 rounded-full z-0 pointer-events-none transition-colors opacity-80 ${
                  isDark ? 'bg-[#FB7185]/40' : 'bg-[#FB7185]/30'
                }`}
              />

              {/* Main Photo Card Frame */}
              <div className={`relative z-10 overflow-hidden border-2 transition-all duration-300 aspect-[16/11] lg:aspect-[4/3] ${
                isDark
                  ? 'bg-[#141419] border-[#27272A] shadow-2xl'
                  : 'bg-white border-[#FCE7F3] shadow-xl'
              }`}>
                <SafeImage
                  src={heroInteriorImg}
                  fallbackSrc="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200"
                  alt="Интерьер салона Тэфи на Владимира Невского, 35"
                  className="w-full h-full object-cover grayscale-15 hover:grayscale-0 transition-all duration-500"
                />

                {/* Minimal Corner Labels */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1">
                  ул. владимира невского, 35
                </div>

                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#FB7185]' : 'bg-[#FB7185]'}`} />
                  <span>открыто 09:00 — 20:00</span>
                </div>
              </div>

              {/* Minimal Floating Info Box */}
              <div className={`mt-4 p-4 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                isDark
                  ? 'bg-[#121217] border-[#27272A] text-[#A1A1AA]'
                  : 'bg-white border-[#FCE7F3] text-[#4B5563] shadow-xs'
              }`}>
                <div className="flex items-center gap-2">
                  <ShieldCheck className={`w-4 h-4 ${isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}`} />
                  <span className="font-semibold text-xs">Медицинская стерилизация крафт-пакетов</span>
                </div>
                <button
                  onClick={() => scrollToSection('portfolio')}
                  className={`font-bold tracking-wide uppercase text-[11px] underline underline-offset-4 cursor-pointer ${
                    isDark ? 'text-white hover:text-[#FB7185]' : 'text-[#18181B] hover:text-[#FB7185]'
                  }`}
                >
                  Портфолио →
                </button>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Editorial Scroll Prompt & Interactive Category Rails */}
        <div className="mt-14 pt-6 flex flex-col md:flex-row items-center justify-between border-t border-white/10 text-xs gap-4">
          <div className="flex items-center gap-3">
            {/* Scroll Down Arrow matching the design */}
            <button
              onClick={() => scrollToSection('services')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                isDark
                  ? 'border-[#27272A] text-white hover:border-[#FB7185] hover:text-[#FB7185] bg-[#121217]'
                  : 'border-[#FCE7F3] text-[#18181B] hover:border-[#FB7185] hover:text-[#FB7185] bg-white'
              }`}
              aria-label="Вниз к услугам"
            >
              <ArrowDown className="w-3.5 h-3.5 text-[#FB7185] animate-bounce" />
              <span className="text-[11px] font-medium">К каталогу услуг</span>
            </button>
            <span className={`text-[11px] hidden sm:inline ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Нажмите на категорию для мгновенного перехода:
            </span>
          </div>

          {/* Interactive quick category chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px]">
            <button
              onClick={() => goToServicesCategory('hair')}
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                isDark
                  ? 'border-[#27272A] bg-[#14141c] text-neutral-300 hover:text-white hover:border-[#FB7185]'
                  : 'border-[#FCE7F3] bg-white text-neutral-700 hover:text-[#FB7185] hover:border-[#FB7185]'
              }`}
            >
              Стрижки & Цвет
            </button>
            <span className="text-neutral-400 opacity-40">•</span>
            <button
              onClick={() => goToServicesCategory('nails')}
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                isDark
                  ? 'border-[#27272A] bg-[#14141c] text-neutral-300 hover:text-white hover:border-[#FB7185]'
                  : 'border-[#FCE7F3] bg-white text-neutral-700 hover:text-[#FB7185] hover:border-[#FB7185]'
              }`}
            >
              Маникюр & Педикюр
            </button>
            <span className="text-neutral-400 opacity-40">•</span>
            <button
              onClick={() => goToServicesCategory('brows-lashes')}
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                isDark
                  ? 'border-[#27272A] bg-[#14141c] text-neutral-300 hover:text-white hover:border-[#FB7185]'
                  : 'border-[#FCE7F3] bg-white text-neutral-700 hover:text-[#FB7185] hover:border-[#FB7185]'
              }`}
            >
              Брови & Ресницы
            </button>
            <span className="text-neutral-400 opacity-40">•</span>
            <button
              onClick={() => goToServicesCategory('cosmetology')}
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                isDark
                  ? 'border-[#27272A] bg-[#14141c] text-neutral-300 hover:text-white hover:border-[#FB7185]'
                  : 'border-[#FCE7F3] bg-white text-neutral-700 hover:text-[#FB7185] hover:border-[#FB7185]'
              }`}
            >
              Косметология & Лазер
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
