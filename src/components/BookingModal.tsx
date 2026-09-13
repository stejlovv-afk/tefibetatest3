import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Clock, Sparkles, ArrowRight, ArrowLeft, MessageSquare, UserCheck, Calendar as CalendarIcon, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SERVICES_DATA, SALON_INFO } from '../data/salonData';
import { Booking, ServiceCategory, ServiceItem } from '../types';
import { useTheme } from '../context/ThemeContext';
import { TefiLogo } from './TefiLogo';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  preselectedAdditionalIds?: string[];
  onBookingSuccess: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedAdditionalIds,
  onBookingSuccess,
}) => {
  const { isDark } = useTheme();
  // Steps: 1 = Service, 2 = Date & Time, 3 = Contacts, 4 = Success
  const [step, setStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [additionalServices, setAdditionalServices] = useState<ServiceItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientComment, setClientComment] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Generate 14 available days
  const availableDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const months = [
      'янв', 'фев', 'мар', 'апр', 'мая', 'июн',
      'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
    ];

    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const dayNum = d.getDate();
      const dayName = i === 0 ? 'Сегодня' : i === 1 ? 'Завтра' : daysOfWeek[d.getDay()];
      const monthName = months[d.getMonth()];
      dates.push({ iso, dayNum, dayName, monthName });
    }
    return dates;
  }, []);

  const timeSlots = [
    '09:30', '10:30', '11:45',
    '13:00', '14:15', '15:30',
    '17:00', '18:15', '19:00'
  ];

  useEffect(() => {
    if (preselectedServiceId) {
      const found = SERVICES_DATA.find((s) => s.id === preselectedServiceId);
      if (found) {
        setSelectedService(found);
        setSelectedCategory(found.category);
        if (preselectedAdditionalIds && preselectedAdditionalIds.length > 0) {
          const additional = preselectedAdditionalIds
            .map((id) => SERVICES_DATA.find((s) => s.id === id))
            .filter((s): s is ServiceItem => Boolean(s));
          setAdditionalServices(additional);
        } else {
          setAdditionalServices([]);
        }
        setStep(2);
      }
    } else {
      setAdditionalServices([]);
    }
    if (availableDates.length > 0 && !selectedDate) {
      setSelectedDate(availableDates[0].iso);
    }
  }, [preselectedServiceId, preselectedAdditionalIds, availableDates]);

  const totalPrice = (selectedService?.priceFrom || 0) + additionalServices.reduce((sum, s) => sum + s.priceFrom, 0);
  const totalDuration = (selectedService?.durationMinutes || 0) + additionalServices.reduce((sum, s) => sum + s.durationMinutes, 0);

  const handleServiceSelect = (service: ServiceItem) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleToggleAdditional = (item: ServiceItem) => {
    setAdditionalServices((prev) => {
      const exists = prev.some((s) => s.id === item.id);
      if (exists) {
        return prev.filter((s) => s.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleDateTimeConfirm = () => {
    if (!selectedDate || !selectedTime) return;
    setStep(3);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime || !clientName.trim() || !clientPhone.trim()) {
      return;
    }

    const newBooking: Booking = {
      id: 'book-' + Date.now(),
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      category: selectedService.category,
      additionalServices: additionalServices.map((a) => ({
        id: a.id,
        name: a.name,
        price: a.priceFrom,
        duration: a.durationMinutes,
      })),
      masterId: 'any',
      masterName: 'Свободный мастер',
      date: selectedDate,
      timeSlot: selectedTime,
      price: totalPrice,
      durationMinutes: totalDuration,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientComment: clientComment.trim(),
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    setConfirmedBooking(newBooking);
    onBookingSuccess(newBooking);
    setStep(4);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: isDark ? ['#FB7185', '#FFFFFF', '#3F3F46'] : ['#FB7185', '#18181B', '#FCE7F3'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleReset = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setSelectedService(null);
      setAdditionalServices([]);
      setSelectedTime('');
      setClientName('');
      setClientPhone('');
      setClientComment('');
      setConfirmedBooking(null);
    }, 300);
  };

  const filteredServices = selectedCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === selectedCategory);

  const availableAdditionals = SERVICES_DATA.filter(
    (s) => s.id !== selectedService?.id && (s.category === selectedService?.category || s.popular)
  ).slice(0, 4);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleReset}
            className="fixed inset-0 bg-transparent"
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`rounded-t-3xl sm:rounded-2xl max-w-lg w-full max-h-[92vh] flex flex-col overflow-hidden border relative text-left shadow-2xl transition-colors z-10 ${
              isDark ? 'bg-[#121217] border-[#27272A] text-white' : 'bg-white border-[#FCE7F3] text-[#18181B]'
            }`}
          >
            {/* Header */}
            <div className={`px-4 sm:px-5 py-3.5 border-b flex items-center justify-between shrink-0 ${
              isDark ? 'bg-[#181820] border-[#27272A]' : 'bg-[#FFF8F9] border-[#FCE7F3]'
            }`}>
              <div className="flex items-center gap-2.5">
                <TefiLogo size="sm" isDark={isDark} showSubtitle={false} />
                <div>
                  <h3 className="font-display text-sm sm:text-base font-bold leading-tight">
                    Онлайн-запись в «Тэфи»
                  </h3>
                  <p className="text-[11px] text-neutral-400">ул. Владимира Невского, 35</p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className={`p-2 rounded-xl text-neutral-400 hover:text-white cursor-pointer transition-colors ${
                  isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
                }`}
                aria-label="Закрыть"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step Progress Tracker (3 steps) */}
            {step <= 3 && (
              <div className={`px-4 sm:px-5 py-2 border-b text-[11px] font-medium flex items-center justify-between shrink-0 ${
                isDark ? 'bg-[#141419] border-[#27272A] text-neutral-400' : 'bg-[#FFF0F3]/50 border-[#FCE7F3] text-neutral-500'
              }`}>
                <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#FB7185] font-bold' : ''}`}>
                  <span className={`w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold ${
                    step >= 1 ? 'bg-[#FB7185] text-white' : 'bg-neutral-700 text-neutral-300'
                  }`}>1</span>
                  <span>Услуга</span>
                </div>
                <span className="text-neutral-500">→</span>
                <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#FB7185] font-bold' : ''}`}>
                  <span className={`w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold ${
                    step >= 2 ? 'bg-[#FB7185] text-white' : 'bg-neutral-700 text-neutral-300'
                  }`}>2</span>
                  <span>Дата & Время</span>
                </div>
                <span className="text-neutral-500">→</span>
                <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#FB7185] font-bold' : ''}`}>
                  <span className={`w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold ${
                    step >= 3 ? 'bg-[#FB7185] text-white' : 'bg-neutral-700 text-neutral-300'
                  }`}>3</span>
                  <span>Контакты</span>
                </div>
              </div>
            )}

            {/* Scrollable Content */}
            <div className="p-4 sm:p-5 overflow-y-auto flex-1 overscroll-contain">
              <AnimatePresence mode="wait">
                {/* STEP 1: Service */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-display text-sm font-bold">
                        Выберите желаемую услугу:
                      </h4>
                      <span className="text-[11px] text-[#FB7185] font-medium">Шаг 1 из 3</span>
                    </div>

                    {/* Category selector pills */}
                    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {[
                        { id: 'all', label: 'Все' },
                        { id: 'hair', label: 'Волосы' },
                        { id: 'nails', label: 'Ногти' },
                        { id: 'brows-lashes', label: 'Брови/Ресницы' },
                        { id: 'cosmetology', label: 'Косметология' },
                      ].map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedCategory(c.id as any)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap transition-all ${
                            selectedCategory === c.id
                              ? 'bg-[#FB7185] text-white shadow-xs'
                              : isDark ? 'bg-[#181820] text-neutral-400 hover:text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>

                    {/* Services list */}
                    <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                      {filteredServices.map((service) => (
                        <motion.div
                          key={service.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleServiceSelect(service)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            selectedService?.id === service.id
                              ? isDark ? 'border-[#FB7185] bg-[#FB7185]/10' : 'border-[#FB7185] bg-[#FFF0F3]'
                              : isDark ? 'border-[#27272A] hover:border-neutral-500 bg-[#15151B]' : 'border-[#FCE7F3] hover:border-[#FB7185] bg-white'
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs truncate">{service.name}</span>
                              {service.popular && (
                                <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider shrink-0 ${
                                  isDark ? 'bg-[#FB7185]/20 text-[#FB7185]' : 'bg-[#FFF0F3] text-[#FB7185]'
                                }`}>
                                  Топ
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                              {service.description}
                            </p>
                            <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-400">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-neutral-500" />
                                {service.durationMinutes} мин
                              </span>
                              <span>•</span>
                              <span className="font-bold text-neutral-300">
                                от {service.priceFrom.toLocaleString('ru-RU')} ₽
                              </span>
                            </div>
                          </div>
                          <span className="text-xs font-bold shrink-0 text-[#FB7185]">Выбрать →</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Date & Time + Free Master confirmation */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-display text-sm font-bold">Дата и время визита</h4>
                        <p className="text-[11px] text-neutral-400">
                          {selectedService?.name} • от {selectedService?.priceFrom} ₽
                        </p>
                      </div>
                      <button
                        onClick={() => setStep(1)}
                        className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer py-1 px-2 rounded-lg"
                      >
                        <ArrowLeft className="w-3 h-3" /> Назад
                      </button>
                    </div>

                    {/* Master choice banner: ONLY FREE MASTER */}
                    <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                      isDark ? 'bg-[#181822] border-[#27272A]' : 'bg-[#FFF8F9] border-[#FCE7F3]'
                    }`}>
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-[#FB7185]/20 text-[#FB7185] flex items-center justify-center shrink-0">
                          <UserCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold flex items-center gap-1.5">
                            <span>Свободный мастер</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-[#FB7185] text-white">
                              Выбрано
                            </span>
                          </div>
                          <div className="text-[10px] text-neutral-400">
                            Салон назначит свободного квалифицированного специалиста
                          </div>
                        </div>
                      </div>
                      <Check className="w-4 h-4 text-[#FB7185] shrink-0" />
                    </div>

                    {/* Dates Selector */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3 text-[#FB7185]" /> День визита:
                        </span>
                        <span className="text-[10px] text-neutral-400">Листайте вправо →</span>
                      </div>
                      <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-none snap-x">
                        {availableDates.map((d) => {
                          const isSelected = selectedDate === d.iso;
                          return (
                            <button
                              key={d.iso}
                              type="button"
                              onClick={() => setSelectedDate(d.iso)}
                              className={`p-2 rounded-xl text-center border transition-all cursor-pointer min-w-[58px] shrink-0 snap-start ${
                                isSelected
                                  ? 'bg-[#FB7185] text-white border-[#FB7185] shadow-sm'
                                  : isDark
                                    ? 'bg-[#181820] border-[#27272A] text-neutral-300 hover:border-neutral-500'
                                    : 'bg-[#FFF8F9] border-[#FCE7F3] text-neutral-700 hover:border-[#FB7185]'
                              }`}
                            >
                              <div className="text-[9px] uppercase font-bold">{d.dayName}</div>
                              <div className="text-base font-bold my-0.5">{d.dayNum}</div>
                              <div className="text-[9px] opacity-80">{d.monthName}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#FB7185]" /> Свободные окна на {selectedDate}:
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => {
                          const isSelected = selectedTime === time;
                          return (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 min-h-[42px] ${
                                isSelected
                                  ? 'bg-[#FB7185] text-white border-[#FB7185] shadow-sm'
                                  : isDark
                                    ? 'bg-[#181820] border-[#27272A] text-neutral-300 hover:border-neutral-500'
                                    : 'bg-[#FFF8F9] border-[#FCE7F3] text-neutral-700 hover:border-[#FB7185]'
                              }`}
                            >
                              <Clock className="w-3 h-3" />
                              <span>{time}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Optional Add-ons */}
                    {availableAdditionals.length > 0 && (
                      <div className="pt-1">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                          Добавить к записи (по желанию):
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {availableAdditionals.map((add) => {
                            const isAdded = additionalServices.some((s) => s.id === add.id);
                            return (
                              <div
                                key={add.id}
                                onClick={() => handleToggleAdditional(add)}
                                className={`p-2 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between text-xs ${
                                  isAdded
                                    ? 'border-[#FB7185] bg-[#FB7185]/15'
                                    : isDark ? 'border-[#27272A] bg-[#181820]/60' : 'border-[#FCE7F3] bg-white'
                                }`}
                              >
                                <span className="font-semibold truncate pr-1">{add.name}</span>
                                <span className="text-[11px] font-bold shrink-0 text-[#FB7185]">
                                  {isAdded ? '✓' : `+${add.priceFrom} ₽`}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* STEP 3: Client Info */}
                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.2 }}
                  >
                    <form onSubmit={handleFinalSubmit} id="booking-final-form" className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display text-sm font-bold">Контакты для подтверждения</h4>
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer py-1 px-2 rounded-lg"
                        >
                          <ArrowLeft className="w-3 h-3" /> Назад
                        </button>
                      </div>

                      {/* Summary card */}
                      <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                        isDark ? 'bg-[#181820] border-[#27272A]' : 'bg-[#FFF8F9] border-[#FCE7F3]'
                      }`}>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Услуга:</span>
                          <strong className="text-right">{selectedService?.name}</strong>
                        </div>
                        {additionalServices.length > 0 && (
                          <div className="flex justify-between text-[11px] text-neutral-400">
                            <span>Дополнительно:</span>
                            <span>{additionalServices.map(a => a.name).join(', ')}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Специалист:</span>
                          <strong>Свободный мастер салона</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Дата и время:</span>
                          <strong className="text-[#FB7185]">
                            {selectedDate} в {selectedTime}
                          </strong>
                        </div>
                        <div className="flex justify-between pt-1.5 border-t border-neutral-500/20">
                          <span className="text-neutral-400">Итого от:</span>
                          <strong className="text-sm font-bold">{totalPrice.toLocaleString('ru-RU')} ₽</strong>
                        </div>
                      </div>

                      {/* Inputs optimized for mobile: 16px font size to avoid iOS zoom */}
                      <div className="space-y-2.5">
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-400 mb-1">
                            Ваше имя *
                          </label>
                          <input
                            type="text"
                            required
                            autoComplete="name"
                            placeholder="Как к вам обращаться"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className={`w-full px-3.5 py-2.5 text-sm sm:text-xs rounded-xl border outline-none transition-colors ${
                              isDark
                                ? 'bg-[#181820] border-[#27272A] text-white focus:border-[#FB7185]'
                                : 'bg-white border-[#FCE7F3] text-[#18181B] focus:border-[#FB7185]'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-neutral-400 mb-1">
                            Номер телефона *
                          </label>
                          <input
                            type="tel"
                            required
                            inputMode="tel"
                            autoComplete="tel"
                            placeholder="+7 (___) ___-__-__"
                            value={clientPhone}
                            onChange={(e) => setClientPhone(e.target.value)}
                            className={`w-full px-3.5 py-2.5 text-sm sm:text-xs rounded-xl border outline-none transition-colors ${
                              isDark
                                ? 'bg-[#181820] border-[#27272A] text-white focus:border-[#FB7185]'
                                : 'bg-white border-[#FCE7F3] text-[#18181B] focus:border-[#FB7185]'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-neutral-400 mb-1">
                            Комментарий или пожелания (необязательно)
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Пожелания по длине, дизайну, аллергии..."
                            value={clientComment}
                            onChange={(e) => setClientComment(e.target.value)}
                            className={`w-full px-3.5 py-2 text-sm sm:text-xs rounded-xl border outline-none transition-colors resize-none ${
                              isDark
                                ? 'bg-[#181820] border-[#27272A] text-white focus:border-[#FB7185]'
                                : 'bg-white border-[#FCE7F3] text-[#18181B] focus:border-[#FB7185]'
                            }`}
                          />
                        </div>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* STEP 4: Success */}
                {step === 4 && confirmedBooking && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-3 space-y-3.5"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#FB7185] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#FB7185]/25">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>

                    <div>
                      <h4 className="font-display text-lg font-bold">
                        Запись подтверждена!
                      </h4>
                      <p className="text-xs text-neutral-400 mt-1">
                        Ждем вас, {confirmedBooking.clientName}, в «Тэфи» на ул. Владимира Невского, 35
                      </p>
                    </div>

                    <div className={`p-4 rounded-xl border text-xs text-left max-w-sm mx-auto space-y-1.5 ${
                      isDark ? 'bg-[#181820] border-[#27272A]' : 'bg-[#FFF8F9] border-[#FCE7F3]'
                    }`}>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Услуга:</span>
                        <strong className="text-right">{confirmedBooking.serviceName}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Специалист:</span>
                        <strong>{confirmedBooking.masterName}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Дата & Время:</span>
                        <strong className="text-[#FB7185]">
                          {confirmedBooking.date} в {confirmedBooking.timeSlot}
                        </strong>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-neutral-500/20">
                        <span className="text-neutral-400">Сумма от:</span>
                        <strong className="text-sm font-bold">{confirmedBooking.price} ₽</strong>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
                      <a
                        href={`https://wa.me/79525542414?text=${encodeURIComponent(
                          `Здравствуйте! Я записался(лась) на ${confirmedBooking.serviceName} на ${confirmedBooking.date} в ${confirmedBooking.timeSlot}. Имя: ${confirmedBooking.clientName}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Написать в WhatsApp</span>
                      </a>

                      <button
                        onClick={handleReset}
                        className={`w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                          isDark ? 'bg-white text-[#09090b] hover:bg-neutral-200' : 'bg-[#18181B] text-white hover:bg-neutral-800'
                        }`}
                      >
                        Готово
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sticky Mobile/Desktop Footer Controls */}
            {step < 4 && (
              <div className={`p-3 sm:p-4 border-t shrink-0 flex items-center justify-between gap-2 ${
                isDark ? 'bg-[#141419] border-[#27272A]' : 'bg-[#FFF8F9] border-[#FCE7F3]'
              }`}>
                {step === 1 && (
                  <div className="text-[11px] text-neutral-400">
                    Выберите услугу из списка выше
                  </div>
                )}

                {step === 2 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-3 py-2 text-xs font-semibold text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Назад
                    </button>

                    <button
                      disabled={!selectedDate || !selectedTime}
                      onClick={handleDateTimeConfirm}
                      className={`flex-1 sm:flex-none px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[42px] ${
                        selectedDate && selectedTime
                          ? 'bg-[#FB7185] text-white hover:bg-[#F43F5E] shadow-md shadow-[#FB7185]/20'
                          : 'opacity-40 cursor-not-allowed bg-neutral-600 text-neutral-300'
                      }`}
                    >
                      <span>Продолжить</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}

                {step === 3 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-3 py-2 text-xs font-semibold text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Назад
                    </button>

                    <button
                      type="submit"
                      form="booking-final-form"
                      className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md bg-[#FB7185] text-white hover:bg-[#F43F5E] shadow-[#FB7185]/25 min-h-[42px]"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Подтвердить запись</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
