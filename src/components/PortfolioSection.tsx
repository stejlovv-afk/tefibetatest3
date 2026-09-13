import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, X, ZoomIn, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/salonData';
import { PortfolioItem, ServiceCategory } from '../types';
import { useTheme } from '../context/ThemeContext';
import { SafeImage } from './SafeImage';

interface PortfolioSectionProps {
  onSelectServiceForBooking: (serviceId?: string) => void;
}

interface ComparisonItem {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  master: string;
  duration: string;
  serviceId: string;
  buttonText: string;
  beforeImg: string;
  afterImg: string;
}

const COMPARISONS: ComparisonItem[] = [
  {
    id: 'airtouch',
    tabLabel: 'Airtouch блонд',
    title: 'airtouch блонд: переход в чистый тон',
    description: 'Бережная растяжка цвета, нейтрализация остаточного пигмента и плотное глянцевое тонирование без повреждения кутикулы.',
    master: 'Колорист салона «Тэфи»',
    duration: '3.5 часа',
    serviceId: 'hair-cut-women-long',
    buttonText: 'Хочу такое же окрашивание',
    beforeImg: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=1200',
    afterImg: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'bob',
    tabLabel: 'Стрижка каре',
    title: 'текстурное каре: точная форма и блеск',
    description: 'Преображение формы: объемный текстурный затылок, легкие струящиеся пряди у лица и глубокий оттенок.',
    master: 'Стилист салона «Тэфи»',
    duration: '1.5 часа',
    serviceId: 'hair-cut-women-short',
    buttonText: 'Записаться на стрижку каре',
    beforeImg: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=1200',
    afterImg: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'manicure',
    tabLabel: 'Маникюр',
    title: 'аппаратный маникюр & идеальные блики',
    description: 'Ювелирная обработка кутикулы, укрепление базой, идеальное выравнивание пластины и стойкое покрытие под кутикулу.',
    master: 'Мастер ногтевого сервиса',
    duration: '1 час 20 мин',
    serviceId: 'nail-manicure-gel-short',
    buttonText: 'Записаться на маникюр',
    beforeImg: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=1200',
    afterImg: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=1200',
  },
];

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectServiceForBooking }) => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);
  const [modalShowBefore, setModalShowBefore] = useState<boolean>(false);

  // Before / After Slider state
  const [activeComparisonId, setActiveComparisonId] = useState<string>('airtouch');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const galleryGridRef = useRef<HTMLDivElement>(null);

  const filterTabs: { id: ServiceCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'все работы' },
    { id: 'hair', label: 'стрижки & укладки' },
    { id: 'nails', label: 'маникюр & педикюр' },
    { id: 'brows-lashes', label: 'взгляд & ресницы' },
    { id: 'cosmetology', label: 'косметология' },
  ];

  const filteredItems = PORTFOLIO_DATA.filter((item) =>
    selectedCategory === 'all' ? true : item.category === selectedCategory
  );

  const currentComparison =
    COMPARISONS.find((c) => c.id === activeComparisonId) || COMPARISONS[0];

  // Smooth scroll to gallery items when tapping category tab (vital on smartphones)
  const handleCategorySelect = (categoryId: ServiceCategory | 'all') => {
    setSelectedCategory(categoryId);
    setTimeout(() => {
      if (galleryGridRef.current) {
        const headerOffset = 90;
        const elementPosition = galleryGridRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 60);
  };

  // Slider pointer interactions (smooth, touch-safe, zero squishing)
  const updateSliderFromClientX = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPosition(percent);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    updateSliderFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging || e.buttons === 1) {
      updateSliderFromClientX(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <section
      id="portfolio"
      className={`py-16 lg:py-24 border-b transition-colors scroll-mt-16 ${
        isDark ? 'bg-[#09090b] border-[#27272A] text-white' : 'bg-[#FFF8F9] border-[#FCE7F3] text-[#18181B]'
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
              <span className={isDark ? 'text-[#A1A1AA]' : 'text-[#64748B]'}>портфолио работ</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight lowercase">
              галерея{' '}
              <span className={isDark ? 'text-[#FB7185]' : 'text-[#FB7185]'}>
                результатов
              </span>
            </h2>
          </div>

          {/* Minimal Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleCategorySelect(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95 ${
                  selectedCategory === tab.id
                    ? 'bg-[#FB7185] text-white shadow-xs'
                    : isDark
                      ? 'bg-[#121217] text-neutral-400 hover:text-white border border-[#27272A]'
                      : 'bg-white text-neutral-600 hover:text-[#18181B] border border-[#FCE7F3]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Interactive Before/After Transformation Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className={`mb-14 rounded-2xl p-5 sm:p-7 border transition-colors ${
            isDark ? 'bg-[#121217] border-[#27272A]' : 'bg-white border-[#FCE7F3] shadow-xs'
          }`}
        >
          {/* Comparison Selector Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 mb-6 border-b border-neutral-500/20">
            <div className="flex items-center gap-2">
              <span className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded ${
                isDark ? 'bg-[#FB7185]/20 text-[#FB7185]' : 'bg-[#FFF0F3] text-[#FB7185]'
              }`}>
                Интерактивное «До / После»
              </span>
              <span className="text-xs text-neutral-400 hidden sm:inline">
                • Выберите преображение:
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {COMPARISONS.map((comp) => (
                <button
                  key={comp.id}
                  onClick={() => {
                    setActiveComparisonId(comp.id);
                    setSliderPosition(50);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                    activeComparisonId === comp.id
                      ? isDark
                        ? 'bg-[#FB7185] text-white border-[#FB7185]'
                        : 'bg-[#FB7185] text-white border-[#FB7185]'
                      : isDark
                        ? 'border-[#27272A] text-neutral-400 hover:text-white'
                        : 'border-[#FCE7F3] text-neutral-600 hover:text-[#18181B]'
                  }`}
                >
                  {comp.tabLabel}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Info Side */}
            <div className="lg:col-span-5 space-y-3 text-left">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold lowercase">
                {currentComparison.title}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                {currentComparison.description}
              </p>
              <div className={`space-y-1 text-xs pt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                <div>Специалист: <strong>{currentComparison.master}</strong></div>
                <div>Длительность: <strong>{currentComparison.duration}</strong></div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onSelectServiceForBooking(currentComparison.serviceId)}
                  className={`inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                    isDark
                      ? 'bg-[#FB7185] text-white hover:bg-[#F43F5E]'
                      : 'bg-[#18181B] text-white hover:bg-[#FB7185]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentComparison.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive Slider Component */}
            <div className="lg:col-span-7">
              <div
                ref={sliderRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className="relative rounded-2xl overflow-hidden aspect-[16/10] select-none border border-neutral-700/50 cursor-ew-resize group touch-none shadow-md"
                tabIndex={0}
                role="slider"
                aria-valuenow={sliderPosition}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Сравнение до и после"
                onKeyDown={(e) => {
                  if (e.key === 'ArrowLeft') setSliderPosition((p) => Math.max(0, p - 5));
                  if (e.key === 'ArrowRight') setSliderPosition((p) => Math.min(100, p + 5));
                }}
              >
                {/* AFTER image (bottom layer, unclipped) */}
                <img
                  src={currentComparison.afterImg}
                  alt="После процедуры"
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 right-3 z-10 bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow-md pointer-events-none">
                  после
                </span>

                {/* BEFORE image (top layer, clipped smoothly without distortion) */}
                <div
                  className="absolute inset-0 overflow-hidden select-none pointer-events-none"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img
                    src={currentComparison.beforeImg}
                    alt="До процедуры"
                    className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 z-10 bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow-md pointer-events-none">
                    до
                  </span>
                </div>

                {/* Divider Line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-[#FB7185] pointer-events-none shadow-[0_0_10px_rgba(251,113,133,0.9)]"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FB7185] text-white flex items-center justify-center font-bold text-xs shadow-xl border-2 border-white pointer-events-none transition-transform group-hover:scale-110">
                    ⇄
                  </div>
                </div>
              </div>

              {/* Slider Quick Buttons & Instructions */}
              <div className="flex items-center justify-between flex-wrap gap-2 mt-3">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setSliderPosition(100)}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-colors cursor-pointer ${
                      sliderPosition >= 95
                        ? 'bg-[#FB7185] text-white border-[#FB7185]'
                        : isDark
                          ? 'border-[#27272A] text-neutral-400 hover:text-white'
                          : 'border-[#FCE7F3] text-neutral-600 hover:text-[#18181B]'
                    }`}
                  >
                    100% До
                  </button>
                  <button
                    onClick={() => setSliderPosition(50)}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-colors cursor-pointer ${
                      sliderPosition >= 45 && sliderPosition <= 55
                        ? 'bg-[#FB7185] text-white border-[#FB7185]'
                        : isDark
                          ? 'border-[#27272A] text-neutral-400 hover:text-white'
                          : 'border-[#FCE7F3] text-neutral-600 hover:text-[#18181B]'
                    }`}
                  >
                    50 / 50
                  </button>
                  <button
                    onClick={() => setSliderPosition(0)}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-colors cursor-pointer ${
                      sliderPosition <= 5
                        ? 'bg-[#FB7185] text-white border-[#FB7185]'
                        : isDark
                          ? 'border-[#27272A] text-neutral-400 hover:text-white'
                          : 'border-[#FCE7F3] text-neutral-600 hover:text-[#18181B]'
                    }`}
                  >
                    100% После
                  </button>
                </div>

                <p className="text-[11px] text-neutral-400">
                  Тяните разделитель или нажимайте на кнопки
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gallery Grid Section Target */}
        <div ref={galleryGridRef} id="portfolio-grid" className="scroll-mt-24">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs uppercase font-bold tracking-wider text-neutral-400">
              Найдено работ:{' '}
              <strong className={isDark ? 'text-white' : 'text-[#18181B]'}>
                {filteredItems.length}
              </strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.45,
                  delay: (index % 3) * 0.08,
                  ease: 'easeOut',
                }}
                className={`rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col group ${
                  isDark
                    ? 'bg-[#121217] border-[#27272A] hover:border-[#FB7185] hover:shadow-[0_12px_30px_rgba(251,113,133,0.15)]'
                    : 'bg-white border-[#FCE7F3] hover:border-[#FB7185] shadow-xs hover:shadow-[0_12px_24px_rgba(251,113,133,0.1)]'
                }`}
              >
                <div
                  className="relative aspect-[4/3] overflow-hidden bg-neutral-900 cursor-pointer"
                  onClick={() => {
                    setActiveModalItem(item);
                    setModalShowBefore(false);
                  }}
                >
                  <SafeImage
                    src={item.image}
                    fallbackSrc={item.fallbackImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.beforeImage && (
                    <span className="absolute top-3 left-3 bg-[#FB7185] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                      Есть «До и После»
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5 bg-black/70 px-3 py-1.5 rounded-lg">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Увеличить</span>
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-0.5 text-[10px] font-medium rounded ${
                            isDark ? 'bg-[#181820] text-neutral-400' : 'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h4 className="font-display text-sm sm:text-base font-bold line-clamp-1">
                      {item.title}
                    </h4>

                    <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-neutral-500/20 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-400">
                      Студия: <strong className={isDark ? 'text-white' : 'text-[#18181B]'}>«Тэфи»</strong>
                    </span>
                    <button
                      onClick={() => onSelectServiceForBooking(item.serviceId)}
                      className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors ${
                        isDark ? 'text-[#FB7185] hover:text-white' : 'text-[#FB7185] hover:text-[#18181B]'
                      }`}
                    >
                      <span>Хочу так же</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal with optional Before/After view */}
        {activeModalItem && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className={`rounded-2xl max-w-lg w-full overflow-hidden border relative animate-in fade-in duration-200 ${
              isDark ? 'bg-[#121217] border-[#27272A] text-white' : 'bg-white border-[#FCE7F3] text-[#18181B]'
            }`}>
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center cursor-pointer hover:bg-black/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                {modalShowBefore && activeModalItem.beforeImage ? (
                  <img
                    src={activeModalItem.beforeImage}
                    alt="До процедуры"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <SafeImage
                    src={activeModalItem.image}
                    fallbackSrc={activeModalItem.fallbackImage}
                    alt={activeModalItem.title}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Badge for modal view */}
                <span className="absolute top-3 left-3 bg-black/80 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                  {modalShowBefore ? 'Исходное состояние: До' : 'Результат: После'}
                </span>

                {/* Toggle buttons if beforeImage exists */}
                {activeModalItem.beforeImage && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/80 backdrop-blur-xs p-1 rounded-xl shadow-lg">
                    <button
                      onClick={() => setModalShowBefore(true)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        modalShowBefore ? 'bg-[#FB7185] text-white' : 'text-neutral-300 hover:text-white'
                      }`}
                    >
                      Показать До
                    </button>
                    <button
                      onClick={() => setModalShowBefore(false)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        !modalShowBefore ? 'bg-[#FB7185] text-white' : 'text-neutral-300 hover:text-white'
                      }`}
                    >
                      Показать После
                    </button>
                  </div>
                )}
              </div>

              <div className="p-5 text-left space-y-3">
                <h3 className="font-display text-lg font-bold">
                  {activeModalItem.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {activeModalItem.description}
                </p>
                <div className="flex items-center justify-between text-xs py-2 border-y border-neutral-500/20">
                  <span>Салон: <strong>«Тэфи»</strong></span>
                  <span>Время: <strong>{activeModalItem.durationMinutes} мин</strong></span>
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => setActiveModalItem(null)}
                    className="px-3 py-2 text-xs font-semibold text-neutral-400 hover:text-white cursor-pointer"
                  >
                    Закрыть
                  </button>
                  <button
                    onClick={() => {
                      const id = activeModalItem.serviceId;
                      setActiveModalItem(null);
                      onSelectServiceForBooking(id);
                    }}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer ${
                      isDark
                        ? 'bg-[#FB7185] text-white hover:bg-[#F43F5E]'
                        : 'bg-[#18181B] text-white hover:bg-[#FB7185]'
                    }`}
                  >
                    Записаться на процедуру
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
