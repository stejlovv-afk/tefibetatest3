/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ReviewsSection } from './components/ReviewsSection';
import { AboutSection } from './components/AboutSection';
import { ContactsSection } from './components/ContactsSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { BookingModal } from './components/BookingModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { NewReviewModal } from './components/NewReviewModal';
import { Booking, Review } from './types';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const { isDark } = useTheme();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [preselectedAdditionalIds, setPreselectedAdditionalIds] = useState<string[] | undefined>(undefined);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isNewReviewOpen, setIsNewReviewOpen] = useState(false);

  // Local storage persistence for user bookings
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('tefi_user_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Local storage persistence for user reviews
  const [customReviews, setCustomReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('tefi_custom_reviews');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tefi_user_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error('Failed to save bookings to localStorage', e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem('tefi_custom_reviews', JSON.stringify(customReviews));
    } catch (e) {
      console.error('Failed to save reviews to localStorage', e);
    }
  }, [customReviews]);

  const handleOpenBooking = (serviceId?: string, additionalIds?: string[]) => {
    setPreselectedServiceId(serviceId);
    setPreselectedAdditionalIds(additionalIds);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  const handleAddReview = (newReview: Review) => {
    setCustomReviews((prev) => [newReview, ...prev]);
  };

  const handleExplorePortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        isDark
          ? 'bg-[#09090b] text-[#F4F4F5] selection:bg-[#FB7185] selection:text-white'
          : 'bg-[#FFF8F9] text-[#18181B] selection:bg-[#FB7185] selection:text-white'
      }`}
    >
      {/* Top Header */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        bookingsCount={bookings.length}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Showcase */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExplorePortfolio={handleExplorePortfolio}
        />

        {/* 2. Services & Pricing with direct booking links */}
        <ServicesSection
          onSelectServiceForBooking={(serviceId, additionalServiceIds) =>
            handleOpenBooking(serviceId, additionalServiceIds)
          }
        />

        {/* 3. Portfolio with Before/After Slider & Gallery */}
        <PortfolioSection
          onSelectServiceForBooking={(serviceId) => handleOpenBooking(serviceId)}
        />

        {/* 4. Real Yandex Reviews & User Feedback Submission */}
        <ReviewsSection
          onOpenNewReviewModal={() => setIsNewReviewOpen(true)}
          customReviews={customReviews}
        />

        {/* 5. About Salon, Standards, Amenities & Masters */}
        <AboutSection onOpenBooking={() => handleOpenBooking()} />

        {/* 6. Contacts & Fast Communication Channels */}
        <ContactsSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
      />

      {/* Floating Action Bars (Mobile & Desktop) */}
      <FloatingActions
        onOpenBooking={() => handleOpenBooking()}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        bookingsCount={bookings.length}
      />

      {/* Interactive Booking Wizard Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setPreselectedServiceId(undefined);
          setPreselectedAdditionalIds(undefined);
        }}
        preselectedServiceId={preselectedServiceId}
        preselectedAdditionalIds={preselectedAdditionalIds}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* My Bookings Modal */}
      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        onOpenBooking={() => {
          setIsMyBookingsOpen(false);
          setIsBookingOpen(true);
        }}
      />

      {/* New Review Modal */}
      <NewReviewModal
        isOpen={isNewReviewOpen}
        onClose={() => setIsNewReviewOpen(false)}
        onSubmitReview={handleAddReview}
      />
    </div>
  );
}
