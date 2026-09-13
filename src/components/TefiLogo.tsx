import React from 'react';

interface TefiLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  isDark?: boolean;
}

export const ORIGINAL_TEFI_LOGO_URL = '/favicon.svg';

export const TefiLogo: React.FC<TefiLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  isDark = false,
}) => {
  const config = {
    sm: {
      boxSize: 'w-8 h-8',
      svgSize: 'w-5 h-5',
      titleSize: 'text-sm',
      subSize: 'text-[9px]',
      addrSize: 'text-[8px]',
      gap: 'gap-2',
    },
    md: {
      boxSize: 'w-10 h-10 sm:w-11 sm:h-11',
      svgSize: 'w-6 h-6 sm:w-6.5 sm:h-6.5',
      titleSize: 'text-base sm:text-lg',
      subSize: 'text-[9px] sm:text-[10px]',
      addrSize: 'text-[9px] sm:text-[10px]',
      gap: 'gap-2.5',
    },
    lg: {
      boxSize: 'w-12 h-12 sm:w-14 sm:h-14',
      svgSize: 'w-7 h-7 sm:w-8 sm:h-8',
      titleSize: 'text-xl sm:text-2xl',
      subSize: 'text-[11px] sm:text-xs',
      addrSize: 'text-[10px] sm:text-xs',
      gap: 'gap-3',
    },
    xl: {
      boxSize: 'w-16 h-16 sm:w-20 sm:h-20',
      svgSize: 'w-9 h-9 sm:w-11 sm:h-11',
      titleSize: 'text-2xl sm:text-3xl',
      subSize: 'text-xs sm:text-sm',
      addrSize: 'text-xs sm:text-sm',
      gap: 'gap-3.5',
    },
  }[size];

  const textColor = isDark ? 'text-white' : 'text-[#18181B]';
  const subColor = isDark ? 'text-[#A1A1AA]' : 'text-[#71717A]';

  return (
    <div className={`inline-flex items-center ${config.gap} select-none group ${className}`}>
      {/* Фирменная эмблема «Т» салона Тэфи */}
      <div
        className={`relative shrink-0 ${config.boxSize} rounded-xl sm:rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-[1.04] shadow-sm ${
          isDark
            ? 'bg-[#181820] border border-[#FB7185]/40 shadow-[#FB7185]/10'
            : 'bg-white border border-[#FB7185]/30 shadow-[#FB7185]/15'
        }`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${config.svgSize} text-[#FB7185]`}
        >
          {/* Декоративная рамка-ромб */}
          <rect
            x="4"
            y="4"
            width="32"
            height="32"
            rx="8"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeOpacity="0.35"
          />
          {/* Каллиграфическая буква Т */}
          <path
            d="M11 13.5H29M20 13.5V28.5"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Изящные засечки */}
          <path
            d="M17.5 28.5H22.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M11 16V13.5M29 16V13.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Декоративная точка-акцент */}
          <circle cx="20" cy="8.5" r="1.5" fill="currentColor" />
        </svg>
      </div>

      {/* Название и статус */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-display font-extrabold tracking-[0.2em] uppercase leading-none ${textColor} ${config.titleSize}`}
          >
            ТЭФИ
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FB7185] shrink-0" />
        </div>

        {showSubtitle && (
          <div className="flex flex-col mt-0.5 sm:mt-1">
            <span
              className={`font-bold tracking-[0.22em] uppercase leading-none text-[#FB7185] ${config.subSize}`}
            >
              салон красоты
            </span>
            <span
              className={`font-medium tracking-normal mt-0.5 leading-tight ${subColor} ${config.addrSize}`}
            >
              ул. Владимира Невского, 35
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
