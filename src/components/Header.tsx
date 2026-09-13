import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MapPin, Clock, Calendar, Menu, X, ArrowRight, Sun, Moon, Sparkles, Scissors, Sparkle, Heart } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { useTheme } from '../context/ThemeContext';
import { TefiLogo } from './TefiLogo';
import { scrollToSection } from '../utils/navigation';

interface HeaderProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenMyBookings: () => void;
  bookingsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenMyBookings,
  bookingsCount,
}) => {
  const { theme, isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'услуги и цены', href: '#services' },
    { name: 'портфолио', href: '#portfolio' },
    { name: 'о салоне', href: '#about' },
    { name: 'отзывы', href: '#reviews' },
    { name: 'контакты', href: '#contacts' },
  ];

  const quickServiceLinks = [
    { name: 'Стрижки & Окрашивание', category: 'hair' as const },
    { name: 'Маникюр & Педикюр', category: 'nails' as const },
    { name: 'Брови & Ресницы', category: 'brows-lashes' as const },
    { name: 'Лазер & Косметология', category: 'cosmetology' as const },
  ];

  const handleNavClick = (
    href: string,
    category?: 'all' | 'hair' | 'nails' | 'brows-lashes' | 'cosmetology'
  ) => {
    setMobileMenuOpen(false);
    // Allow the mobile menu drawer to collapse so scroll coordinates are calculated precisely
    scrollToSection(href, { category, delay: 100 });
  };

  return (
    <>
      {/* Top minimal notification rail */}
      <div
        className={`text-[11px] py-1.5 px-4 transition-colors border-b ${
          isDark
            ? 'bg-[#09090b] text-[#A1A1AA] border-[#27272A]'
            : 'bg-[#FFF0F3] text-[#64748B] border-[#FCE7F3]'
        } hidden md:block`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-5">
            <div className="flex items-center gap-1.5">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isDark ? 'bg-[#FB7185] animate-pulse' : 'bg-[#FB7185] animate-pulse'
                }`}
              />
              <span className="font-medium">Воронеж, ул. Владимира Невского, 35</span>
            </div>
            <span className={isDark ? 'text-[#3F3F46]' : 'text-[#CBD5E1]'}>/</span>
            <span>Ежедневно 09:00 — 20:00</span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href={SALON_INFO.yandexMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 transition-colors ${
                isDark ? 'hover:text-[#FB7185]' : 'hover:text-[#FB7185]'
              }`}
            >
              ★ 4.8 на Яндекс Картах
            </a>
            <span className={isDark ? 'text-[#3F3F46]' : 'text-[#CBD5E1]'}>/</span>
            <a
              href={`tel:${SALON_INFO.phoneMobileClean}`}
              className={`font-semibold tracking-wide transition-colors ${
                isDark ? 'text-white hover:text-[#FB7185]' : 'text-[#18181B] hover:text-[#FB7185]'
              }`}
            >
              {SALON_INFO.phoneMobile}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Minimal Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isDark
            ? isScrolled
              ? 'bg-[#09090b]/90 backdrop-blur-xl border-b border-[#27272A] py-3.5'
              : 'bg-[#09090b]/80 backdrop-blur-md border-b border-[#18181B] py-5'
            : isScrolled
              ? 'bg-white/90 backdrop-blur-xl border-b border-[#FCE7F3] shadow-xs py-3.5'
              : 'bg-[#FFF8F9]/90 backdrop-blur-md border-b border-[#FCE7F3]/60 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo - Official calligraphic brandmark «Тэфи» */}
          <button
            onClick={() => scrollToSection('top')}
            className="flex items-center group select-none cursor-pointer text-left bg-transparent border-0 p-0"
            aria-label="На главную"
          >
            <TefiLogo size="md" isDark={isDark} showSubtitle={true} />
          </button>

          {/* Minimalist Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-wider">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`transition-colors py-1 cursor-pointer ${
                  isDark
                    ? 'text-[#A1A1AA] hover:text-[#FB7185]'
                    : 'text-[#64748B] hover:text-[#FB7185]'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Action Tools: Theme Switcher + My Bookings + Online Booking */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#18181B] border-[#27272A] text-[#FB7185] hover:border-[#FB7185]'
                  : 'bg-white border-[#FCE7F3] text-[#FB7185] hover:border-[#FB7185] shadow-xs'
              }`}
              title={isDark ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#FB7185]" />
                  <span className="hidden sm:inline text-white text-[11px]">светлая</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#FB7185]" />
                  <span className="hidden sm:inline text-[#18181B] text-[11px]">темная</span>
                </>
              )}
            </button>

            {/* Saved Bookings Indicator */}
            {bookingsCount > 0 && (
              <button
                onClick={onOpenMyBookings}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  isDark
                    ? 'bg-[#18181B] border-[#27272A] text-white hover:border-[#FB7185]'
                    : 'bg-white border-[#FCE7F3] text-[#18181B] hover:border-[#FB7185]'
                }`}
              >
                <Calendar className={`w-3.5 h-3.5 ${isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}`} />
                <span className="text-[11px]">записи ({bookingsCount})</span>
              </button>
            )}

            {/* Minimalist CTA Button inspired by 'LET'S BUY →' */}
            <button
              onClick={() => onOpenBooking()}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 text-xs font-bold uppercase tracking-wider border transition-all duration-200 active:scale-95 cursor-pointer ${
                isDark
                  ? 'bg-transparent text-white border-white hover:bg-[#FB7185] hover:text-white hover:border-[#FB7185]'
                  : 'bg-[#18181B] text-white border-[#18181B] hover:bg-[#FB7185] hover:border-[#FB7185]'
              }`}
            >
              <span>Записаться</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer ${
                isDark ? 'text-white hover:bg-[#18181B]' : 'text-[#18181B] hover:bg-neutral-100'
              }`}
              aria-label="Меню навигации"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className={`md:hidden border-b px-5 pt-3 pb-6 space-y-4 mt-2 max-h-[85vh] overflow-y-auto ${
                isDark
                  ? 'bg-[#09090b]/98 backdrop-blur-xl border-[#27272A] text-white'
                  : 'bg-white/98 backdrop-blur-xl border-[#FCE7F3] text-[#18181B]'
              }`}
            >
              <div className="flex items-center justify-between py-2 border-b border-white/10 text-xs">
                <span className={isDark ? 'text-[#A1A1AA]' : 'text-[#64748B]'}>
                  Тема оформления:
                </span>
                <button
                  onClick={toggleTheme}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    isDark
                      ? 'border-[#FB7185] bg-[#FB7185]/10 text-[#FB7185]'
                      : 'border-[#FB7185] bg-[#FFF0F3] text-[#FB7185]'
                  }`}
                >
                  {isDark ? 'Темная розовая' : 'Светлая розовая'}
                </button>
              </div>

              {/* Main navigation links */}
              <div className="grid grid-cols-1 gap-1.5 pt-1">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-left py-2.5 px-3 text-sm font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer min-h-[44px] flex items-center justify-between group ${
                      isDark
                        ? 'text-[#E4E4E7] hover:bg-[#18181B] hover:text-[#FB7185]'
                        : 'text-[#18181B] hover:bg-[#FFF0F3] hover:text-[#FB7185]'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#FB7185]" />
                  </button>
                ))}
              </div>

              {/* Quick Services Direct Navigation in Mobile Drawer */}
              <div className={`p-3 rounded-xl border ${
                isDark ? 'bg-[#121217] border-[#27272A]' : 'bg-[#FFF8F9] border-[#FCE7F3]'
              }`}>
                <div className="text-[10px] uppercase font-bold tracking-wider mb-2 text-[#FB7185]">
                  Услуги салона (перейти к направлению):
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {quickServiceLinks.map((service) => (
                    <button
                      key={service.name}
                      onClick={() => handleNavClick('#services', service.category)}
                      className={`p-2 rounded-lg text-left text-xs font-medium border transition-all cursor-pointer ${
                        isDark
                          ? 'bg-[#181820] border-[#27272A] text-neutral-300 hover:text-white hover:border-[#FB7185]'
                          : 'bg-white border-[#FCE7F3] text-neutral-700 hover:text-[#18181B] hover:border-[#FB7185]'
                      }`}
                    >
                      {service.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenMyBookings();
                  }}
                  className={`flex items-center justify-between px-4 py-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer min-h-[44px] ${
                    isDark
                      ? 'bg-[#18181B] border-[#27272A] text-white'
                      : 'bg-[#FFF0F3] border-[#FCE7F3] text-[#18181B]'
                  }`}
                >
                  <span>Мои сохраненные записи</span>
                  <span className="font-bold px-2 py-0.5 rounded-full bg-[#FB7185] text-white text-[10px]">
                    {bookingsCount}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3 text-xs font-bold uppercase tracking-wider rounded-xl bg-[#FB7185] text-white hover:bg-[#F43F5E] transition-colors cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Записаться онлайн</span>
                </button>

                <a
                  href={`tel:${SALON_INFO.phoneMobileClean}`}
                  className={`text-center py-2.5 text-xs font-bold tracking-wider uppercase rounded-xl border transition-all min-h-[40px] flex items-center justify-center gap-2 ${
                    isDark
                      ? 'border-[#27272A] text-neutral-300 hover:text-[#FB7185]'
                      : 'border-[#FCE7F3] text-neutral-700 hover:text-[#FB7185]'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5 text-[#FB7185]" />
                  <span>{SALON_INFO.phoneMobile}</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
