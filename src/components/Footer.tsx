import React from 'react';
import { MapPin, Phone, Clock, Star, Dog, ArrowUp } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { useTheme } from '../context/ThemeContext';
import { TefiLogo } from './TefiLogo';
import { scrollToSection, goToServicesCategory } from '../utils/navigation';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenMyBookings: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenMyBookings }) => {
  const { isDark } = useTheme();

  return (
    <footer
      className={`pt-12 pb-24 lg:pb-12 border-t transition-colors ${
        isDark
          ? 'bg-[#09090b] text-neutral-400 border-[#27272A]'
          : 'bg-[#FFF8F9] text-neutral-600 border-[#FCE7F3]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-neutral-500/20">
          
          {/* Brand */}
          <div className="lg:col-span-5 space-y-3 text-left">
            <div className="mb-2">
              <button
                onClick={() => scrollToSection('top')}
                className="cursor-pointer text-left bg-transparent border-0 p-0"
                aria-label="Наверх страницы"
              >
                <TefiLogo size="lg" isDark={isDark} showSubtitle={true} />
              </button>
            </div>

            <p className="text-xs max-w-sm leading-relaxed">
              ул. Владимира Невского, 35, Воронеж. Модельные стрижки, ногтевой сервис, оформление взгляда, перманент и диодная лазерная эпиляция.
            </p>

            <div className="flex items-center gap-2 pt-1 text-[11px]">
              <a
                href={SALON_INFO.yandexMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border ${
                  isDark ? 'bg-[#121217] border-[#27272A] text-white' : 'bg-white border-[#FCE7F3] text-neutral-700'
                }`}
              >
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>4.8 на Яндекс Картах</span>
              </a>

              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border ${
                isDark ? 'bg-[#121217] border-[#27272A] text-neutral-300' : 'bg-white border-[#FCE7F3] text-neutral-700'
              }`}>
                <Dog className="w-3 h-3" />
                <span>Pet-friendly</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-2 text-left">
            <div className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-neutral-300' : 'text-neutral-900'}`}>
              Навигация
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="hover:underline hover:text-[#FB7185] transition-colors cursor-pointer text-left"
                >
                  Услуги и цены
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('portfolio')}
                  className="hover:underline hover:text-[#FB7185] transition-colors cursor-pointer text-left"
                >
                  Примеры работ (До / После)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('reviews')}
                  className="hover:underline hover:text-[#FB7185] transition-colors cursor-pointer text-left"
                >
                  Отзывы гостей
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="hover:underline hover:text-[#FB7185] transition-colors cursor-pointer text-left"
                >
                  О салоне и мастера
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contacts')}
                  className="hover:underline hover:text-[#FB7185] transition-colors cursor-pointer text-left"
                >
                  Контакты и карта
                </button>
              </li>
              <li>
                <button onClick={onOpenMyBookings} className="hover:underline hover:text-[#FB7185] transition-colors cursor-pointer text-left">
                  Мои сохраненные записи
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <div className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Направления услуг:
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => goToServicesCategory('hair')}
                  className="text-[11px] px-2 py-0.5 rounded border border-neutral-500/20 hover:border-[#FB7185] hover:text-[#FB7185] cursor-pointer"
                >
                  Стрижки
                </button>
                <button
                  onClick={() => goToServicesCategory('nails')}
                  className="text-[11px] px-2 py-0.5 rounded border border-neutral-500/20 hover:border-[#FB7185] hover:text-[#FB7185] cursor-pointer"
                >
                  Маникюр
                </button>
                <button
                  onClick={() => goToServicesCategory('brows-lashes')}
                  className="text-[11px] px-2 py-0.5 rounded border border-neutral-500/20 hover:border-[#FB7185] hover:text-[#FB7185] cursor-pointer"
                >
                  Брови
                </button>
                <button
                  onClick={() => goToServicesCategory('cosmetology')}
                  className="text-[11px] px-2 py-0.5 rounded border border-neutral-500/20 hover:border-[#FB7185] hover:text-[#FB7185] cursor-pointer"
                >
                  Лазер
                </button>
              </div>
            </div>
          </div>

          {/* Quick Contacts */}
          <div className="lg:col-span-4 space-y-2 text-left text-xs">
            <div className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-neutral-300' : 'text-neutral-900'}`}>
              Связь и адрес
            </div>
            <p>Воронеж, ул. Владимира Невского, 35</p>
            <p>
              <a href={`tel:${SALON_INFO.phoneCityClean}`} className="font-bold hover:underline">
                {SALON_INFO.phoneCity}
              </a>
              {' '}•{' '}
              <a href={`tel:${SALON_INFO.phoneMobileClean}`} className="font-bold hover:underline">
                {SALON_INFO.phoneMobile}
              </a>
            </p>
            <p className="text-neutral-400">Пн–Пт 09:00–20:00 • Сб–Вс 10:00–20:00</p>
            
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                  isDark
                    ? 'bg-[#FB7185] text-white hover:bg-[#F43F5E]'
                    : 'bg-[#18181B] text-white hover:bg-[#FB7185]'
                }`}
              >
                Забронировать визит
              </button>
            </div>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 gap-2">
          <div>© {new Date().getFullYear()} Салон красоты «Тэфи» (ул. Владимира Невского, 35)</div>
          <div>Знак «Хорошее место» от Яндекс Карт</div>
        </div>
      </div>
    </footer>
  );
};
