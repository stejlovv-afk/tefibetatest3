import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ArrowUp, Sparkles } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { useTheme } from '../context/ThemeContext';

interface FloatingActionsProps {
  onOpenBooking: () => void;
  onOpenMyBookings: () => void;
  bookingsCount: number;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenBooking,
}) => {
  const { isDark } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Кнопка «Наверх» для быстрого возврата при скролле */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className={`fixed bottom-5 right-5 z-40 w-10 h-10 rounded-full border shadow-lg flex items-center justify-center transition-all cursor-pointer ${
              isDark
                ? 'bg-[#121217] border-[#27272A] text-white hover:border-[#FB7185]'
                : 'bg-white border-[#FCE7F3] text-[#18181B] hover:border-[#FB7185]'
            }`}
            aria-label="Наверх"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Desktop Floating Actions */}
      <div className="hidden lg:flex fixed bottom-6 right-18 z-40 items-center gap-2">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={SALON_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-lg transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </motion.a>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenBooking}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#FB7185]/25 cursor-pointer bg-[#FB7185] text-white hover:bg-[#F43F5E] transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Онлайн-запись</span>
        </motion.button>
      </div>
    </>
  );
};
