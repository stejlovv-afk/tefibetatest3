import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Send, MessageCircle, Navigation, CheckCircle2, Car, ExternalLink } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { useTheme } from '../context/ThemeContext';

export const ContactsSection: React.FC = () => {
  const { isDark } = useTheme();
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackSent, setCallbackSent] = useState(false);

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone.trim()) return;
    setCallbackSent(true);
  };

  return (
    <section
      id="contacts"
      className={`py-16 lg:py-24 border-t transition-colors scroll-mt-16 ${
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
              <span className={isDark ? 'text-[#A1A1AA]' : 'text-[#64748B]'}>контакты & локация</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight lowercase">
              как нас{' '}
              <span className={isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}>
                найти
              </span>
            </h2>
          </div>

          <p className={`text-xs sm:text-sm max-w-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Северный микрорайон Воронежа, ул. Владимира Невского, 35. Бесплатная парковка перед входом.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Details & Callback */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-4"
          >
            
            {/* Address */}
            <div className={`p-5 rounded-2xl border ${
              isDark ? 'bg-[#121217] border-[#27272A]' : 'bg-white border-[#FCE7F3] shadow-xs'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-[#181822] text-[#FB7185]' : 'bg-[#FFF0F3] text-[#FB7185]'
                }`}>
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold">
                    ул. Владимира Невского, 35
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Коминтерновский район • ориентир ТЦ «Соборный»
                  </p>
                  <a
                    href={SALON_INFO.yandexMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-xs font-semibold underline mt-2 ${
                      isDark ? 'text-[#FB7185] hover:text-white' : 'text-[#FB7185] hover:text-[#18181B]'
                    }`}
                  >
                    <span>Открыть на Яндекс Картах</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Phones & Messengers */}
            <div className={`p-5 rounded-2xl border ${
              isDark ? 'bg-[#121217] border-[#27272A]' : 'bg-white border-[#FCE7F3] shadow-xs'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-[#181822] text-[#FB7185]' : 'bg-[#FFF0F3] text-[#FB7185]'
                }`}>
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-sm font-bold">Телефоны для связи</h3>
                  <div className="mt-1.5 space-y-1 text-xs">
                    <div>
                      <a
                        href={`tel:${SALON_INFO.phoneCityClean}`}
                        className={`font-bold ${isDark ? 'text-white hover:text-[#FB7185]' : 'text-[#18181B] hover:text-[#FB7185]'}`}
                      >
                        {SALON_INFO.phoneCity}
                      </a>
                      <span className="text-[11px] text-neutral-400 ml-1.5">(городской)</span>
                    </div>
                    <div>
                      <a
                        href={`tel:${SALON_INFO.phoneMobileClean}`}
                        className={`font-bold ${isDark ? 'text-white hover:text-[#FB7185]' : 'text-[#18181B] hover:text-[#FB7185]'}`}
                      >
                        {SALON_INFO.phoneMobile}
                      </a>
                      <span className="text-[11px] text-neutral-400 ml-1.5">(мобильный / WhatsApp)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-neutral-500/20">
                    <a
                      href={SALON_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={SALON_INFO.telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#2AABEE] hover:bg-[#229ED9] text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Telegram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className={`p-5 rounded-2xl border ${
              isDark ? 'bg-[#121217] border-[#27272A]' : 'bg-white border-[#FCE7F3] shadow-xs'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-[#181822] text-[#FB7185]' : 'bg-[#FFF0F3] text-[#FB7185]'
                }`}>
                  <Clock className="w-4 h-4" />
                </div>
                <div className="w-full text-xs">
                  <h3 className="font-display text-sm font-bold">Часы работы</h3>
                  <div className="mt-1.5 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Пн — Пт:</span>
                      <strong>{SALON_INFO.workingHours.weekdays}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Сб — Вс:</span>
                      <strong>{SALON_INFO.workingHours.weekends}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Callback */}
            <div className={`p-5 rounded-2xl border ${
              isDark ? 'bg-[#121217] border-[#27272A]' : 'bg-white border-[#FCE7F3] shadow-xs'
            }`}>
              <h4 className="font-display text-sm font-bold mb-1">
                Быстрый обратный звонок
              </h4>
              <p className="text-xs text-neutral-400 mb-3">
                Перезвоним за 5-10 минут в рабочее время салона.
              </p>

              {callbackSent ? (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Спасибо! Администратор скоро перезвонит вам.</span>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-2.5">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={callbackName}
                    onChange={(e) => setCallbackName(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border outline-none min-h-[44px] transition-colors ${
                      isDark
                        ? 'bg-[#181820] border-[#27272A] text-white focus:border-[#FB7185]'
                        : 'bg-[#FFF8F9] border-[#FCE7F3] text-[#18181B] focus:border-[#FB7185]'
                    }`}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border outline-none min-h-[44px] transition-colors ${
                      isDark
                        ? 'bg-[#181820] border-[#27272A] text-white focus:border-[#FB7185]'
                        : 'bg-[#FFF8F9] border-[#FCE7F3] text-[#18181B] focus:border-[#FB7185]'
                    }`}
                    required
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer min-h-[44px] bg-[#FB7185] text-white shadow-lg shadow-[#FB7185]/25 hover:bg-[#F43F5E]"
                  >
                    Заказать звонок
                  </motion.button>
                </form>
              )}
            </div>

          </motion.div>

          {/* Right Column: Embedded Yandex Map */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className={`p-2 rounded-2xl border flex-1 flex flex-col min-h-[440px] ${
              isDark ? 'bg-[#121217] border-[#27272A]' : 'bg-white border-[#FCE7F3] shadow-xs'
            }`}>
              <div className="relative w-full flex-1 rounded-xl overflow-hidden min-h-[400px]">
                <iframe
                  title="Карта расположения салона Тэфи на Владимира Невского, 35"
                  src="https://yandex.ru/map-widget/v1/?orgpage%5Bid%5D=1171695567&ll=39.155700%2C51.710700&z=16"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen={true}
                  className="w-full h-full min-h-[400px]"
                />
              </div>

              <div className="p-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>Бесплатные парковочные места прямо перед фасадом салона</span>
                </div>
                <a
                  href={SALON_INFO.yandexMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-semibold underline ${
                    isDark ? 'text-[#FB7185] hover:text-white' : 'text-[#FB7185] hover:text-[#18181B]'
                  }`}
                >
                  Маршрут в Яндекс Картах →
                </a>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
