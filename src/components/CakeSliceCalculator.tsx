import React, { useState, useId } from 'react';
import { Users, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface CakeSliceCalculatorProps {
  onSelectRecommendedTier: (tierId: string) => void;
}

export const CakeSliceCalculator: React.FC<CakeSliceCalculatorProps> = ({
  onSelectRecommendedTier,
}) => {
  const [guests, setGuests] = useState<number>(20);
  const [portionType, setPortionType] = useState<'dessert' | 'coffee'>('dessert');

  const guestSliderId = useId();

  // Calculation logic
  // Dessert slice: ~1.0 serving per guest
  // Coffee/Cocktail slice: ~0.7 serving needed per guest
  const effectiveServings = portionType === 'dessert' ? guests : Math.round(guests * 0.75);

  let recommendation = {
    tierId: 'tier-8',
    title: '8" Classic Grand',
    type: 'Single Tier',
    capacity: '12–16 dessert portions',
    description: 'Generous 4-layer cake with balanced proportions, perfect for tabletop centerpieces.',
  };

  if (effectiveServings <= 8) {
    recommendation = {
      tierId: 'tier-6',
      title: '6" Petite Celebration',
      type: 'Single Tier',
      capacity: '6–8 dessert portions',
      description: 'Intimate dinner party scale with towering four-layer presentation.',
    };
  } else if (effectiveServings <= 16) {
    recommendation = {
      tierId: 'tier-8',
      title: '8" Classic Grand',
      type: 'Single Tier',
      capacity: '12–16 dessert portions',
      description: 'Our most sought-after size. Ample slices with exquisite visual balance.',
    };
  } else if (effectiveServings <= 24) {
    recommendation = {
      tierId: 'tier-10',
      title: '10" Banquet Soirée',
      type: 'Single Tier',
      capacity: '20–26 dessert portions',
      description: 'Expansive single-tier statement with dramatic surface for piping.',
    };
  } else if (effectiveServings <= 36) {
    recommendation = {
      tierId: 'tier-2tier',
      title: 'Duo-Tier 6" + 8" Stature',
      type: 'Two-Tier Stacked',
      capacity: '24–32 dessert portions',
      description: 'Architectural two-tier masterpiece offering two distinct flavor profiles.',
    };
  } else {
    recommendation = {
      tierId: 'tier-3tier',
      title: 'Grand Gala 3-Tier',
      type: 'Three Tiers Stacked',
      capacity: '48–60 dessert portions',
      description: 'Grand luxury centerpiece for gala weddings, milestone anniversaries, and balls.',
    };
  }

  return (
    <section id="slice-calculator" className="py-16 lg:py-20 bg-[#FAF7F2] border-b border-[#EAE0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8A674D]">
            Celebration Concierge
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1F1D1A] mt-1 [text-wrap:balance]">
            Guest & Slice Estimator
          </h2>
          <p className="text-sm sm:text-base text-[#61554D] mt-2">
            Never under-order or produce excess waste. Calculate the exact architectural dimensions required based on your event dining format.
          </p>
        </div>

        <div className="bg-[#FFFDFB] rounded-2xl border border-[#E5DCD1] p-6 sm:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={guestSliderId} className="text-sm font-semibold text-[#241F1A]">
                  Expected Number of Guests:
                </label>
                <span className="text-2xl font-serif font-bold text-[#241F1A] font-mono tabular-nums">
                  {guests} <span className="text-sm font-sans font-normal text-[#78695E]">attendees</span>
                </span>
              </div>
              <input
                id={guestSliderId}
                type="range"
                min="4"
                max="75"
                step="1"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                className="w-full accent-[#3A3027] h-2 bg-[#EAE0D5] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-[#8C7D73] mt-1">
                <span>4 guests (Intimate)</span>
                <span>35 guests (Party)</span>
                <span>75 guests (Gala)</span>
              </div>
            </div>

            {/* Portion Type Selector */}
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#78695E] mb-2">
                Dining Style & Portion Size:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPortionType('dessert')}
                  className={`p-3.5 text-left rounded-xl border transition-all cursor-pointer ${
                    portionType === 'dessert'
                      ? 'bg-[#FAF5ED] border-[#3A3027] ring-1 ring-[#3A3027]'
                      : 'bg-white border-[#E8DEC9] hover:border-[#C4B4A5]'
                  }`}
                >
                  <div className="font-semibold text-xs text-[#241F1A]">Dessert Portion (Plated)</div>
                  <div className="text-[11px] text-[#6B5E54] mt-0.5">
                    Generous 2" × 2" slice served as the dedicated dessert course.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPortionType('coffee')}
                  className={`p-3.5 text-left rounded-xl border transition-all cursor-pointer ${
                    portionType === 'coffee'
                      ? 'bg-[#FAF5ED] border-[#3A3027] ring-1 ring-[#3A3027]'
                      : 'bg-white border-[#E8DEC9] hover:border-[#C4B4A5]'
                  }`}
                >
                  <div className="font-semibold text-xs text-[#241F1A]">Cocktail / Coffee Portion</div>
                  <div className="text-[11px] text-[#6B5E54] mt-0.5">
                    1" × 2" tall finger cut served alongside champagne or dessert buffet.
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="lg:col-span-5 bg-[#FAF5ED] border border-[#E3D7CB] rounded-xl p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8A674D]">
                Recommended Format
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#241F1A] mt-1">
                {recommendation.title}
              </h3>
              <div className="text-xs font-medium text-[#7A6B60] mt-0.5">
                {recommendation.type} · {recommendation.capacity}
              </div>
              <p className="text-xs text-[#5E5147] mt-3 leading-relaxed">
                {recommendation.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#E8DEC9]">
              <button
                type="button"
                onClick={() => onSelectRecommendedTier(recommendation.tierId)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#3A3027] hover:bg-[#201A15] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                <span>Configure in Custom Studio</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#DDC0A0]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
