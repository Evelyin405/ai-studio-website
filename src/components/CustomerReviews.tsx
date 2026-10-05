import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/cakes';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-16 lg:py-20 bg-[#FAF8F5] border-b border-[#E8DFD8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8A674D]">
            Celebration Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1F1D1A] mt-1 [text-wrap:balance]">
            Trusted for life’s most cherished occasions.
          </h2>
          <p className="text-sm sm:text-base text-[#61554D] mt-2">
            Over 2,400 bespoke cakes delivered across the metropolitan area with flawless temperature control and rave reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CUSTOMER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#FDFCFB] rounded-2xl p-6 border border-[#E8DEC9] flex flex-col justify-between shadow-xs hover:border-[#CFBEB0] transition-colors"
            >
              <div className="space-y-4">
                {/* Stars and date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#C5A059] text-[#C5A059]"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#8C7D73] font-mono">
                    {review.date}
                  </span>
                </div>

                {/* Comment quote */}
                <p className="text-xs sm:text-sm text-[#4A4038] leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Author and occasion (unboxed text) */}
              <div className="pt-4 mt-4 border-t border-[#EFE8E1]">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#241F1A]">
                  <span>{review.author}</span>
                  {review.verified && (
                    <CheckCircle className="w-3.5 h-3.5 text-[#3A7D44]" />
                  )}
                </div>
                <div className="text-[11px] text-[#7A6B60] mt-0.5">
                  {review.occasion} · <span className="italic">{review.cake}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
