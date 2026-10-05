import React from 'react';
import { ARTISAN_CHEF_IMAGE } from '../data/cakes';
import { Sparkles, Award, Clock, Heart } from 'lucide-react';

export const BakeryStory: React.FC = () => {
  return (
    <section id="story" className="py-16 lg:py-24 bg-[#FAF7F2] border-b border-[#E8DFD8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Artisan Portrait */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#DFD5C8] aspect-[4/3] bg-[#E8DFD3]">
              <img
                src={ARTISAN_CHEF_IMAGE}
                alt="Pastry Chef in linen apron delicately decorating an artisanal tiered celebration cake in a sunlit bakery"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-5 right-5 text-white flex items-center justify-between text-xs">
                <span className="font-serif italic text-sm">Chef Eléonore Dubois</span>
                <span className="font-mono text-[11px] opacity-90">Parisian Master Confectioner</span>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A674D]">
              <span>Our Heritage</span>
              <span aria-hidden="true">·</span>
              <span>Pure Craftsmanship</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-[#1F1D1A] [text-wrap:balance]">
              Slow pastry, rooted in time-honored French discipline.
            </h2>

            <p className="text-base text-[#61554D] leading-relaxed">
              Atelier Sucre was founded on a simple conviction: celebration cakes should taste even more magnificent than they look. We reject hyper-sweet commercial fondants, shortening, and synthetic extracts.
            </p>

            <p className="text-sm text-[#61554D] leading-relaxed">
              Every sponge is baked fresh within hours of delivery. Our Swiss and Italian meringues are beaten to silky gloss using pasture-raised eggs and 84% butterfat churned cream from Normandy. When you slice into an Atelier Sucre creation, you taste pure cocoa beans, mountain raspberries, and floral vanilla bean seeds.
            </p>

            {/* Principles Checklist */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#E8DEC9]">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#3A3027]">
                  No Shortening or Palm Oil
                </div>
                <p className="text-xs text-[#7B6E64] mt-1">
                  100% pure dairy butter with natural melt characteristics.
                </p>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#3A3027]">
                  48-Hour Cold Maturation
                </div>
                <p className="text-xs text-[#7B6E64] mt-1">
                  Allows delicate ganaches and biscuit infusions to meld flawlessly.
                </p>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#3A3027]">
                  Single-Origin Cacao
                </div>
                <p className="text-xs text-[#7B6E64] mt-1">
                  Valrhona Guanaja 70% and Caraïbe 66% chocolate beans.
                </p>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#3A3027]">
                  Zero Artificial Dyes
                </div>
                <p className="text-xs text-[#7B6E64] mt-1">
                  Colored exclusively with beet juice, spirulina, turmeric, and matcha.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
