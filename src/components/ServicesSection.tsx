import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Clock,
  Sparkles,
  Scissors,
  HandMetal,
  Eye,
  Smile,
  Check,
  Plus,
  Calendar,
  Layers,
  List,
  Grid,
  Info,
  X,
  ArrowRight,
  ChevronRight,
  Star
} from 'lucide-react';
import { SERVICES_DATA, SALON_INFO } from '../data/salonData';
import { ServiceCategory, ServiceItem } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceId: string, additionalServiceIds?: string[]) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking }) => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickFilter, setQuickFilter] = useState<'all' | 'popular' | 'budget' | 'four_hands'>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  
  // Multi-service Visit Builder Cart
  const [cartServiceIds, setCartServiceIds] = useState<string[]>([]);
  // Detail modal
  const [activeDetailService, setActiveDetailService] = useState<ServiceItem | null>(null);

  const servicesTargetRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (catId: ServiceCategory | 'all') => {
    setSelectedCategory(catId);
    setQuickFilter('all');
    setTimeout(() => {
      if (servicesTargetRef.current) {
        const headerOffset = 80;
        const elementPosition = servicesTargetRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 60);
  };

  useEffect(() => {
    const handleCustomEvent = (e: Event) => {
      const custom = e as CustomEvent<string>;
      if (custom.detail) {
        setSelectedCategory(custom.detail as ServiceCategory | 'all');
        setQuickFilter('all');
      }
    };
    window.addEventListener('tefi-select-category', handleCustomEvent);
    window.addEventListener('tefi_select_category', handleCustomEvent);
    return () => {
      window.removeEventListener('tefi-select-category', handleCustomEvent);
      window.removeEventListener('tefi_select_category', handleCustomEvent);
    };
  }, []);

  const categories: {
    id: ServiceCategory | 'all';
    label: string;
    sublabel: string;
    icon: React.FC<{ className?: string }>;
    count: number;
  }[] = [
    { id: 'all', label: 'Все услуги', sublabel: '10 процедур прайса', icon: Grid, count: SERVICES_DATA.length },
    { id: 'hair', label: 'Стрижки & Волосы', sublabel: 'мужские и женские', icon: Scissors, count: SERVICES_DATA.filter((s) => s.category === 'hair').length },
    { id: 'nails', label: 'Ногтевой сервис', sublabel: 'маникюр & педикюр', icon: Sparkles, count: SERVICES_DATA.filter((s) => s.category === 'nails').length },
    { id: 'brows-lashes', label: 'Взгляд & Перманент', sublabel: 'брови, ресницы, татуаж', icon: Eye, count: SERVICES_DATA.filter((s) => s.category === 'brows-lashes').length },
    { id: 'cosmetology', label: 'Лазерная эпиляция', sublabel: '5 зон на выбор', icon: Smile, count: SERVICES_DATA.filter((s) => s.category === 'cosmetology').length },
  ];

  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      const matchesCategory =
        selectedCategory === 'all' || service.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        service.name.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q) ||
        (service.tag && service.tag.toLowerCase().includes(q));

      let matchesQuick = true;
      if (quickFilter === 'popular') {
        matchesQuick = !!service.popular;
      } else if (quickFilter === 'budget') {
        matchesQuick = service.priceFrom <= 2000;
      } else if (quickFilter === 'hair_cut') {
        matchesQuick = service.category === 'hair';
      }

      return matchesCategory && matchesSearch && matchesQuick;
    });
  }, [selectedCategory, searchQuery, quickFilter]);

  const cartServices = useMemo(() => {
    return cartServiceIds
      .map((id) => SERVICES_DATA.find((s) => s.id === id))
      .filter((s): s is ServiceItem => Boolean(s));
  }, [cartServiceIds]);

  const totalCartPrice = useMemo(() => {
    return cartServices.reduce((sum, s) => sum + s.priceFrom, 0);
  }, [cartServices]);

  const totalCartDuration = useMemo(() => {
    return cartServices.reduce((sum, s) => sum + s.durationMinutes, 0);
  }, [cartServices]);

  const toggleServiceInCart = (serviceId: string) => {
    setCartServiceIds((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleBookCart = () => {
    if (cartServiceIds.length === 0) return;
    const [primary, ...additional] = cartServiceIds;
    onSelectServiceForBooking(primary, additional);
  };

  return (
    <section
      id="services"
      className={`py-16 lg:py-24 border-y transition-colors scroll-mt-16 ${
        isDark
          ? 'bg-[#0c0c10] border-[#27272A] text-white'
          : 'bg-[#FFF0F3]/40 border-[#FCE7F3] text-[#18181B]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Minimalist Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-neutral-500/20 gap-4"
        >
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase font-bold tracking-widest mb-1.5">
              <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#FB7185]' : 'bg-[#FB7185]'}`} />
              <span className={isDark ? 'text-[#A1A1AA]' : 'text-[#64748B]'}>каталог & цены</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight lowercase">
              услуги{' '}
              <span className={isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}>
                салона
              </span>
            </h2>
          </div>
          <p className={`text-xs sm:text-sm max-w-md ${isDark ? 'text-[#A1A1AA]' : 'text-[#64748B]'}`}>
            Фиксированные понятные цены, стерильный инструмент по СанПиН и возможность собрать персональный визит в несколько процедур.
          </p>
        </motion.div>

        {/* Minimal Control Bar: Search + Quick Tags + View Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className={`p-4 sm:p-5 rounded-2xl border mb-8 transition-colors ${
            isDark
              ? 'bg-[#121217] border-[#27272A] shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
              : 'bg-white border-[#FCE7F3] shadow-xs'
          }`}
        >
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                isDark ? 'text-neutral-500' : 'text-neutral-400'
              }`} />
              <input
                type="text"
                placeholder="Поиск по услугам: стрижка, маникюр, педикюр, брови, лазер..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-8 py-2.5 text-xs sm:text-sm rounded-xl border outline-none transition-colors ${
                  isDark
                    ? 'bg-[#181820] border-[#27272A] text-white placeholder-neutral-500 focus:border-[#FB7185]'
                    : 'bg-[#FFF8F9] border-[#FCE7F3] text-[#18181B] placeholder-neutral-400 focus:border-[#FB7185]'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-bold uppercase tracking-wider pb-1 md:pb-0 scrollbar-none">
              <button
                onClick={() => setQuickFilter('all')}
                className={`px-3 py-2 rounded-xl border transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                  quickFilter === 'all'
                    ? isDark
                      ? 'bg-[#FB7185] text-white border-[#FB7185] shadow-xs'
                      : 'bg-[#18181B] text-white border-[#18181B] shadow-xs'
                    : isDark
                      ? 'border-[#27272A] text-neutral-400 hover:text-white hover:bg-white/5'
                      : 'border-[#FCE7F3] text-neutral-600 hover:text-[#18181B] hover:bg-[#FFF8F9]'
                }`}
              >
                Все
              </button>
              <button
                onClick={() => setQuickFilter('popular')}
                className={`px-3 py-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap active:scale-95 ${
                  quickFilter === 'popular'
                    ? isDark
                      ? 'bg-[#FB7185] text-white border-[#FB7185] shadow-xs'
                      : 'bg-[#18181B] text-white border-[#18181B] shadow-xs'
                    : isDark
                      ? 'border-[#27272A] text-neutral-400 hover:text-white hover:bg-white/5'
                      : 'border-[#FCE7F3] text-neutral-600 hover:text-[#18181B] hover:bg-[#FFF8F9]'
                }`}
              >
                <Star className="w-3 h-3 fill-current" />
                <span>Хиты</span>
              </button>
              <button
                onClick={() => setQuickFilter('budget')}
                className={`px-3 py-2 rounded-xl border transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                  quickFilter === 'budget'
                    ? isDark
                      ? 'bg-[#FB7185] text-white border-[#FB7185] shadow-xs'
                      : 'bg-[#18181B] text-white border-[#18181B] shadow-xs'
                    : isDark
                      ? 'border-[#27272A] text-neutral-400 hover:text-white hover:bg-white/5'
                      : 'border-[#FCE7F3] text-neutral-600 hover:text-[#18181B] hover:bg-[#FFF8F9]'
                }`}
              >
                До 2 000 ₽
              </button>
              <button
                onClick={() => setQuickFilter('hair_cut')}
                className={`px-3 py-2 rounded-xl border transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                  quickFilter === 'hair_cut'
                    ? isDark
                      ? 'bg-[#FB7185] text-white border-[#FB7185] shadow-xs'
                      : 'bg-[#18181B] text-white border-[#18181B] shadow-xs'
                    : isDark
                      ? 'border-[#27272A] text-neutral-400 hover:text-white hover:bg-white/5'
                      : 'border-[#FCE7F3] text-neutral-600 hover:text-[#18181B] hover:bg-[#FFF8F9]'
                }`}
              >
                Стрижки
              </button>

              {/* View mode toggle */}
              <div className="flex items-center ml-1 border rounded-xl overflow-hidden shrink-0 border-neutral-500/30">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-2 transition-colors cursor-pointer ${
                    viewMode === 'cards'
                      ? isDark ? 'bg-[#27272A] text-white' : 'bg-[#FFF0F3] text-[#FB7185]'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                  title="Карточки"
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 transition-colors cursor-pointer ${
                    viewMode === 'table'
                      ? isDark ? 'bg-[#27272A] text-white' : 'bg-[#FFF0F3] text-[#FB7185]'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                  title="Список"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Beautiful Category Plates ("Красивые плашки с выбором услуг") */}
          <div className="pt-4 border-t border-neutral-500/20 mt-4">
            <div className="text-[11px] font-bold uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span className={isDark ? 'text-neutral-400' : 'text-neutral-500'}>
                Направления услуг:
              </span>
              <span className="text-[10px] text-neutral-400 font-normal">
                нажмите для мгновенной фильтрации
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const IconComponent = cat.icon;
                return (
                  <motion.button
                    key={cat.id}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`relative p-3 rounded-xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden group ${
                      isActive
                        ? isDark
                          ? 'bg-[#1c1c27] border-[#FB7185] shadow-[0_8px_24px_rgba(251,113,133,0.25)] ring-1 ring-[#FB7185]/30'
                          : 'bg-white border-[#FB7185] shadow-[0_8px_20px_rgba(251,113,133,0.18)] ring-2 ring-[#FB7185]/20'
                        : isDark
                          ? 'bg-[#15151c] border-[#27272A] hover:border-neutral-500 hover:bg-[#191922]'
                          : 'bg-white/90 border-[#FCE7F3] hover:border-[#FB7185]/60 hover:bg-[#FFFDFD] shadow-2xs'
                    }`}
                  >
                    {/* Active accent top bar */}
                    {isActive && (
                      <span className={`absolute top-0 inset-x-0 h-1 ${
                        isDark ? 'bg-[#FB7185]' : 'bg-[#FB7185]'
                      }`} />
                    )}

                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        isActive
                          ? isDark ? 'bg-[#FB7185] text-white' : 'bg-[#FB7185] text-white'
                          : isDark ? 'bg-[#22222c] text-neutral-400 group-hover:text-white' : 'bg-[#FFF0F3] text-neutral-600 group-hover:text-[#FB7185]'
                      }`}>
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? isDark ? 'bg-[#FB7185]/20 text-[#FB7185]' : 'bg-[#FFF0F3] text-[#FB7185]'
                          : isDark ? 'bg-[#22222c] text-neutral-400' : 'bg-neutral-100 text-neutral-500'
                      }`}>
                        {cat.count}
                      </span>
                    </div>

                    <div>
                      <div className={`font-display text-xs font-bold leading-tight line-clamp-1 ${
                        isActive
                          ? isDark ? 'text-white' : 'text-[#18181B]'
                          : isDark ? 'text-neutral-200 group-hover:text-white' : 'text-neutral-800'
                      }`}>
                        {cat.label}
                      </div>
                      <div className={`text-[10px] mt-0.5 line-clamp-1 ${
                        isActive
                          ? isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'
                          : 'text-neutral-400'
                      }`}>
                        {cat.sublabel}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Multi-service Visit Builder Bar (if items are in cart) */}
        {cartServiceIds.length > 0 && (
          <div
            className={`sticky top-20 z-30 mb-8 p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in duration-300 shadow-xl ${
              isDark
                ? 'bg-[#181822] border-[#FB7185] text-white'
                : 'bg-white border-[#FB7185] text-[#18181B]'
            }`}
          >
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                isDark ? 'bg-[#FB7185] text-white' : 'bg-[#FB7185] text-white'
              }`}>
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider">
                  Собрано услуг: {cartServiceIds.length}
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  Итого от <strong>{totalCartPrice.toLocaleString('ru-RU')} ₽</strong> • ~{totalCartDuration} мин
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <button
                onClick={() => setCartServiceIds([])}
                className="px-3 py-2 text-xs text-neutral-400 hover:text-white cursor-pointer"
              >
                Очистить
              </button>
              <button
                onClick={handleBookCart}
                className={`flex-1 md:flex-none px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                  isDark
                    ? 'bg-[#FB7185] text-white hover:bg-[#F43F5E]'
                    : 'bg-[#FB7185] text-white hover:bg-[#F43F5E]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Забронировать визит</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Catalog Items Container with scroll target */}
        <div ref={servicesTargetRef} id="services-catalog-list" className="scroll-mt-24">
        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className={`text-center py-12 rounded-2xl border p-6 max-w-md mx-auto ${
            isDark ? 'bg-[#121217] border-[#27272A]' : 'bg-white border-[#FCE7F3]'
          }`}>
            <Search className="w-8 h-8 mx-auto mb-2 text-neutral-400" />
            <h3 className="font-display font-bold text-sm">Ничего не найдено</h3>
            <p className="text-xs text-neutral-500 mt-1">Попробуйте изменить запрос</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setQuickFilter('all');
              }}
              className="mt-3 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#27272A] text-white hover:bg-neutral-600"
            >
              Сбросить
            </button>
          </div>
        )}

        {/* Cards View */}
        {filteredServices.length > 0 && viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((service, index) => {
              const isInCart = cartServiceIds.includes(service.id);
              const isHit = service.popular || service.tag?.toLowerCase() === 'хит';
              const extraTag = service.tag && service.tag.toLowerCase() !== 'хит' ? service.tag : null;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.45,
                    delay: (index % 3) * 0.08,
                    ease: 'easeOut',
                  }}
                  className={`group rounded-2xl p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                    isDark
                      ? isInCart
                        ? 'bg-[#181824] border-[#FB7185] shadow-[0_0_24px_rgba(251,113,133,0.22)]'
                        : 'bg-[#121217] hover:bg-[#16161d] border-[#26262F] hover:border-[#FB7185]/60 hover:shadow-[0_16px_36px_rgba(0,0,0,0.5),0_0_20px_rgba(251,113,133,0.1)] hover:-translate-y-1.5'
                      : isInCart
                        ? 'bg-[#FFF8F9] border-[#FB7185] shadow-[0_0_20px_rgba(251,113,133,0.15)]'
                        : 'bg-white hover:bg-[#FFFDFD] border-[#F2E5E8] hover:border-[#FB7185]/60 hover:shadow-[0_16px_32px_rgba(251,113,133,0.12)] hover:-translate-y-1.5'
                  }`}
                >
                  {/* Subtle top accent shimmer line on hover */}
                  <div className={`absolute top-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                    isDark
                      ? 'bg-gradient-to-r from-transparent via-[#FB7185] to-transparent'
                      : 'bg-gradient-to-r from-transparent via-[#FB7185] to-transparent'
                  }`} />

                  <div>
                    {/* Top Badges & Price */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {isHit && (
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-xs ${
                            isDark
                              ? 'bg-gradient-to-r from-[#FB7185] to-[#F43F5E] text-white'
                              : 'bg-gradient-to-r from-[#FB7185] to-[#F43F5E] text-white'
                          }`}>
                            <Sparkles className="w-2.5 h-2.5" />
                            ХИТ
                          </span>
                        )}
                        {extraTag && (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                            isDark
                              ? 'bg-white/6 border border-white/10 text-neutral-300'
                              : 'bg-neutral-100 border border-neutral-200 text-neutral-700'
                          }`}>
                            {extraTag}
                          </span>
                        )}
                      </div>

                      <div className="text-right shrink-0 pl-2">
                        <span className="text-[11px] font-semibold text-neutral-400 mr-1">от</span>
                        <span className={`font-display text-lg sm:text-xl font-extrabold tracking-tight ${
                          isDark ? 'text-[#FB7185]' : 'text-[#18181B]'
                        }`}>
                          {service.priceFrom.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={`font-display text-base sm:text-lg font-bold leading-snug transition-colors line-clamp-2 ${
                      isDark
                        ? 'text-white group-hover:text-[#FB7185]'
                        : 'text-[#18181B] group-hover:text-[#FB7185]'
                    }`}>
                      {service.name}
                    </h3>

                    {/* Description */}
                    <p className={`text-xs mt-2 leading-relaxed line-clamp-2 min-h-[34px] ${
                      isDark ? 'text-[#A1A1AA]' : 'text-[#64748B]'
                    }`}>
                      {service.description}
                    </p>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className={`pt-3.5 mt-3.5 border-t ${
                    isDark ? 'border-[#26262F]' : 'border-[#F2E5E8]'
                  }`}>
                    <div className="flex items-center justify-between text-xs mb-3.5">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium ${
                        isDark
                          ? 'text-neutral-400 bg-white/4 border border-white/5'
                          : 'text-neutral-600 bg-neutral-100 border border-neutral-200'
                      }`}>
                        <Clock className="w-3.5 h-3.5" />
                        <span>~{service.durationMinutes} мин</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveDetailService(service)}
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold transition-colors cursor-pointer group/comp ${
                          isDark
                            ? 'text-neutral-400 hover:text-white hover:underline'
                            : 'text-neutral-500 hover:text-[#18181B] hover:underline'
                        }`}
                      >
                        <span>Состав услуги</span>
                        <ChevronRight className="w-3 h-3 transition-transform group-hover/comp:translate-x-0.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => toggleServiceInCart(service.id)}
                        className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 ${
                          isInCart
                            ? isDark
                              ? 'bg-[#FB7185] text-white border-[#FB7185] shadow-xs'
                              : 'bg-[#FB7185] text-white border-[#FB7185] shadow-xs'
                            : isDark
                              ? 'bg-white/4 hover:bg-white/10 border-white/10 text-neutral-200 hover:border-neutral-500'
                              : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700'
                        }`}
                      >
                        {isInCart ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>{isInCart ? 'В визите' : 'В визит'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectServiceForBooking(service.id)}
                        className={`py-2.5 px-3 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md active:scale-95 group/btn ${
                          isDark
                            ? 'bg-white hover:bg-[#FB7185] text-[#09090b] hover:text-white'
                            : 'bg-[#18181B] hover:bg-[#FB7185] text-white'
                        }`}
                      >
                        <span>Запись</span>
                        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Mode 2: Table View */}
        {filteredServices.length > 0 && viewMode === 'table' && (
          <div className={`rounded-2xl border overflow-hidden ${
            isDark ? 'bg-[#121217] border-[#27272A]' : 'bg-white border-[#FCE7F3]'
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className={`border-b text-[10px] uppercase font-bold tracking-wider ${
                    isDark ? 'bg-[#181820] text-neutral-400 border-[#27272A]' : 'bg-[#FFF8F9] text-neutral-500 border-[#FCE7F3]'
                  }`}>
                    <th className="py-3 px-4">Услуга</th>
                    <th className="py-3 px-3 hidden sm:table-cell">Время</th>
                    <th className="py-3 px-3">Цена</th>
                    <th className="py-3 px-4 text-right">Действие</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-[#27272A]' : 'divide-[#FCE7F3]'}`}>
                  {filteredServices.map((service) => {
                    const isInCart = cartServiceIds.includes(service.id);
                    return (
                      <tr key={service.id} className={isDark ? 'hover:bg-white/5' : 'hover:bg-rose-50/40'}>
                        <td className="py-3 px-4">
                          <div className="font-bold flex items-center gap-2">
                            <span>{service.name}</span>
                            {service.popular && (
                              <span className={`px-1.5 py-0.2 text-[9px] font-bold rounded ${
                                isDark ? 'bg-[#FB7185]/20 text-[#FB7185]' : 'bg-[#FFF0F3] text-[#FB7185]'
                              }`}>
                                Хит
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-neutral-400 truncate max-w-sm mt-0.5">
                            {service.description}
                          </div>
                        </td>
                        <td className="py-3 px-3 hidden sm:table-cell text-neutral-400">
                          ~{service.durationMinutes} мин
                        </td>
                        <td className="py-3 px-3 font-bold whitespace-nowrap">
                          {service.priceFrom.toLocaleString('ru-RU')} ₽
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => toggleServiceInCart(service.id)}
                              className={`p-1.5 rounded-md border text-xs cursor-pointer ${
                                isInCart
                                  ? isDark ? 'bg-[#FB7185] text-white' : 'bg-[#FB7185] text-white'
                                  : 'border-neutral-500/30'
                              }`}
                              title={isInCart ? 'Убрать' : 'Добавить в визит'}
                            >
                              {isInCart ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              onClick={() => onSelectServiceForBooking(service.id)}
                              className={`px-3 py-1.5 text-xs font-bold uppercase rounded-md cursor-pointer ${
                                isDark
                                  ? 'bg-white text-[#09090b] hover:bg-[#FB7185] hover:text-white'
                                  : 'bg-[#18181B] text-white hover:bg-[#FB7185]'
                              }`}
                            >
                              Записаться
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        </div>

      </div>

      {/* Service Detail Modal */}
      {activeDetailService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className={`rounded-2xl max-w-md w-full p-6 border relative animate-in fade-in duration-200 ${
            isDark ? 'bg-[#121217] border-[#27272A] text-white' : 'bg-white border-[#FCE7F3] text-[#18181B]'
          }`}>
            <button
              onClick={() => setActiveDetailService(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-[11px] font-bold uppercase tracking-wider mb-2 text-neutral-400">
              {activeDetailService.category}
            </div>

            <h3 className="font-display text-xl font-bold">
              {activeDetailService.name}
            </h3>

            <div className="flex items-center gap-4 text-xs text-neutral-400 mt-2 pb-3 border-b border-neutral-500/20">
              <span>Время: ~{activeDetailService.durationMinutes} мин</span>
              <span>Стоимость: <strong className={isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}>от {activeDetailService.priceFrom.toLocaleString('ru-RU')} ₽</strong></span>
            </div>

            <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
              {activeDetailService.description}
            </p>

            {activeDetailService.includedSteps && activeDetailService.includedSteps.length > 0 && (
              <div className={`mt-4 p-3 rounded-xl border ${
                isDark ? 'bg-[#181820] border-[#27272A]' : 'bg-[#FFF8F9] border-[#FCE7F3]'
              }`}>
                <div className="text-[10px] font-bold uppercase tracking-wider mb-2 text-neutral-400">
                  Этапы процедуры:
                </div>
                <div className="space-y-1.5 text-xs">
                  {activeDetailService.includedSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5 ${
                        isDark ? 'bg-[#FB7185] text-white' : 'bg-[#FB7185] text-white'
                      }`}>
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5 pt-3 border-t border-neutral-500/20 flex gap-2">
              <button
                onClick={() => {
                  toggleServiceInCart(activeDetailService.id);
                }}
                className={`flex-1 py-2.5 text-xs font-bold uppercase rounded-xl border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  cartServiceIds.includes(activeDetailService.id)
                    ? isDark
                      ? 'bg-[#FB7185] text-white border-[#FB7185]'
                      : 'bg-[#FB7185] text-white border-[#FB7185]'
                    : isDark
                      ? 'border-[#27272A] text-white hover:bg-white/5'
                      : 'border-[#FCE7F3] text-neutral-700 hover:bg-[#FFF8F9]'
                }`}
              >
                {cartServiceIds.includes(activeDetailService.id) ? 'В визите' : '+ Добавить в визит'}
              </button>

              <button
                onClick={() => {
                  const sId = activeDetailService.id;
                  setActiveDetailService(null);
                  onSelectServiceForBooking(sId);
                }}
                className={`flex-1 py-2.5 text-xs font-bold uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  isDark
                    ? 'bg-white text-[#09090b] hover:bg-[#FB7185] hover:text-white'
                    : 'bg-[#18181B] text-white hover:bg-[#FB7185]'
                }`}
              >
                <span>Записаться</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
