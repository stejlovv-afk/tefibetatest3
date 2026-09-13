import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, Dog, Wifi, CreditCard, Award, HeartHandshake, CheckCircle2, Clock, ArrowRight, UserCheck, Star, Sparkle, Scissors } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { useTheme } from '../context/ThemeContext';
import { SafeImage } from './SafeImage';
import { scrollToSection } from '../utils/navigation';
import aboutProcessImg from '../assets/images/regenerated_image_1789297219850.jpg';
import aboutInteriorImg from '../assets/images/regenerated_image_1789297221061.jpg';
import aboutMasteryImg from '../assets/images/regenerated_image_1789297222207.jpg';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  const { isDark } = useTheme();

  return (
    <section
      id="about"
      className={`py-16 lg:py-24 border-b transition-colors scroll-mt-16 ${
        isDark ? 'bg-[#09090b] border-[#27272A] text-white' : 'bg-[#FFF8F9] border-[#FCE7F3] text-[#18181B]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Intro */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16 pb-12 border-b border-neutral-500/20"
        >
          <div className="lg:col-span-6 space-y-4 text-left">
            <div className="flex items-center gap-2 text-[11px] uppercase font-bold tracking-widest mb-1">
              <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#FB7185]' : 'bg-[#FB7185]'}`} />
              <span className={isDark ? 'text-[#A1A1AA]' : 'text-[#64748B]'}>о нас & стандарты</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight lowercase">
              атмосфера{' '}
              <span className={isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}>
                заботы
              </span>
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
              «Тэфи» на ул. Владимира Невского, 35 — это современная бьюти-студия в Северном районе Воронежа. Мы объединяем колористику высокой точности, бережный маникюр и искреннее внимание к деталям.
            </p>

            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}`} />
                <span>Сертифицированные мастера</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}`} />
                <span>Премиальная косметика</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}`} />
                <span>Стерилизация медицинского уровня</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}`} />
                <span>Pet-friendly (до 35 см)</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className={`inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                  isDark
                    ? 'bg-[#FB7185] text-white hover:bg-[#F43F5E]'
                    : 'bg-[#18181B] text-white hover:bg-[#FB7185]'
                }`}
              >
                <span>Выбрать время визита</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Visual Pair */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <SafeImage
                src={aboutProcessImg}
                fallbackSrc="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=600"
                alt="Процесс в салоне"
                className="rounded-2xl object-cover aspect-[4/5] w-full border border-neutral-700/30"
              />
              <div className={`p-4 rounded-2xl border ${
                isDark ? 'bg-[#121217] border-[#27272A]' : 'bg-white border-[#FCE7F3]'
              }`}>
                <div className={`font-display text-xl font-extrabold ${isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}`}>
                  4.8 ★
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">
                  Рейтинг доверия гостей Воронежа
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className={`p-4 rounded-2xl border ${
                isDark ? 'bg-[#181822] border-[#27272A]' : 'bg-white border-[#FCE7F3]'
              }`}>
                <Award className={`w-5 h-5 mb-1 ${isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}`} />
                <div className="font-display text-sm font-bold">«Хорошее место»</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">
                  Знак признания от Яндекс Карт
                </div>
              </div>

              <SafeImage
                src={aboutInteriorImg}
                fallbackSrc="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600"
                alt="Интерьер Тэфи"
                className="rounded-2xl object-cover aspect-[4/5] w-full border border-neutral-700/30"
              />
            </div>
          </div>
        </motion.div>

        {/* 6 Minimalist Comfort Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-16"
        >
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold lowercase">
              стандарты сервиса
            </h3>
            <p className={`text-xs sm:text-sm mt-1.5 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Прозрачность, стерильность и максимальный комфорт в каждой процедуре.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className={`p-5 rounded-2xl border ${
              isDark ? 'bg-[#121217] border-[#27272A]' : 'bg-white border-[#FCE7F3] shadow-xs'
            }`}>
              <ShieldCheck className={`w-6 h-6 mb-2.5 ${isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}`} />
              <h4 className="font-display text-sm font-bold">Стерилизация по СанПиН</h4>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                3-этапная дезинфекция и сухой жар. Индивидуальный крафт-пакет вскрывается исключительно при вас.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border ${
              isDark ? 'bg-[#121217] border-[#27272A]' : 'bg-white border-[#FCE7F3] shadow-xs'
            }`}>
              <Dog className={`w-6 h-6 mb-2.5 ${isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}`} />
              <h4 className="font-display text-sm font-bold">Pet-friendly</h4>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Рады гостям с маленькими питомцами декоративных пород (до 35 см). Всегда есть чистая вода.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border ${
              isDark ? 'bg-[#121217] border-[#27272A]' : 'bg-white border-[#FCE7F3] shadow-xs'
            }`}>
              <Wifi className={`w-6 h-6 mb-2.5 ${isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}`} />
              <h4 className="font-display text-sm font-bold">Wi-Fi & комфорт</h4>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Высокоскоростной интернет для гостей и уютная, расслабляющая обстановка студии.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border ${
              isDark ? 'bg-[#121217] border-[#27272A]' : 'bg-white border-[#FCE7F3] shadow-xs'
            }`}>
              <Sparkles className={`w-6 h-6 mb-2.5 ${isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}`} />
              <h4 className="font-display text-sm font-bold">Премиальная косметика</h4>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Сертифицированные профессиональные составы премиум-класса без агрессивных компонентов.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border ${
              isDark ? 'bg-[#121217] border-[#27272A]' : 'bg-white border-[#FCE7F3] shadow-xs'
            }`}>
              <CreditCard className={`w-6 h-6 mb-2.5 ${isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}`} />
              <h4 className="font-display text-sm font-bold">Удобная оплата</h4>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Банковские карты, QR СБП, наличные и возможность оплаты долями без процентов.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border ${
              isDark ? 'bg-[#121217] border-[#27272A]' : 'bg-white border-[#FCE7F3] shadow-xs'
            }`}>
              <HeartHandshake className={`w-6 h-6 mb-2.5 ${isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}`} />
              <h4 className="font-display text-sm font-bold">Бесплатная парковка</h4>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Удобный подъезд с ул. Владимира Невского и свободные парковочные места перед салоном.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mastery Standards & Free Master Booking Block */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`rounded-3xl p-6 sm:p-8 lg:p-10 border transition-all ${
            isDark
              ? 'bg-[#121217] border-[#27272A] shadow-[0_12px_32px_rgba(0,0,0,0.5)]'
              : 'bg-white border-[#FCE7F3] shadow-md shadow-[#FCE7F3]/50'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FB7185]/15 text-[#FB7185]">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Гарантия мастерства салона</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                Запись к <span className="text-[#FB7185]">свободному мастеру</span> в удобное время
              </h3>

              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                В салоне «Тэфи» каждый специалист проходит строгий квалификационный отбор. Выбрав удобное время, вы автоматически попадаете к мастеру нужного профиля со стажем от 5 лет.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`p-3.5 rounded-2xl border ${
                    isDark ? 'bg-[#181820] border-[#27272A]' : 'bg-[#FFF8F9] border-[#FCE7F3]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-[#FB7185] fill-[#FB7185]" />
                    <span className="font-bold text-xs">Стаж мастеров от 5 лет</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Регулярные курсы повышения квалификации в Москве и Санкт-Петербурге.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`p-3.5 rounded-2xl border ${
                    isDark ? 'bg-[#181820] border-[#27272A]' : 'bg-[#FFF8F9] border-[#FCE7F3]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-4 h-4 text-[#FB7185]" />
                    <span className="font-bold text-xs">Гарантия на покрытие 7 дней</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Бесплатная коррекция при любых непредвиденных сколах без лишних вопросов.
                  </p>
                </motion.div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenBooking}
                  className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                    isDark
                      ? 'bg-[#FB7185] text-white hover:bg-[#F43F5E] shadow-[#FB7185]/20'
                      : 'bg-[#18181B] text-white hover:bg-[#FB7185]'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Записаться к свободному мастеру</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToSection('services')}
                  className={`px-5 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isDark
                      ? 'border-[#27272A] bg-[#181820] text-neutral-200 hover:text-white hover:border-[#FB7185]'
                      : 'border-[#FCE7F3] bg-white text-neutral-800 hover:text-[#FB7185] hover:border-[#FB7185]'
                  }`}
                >
                  <Scissors className="w-4 h-4 text-[#FB7185]" />
                  <span>Каталог услуг и цен</span>
                </motion.button>
              </div>

              <div className="flex items-center gap-2 text-xs text-neutral-400 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#FB7185]" />
                <span>Ближайшие окна доступны сегодня</span>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm">
                <SafeImage
                  src={aboutMasteryImg}
                  fallbackSrc="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=700"
                  alt="Рабочая атмосфера салона Тэфи"
                  className="rounded-2xl object-cover aspect-[4/3] w-full border border-neutral-700/30 shadow-xl"
                />
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className={`absolute -bottom-4 -left-4 p-3.5 rounded-2xl border shadow-xl flex items-center gap-3 ${
                    isDark ? 'bg-[#181822] border-[#27272A]' : 'bg-white border-[#FCE7F3]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#FB7185]/20 text-[#FB7185] flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs">«Хорошее место»</div>
                    <div className="text-[10px] text-neutral-400">Яндекс Карты 2024–2025</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
