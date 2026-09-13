import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Trash2, Sparkles } from 'lucide-react';
import { Booking } from '../types';
import { SALON_INFO } from '../data/salonData';
import { useTheme } from '../context/ThemeContext';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
  onOpenBooking: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  onOpenBooking,
}) => {
  const { isDark } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`rounded-2xl max-w-lg w-full overflow-hidden border relative text-left my-6 flex flex-col max-h-[85vh] shadow-2xl transition-colors ${
              isDark ? 'bg-[#121217] border-[#27272A] text-white' : 'bg-white border-[#FCE7F3] text-[#18181B]'
            }`}
          >
            {/* Header */}
            <div className={`px-5 py-4 border-b flex items-center justify-between ${
              isDark ? 'bg-[#181820] border-[#27272A]' : 'bg-[#FFF8F9] border-[#FCE7F3]'
            }`}>
              <div>
                <h3 className="font-display text-base font-bold flex items-center gap-2">
                  <span>Мои записи в салон «Тэфи»</span>
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

            {/* Content */}
            <div className="p-5 overflow-y-auto flex-1 space-y-3">
              {bookings.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center bg-[#FB7185]/10 text-[#FB7185]">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h4 className="font-display text-sm font-bold">
                    У вас пока нет активных записей
                  </h4>
                  <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                    Выберите желаемую услугу и забронируйте удобное время визита со свободным мастером.
                  </p>
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        onClose();
                        onOpenBooking();
                      }}
                      className="px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all bg-[#FB7185] text-white shadow-lg shadow-[#FB7185]/25 min-h-[44px]"
                    >
                      Записаться на процедуру
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl border space-y-2.5 ${
                        isDark ? 'bg-[#181820] border-[#27272A]' : 'bg-[#FFF8F9] border-[#FCE7F3]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-display font-bold text-sm">
                            {item.serviceName}
                          </div>
                          <div className="text-xs text-neutral-400 mt-0.5">
                            Специалист: <span className="text-[#FB7185] font-semibold">{item.masterName || 'Свободный мастер смены'}</span>
                          </div>
                        </div>

                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Подтверждено
                        </span>
                      </div>

                      <div className={`p-3 rounded-xl text-xs flex items-center justify-between ${
                        isDark ? 'bg-[#121217]' : 'bg-white'
                      }`}>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#FB7185]" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#FB7185]" />
                          <span>{item.timeSlot}</span>
                        </div>
                        <div>
                          <strong className="text-sm font-bold text-[#FB7185]">{item.price} ₽</strong>
                        </div>
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => onCancelBooking(item.id)}
                          className="text-xs text-rose-500 hover:text-rose-400 flex items-center gap-1.5 cursor-pointer py-1.5 px-2 rounded-lg hover:bg-rose-500/10 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Отменить бронь</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  <p className="text-[11px] text-neutral-400 pt-2 text-center">
                    Для переноса времени свяжитесь с нами: <a href={`tel:${SALON_INFO.phoneMobileClean}`} className="text-[#FB7185] underline">{SALON_INFO.phoneCity}</a>
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={`px-5 py-3 border-t flex justify-end ${
              isDark ? 'bg-[#181820] border-[#27272A]' : 'bg-[#FFF8F9] border-[#FCE7F3]'
            }`}>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-neutral-500/30 hover:bg-neutral-500/10 cursor-pointer min-h-[40px]"
              >
                Закрыть
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
