import React from 'react';
import { ArrowRight, Sparkles, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';
import { HERO_IMAGE } from '../data/cakes';

interface HeroProps {
  onExploreCollection: () => void;
  onOpenCustomizer: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCollection,
  onOpenCustomizer,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#ECE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Editorial Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            {/* Zero-pill metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A674D]">
              <span>Haute Pâtisserie Parisienne</span>
              <span aria-hidden="true" className="text-[#C4B2A3]">·</span>
              <span>100% Normandy Grass-Fed Butter</span>
              <span aria-hidden="true" className="text-[#C4B2A3]">·</span>
              <span>Bespoke Handcraft</span>
            </div>

            {/* Headline with balanced wrapping */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#1F1D1A] leading-[1.1] [text-wrap:balance]">
              Sculpted cakes for celebrations that linger in memory.
            </h1>

            {/* Body prose */}
            <p className="text-base sm:text-lg text-[#61554D] leading-relaxed max-w-xl font-normal">
              From delicate Valrhona cocoa entremets to intricate multi-tiered royal Lambeth cakes, our atelier crafts every single sponge from scratch using pure Tahitian vanilla, stone-ground flours, and zero artificial preservatives.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onExploreCollection}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#332A22] hover:bg-[#201A15] rounded-lg shadow-sm transition-all hover:translate-y-[-1px] cursor-pointer"
              >
                <span>Explore Signature Menu</span>
                <ArrowRight className="w-4 h-4 text-[#DDC0A0]" />
              </button>

              <button
                onClick={onOpenCustomizer}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#332A22] bg-[#EFE7DE] hover:bg-[#E6DCD1] border border-[#DDD1C4] rounded-lg transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#9C663C]" />
                <span>Launch Custom Studio</span>
              </button>
            </div>

            {/* Adjacent Trust Points (Section Adjacency) */}
            <div className="pt-6 border-t border-[#EAE1D7] grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-xs font-semibold text-[#2D2620]">24–48h Handcraft</div>
                <div className="text-xs text-[#7B6E64] mt-0.5">Slow-matured layers</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-[#2D2620]">Climate Courier</div>
                <div className="text-xs text-[#7B6E64] mt-0.5">Pristine temperature lock</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-[#2D2620]">Natural Flavors</div>
                <div className="text-xs text-[#7B6E64] mt-0.5">Zero artificial dyes</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Focal Anchor */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#EBE3D9] aspect-[16/11] border border-[#DDD2C5]">
              <img
                src={HERO_IMAGE}
                alt="Artisanal multi-tiered celebration cake with ivory buttercream piping and fresh figs"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
              />
              {/* Subtle gradient overlay at bottom for subtle caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-5 right-5 text-white flex items-center justify-between text-xs">
                <span className="font-serif italic text-sm tracking-wide">Grand Tiered Botanical Centerpiece</span>
                <span className="font-mono text-[11px] opacity-90 tracking-wider">Atelier Signature № 04</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
