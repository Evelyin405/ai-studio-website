import React, { useState } from 'react';
import { Layers, Sparkles, ShieldCheck, Heart } from 'lucide-react';

const ANATOMY_LAYERS = [
  {
    id: 'garnish',
    layerName: '01. Crown Garnish & Accents',
    role: 'Aesthetic & Botanical Finish',
    description:
      'Hand-applied 24K edible gold leaf, fresh organic berries picked the morning of delivery, French almond macarons, and pesticide-free edible violas.',
    sourcing: 'Direct from organic coastal berry farms & Grasse floral growers.',
  },
  {
    id: 'glaze',
    layerName: '02. Mirror Glaze or Swiss Buttercream',
    role: 'Texture & Exterior Barrier',
    description:
      'High-gloss chocolate glaze tempered to 31°C or slow-whipped Italian meringue buttercream made with grass-fed Normandy butter for a silky melt-in-mouth mouthfeel.',
    sourcing: '100% Normandy AOP Butter (Beurre d’Isigny).',
  },
  {
    id: 'mousse',
    layerName: '03. Crème Mousseline & Ganache',
    role: 'Silky Flavor Foundation',
    description:
      'Infused with Grand Cru Tahitian vanilla bean caviar or single-origin Valrhona Guanaja dark chocolate. Never sweetened with high-fructose corn syrups.',
    sourcing: 'Tahitian Planifolia vanilla beans & Valrhona B-Corp chocolate.',
  },
  {
    id: 'insert',
    layerName: '04. Slow-Simmered Confiture Insert',
    role: 'Vibrant Acidic Contrast',
    description:
      'Pure wild mountain raspberry or Japanese Kochi yuzu curd, gently cooked in small copper basins to preserve bright natural acidity and clean fruit perfume.',
    sourcing: 'Whole fruit reductions with organic cane sugar.',
  },
  {
    id: 'crunch',
    layerName: '05. Praliné Feuillantine Crisp',
    role: 'Textural Counterpoint',
    description:
      'Caramelized French crêpe dentelle flakes folded into stone-ground roasted Piedmont hazelnut or Sicilian pistachio paste with a touch of Guérande fleur de sel.',
    sourcing: 'Piedmont IGP Hazelnuts & hand-harvested sea salt.',
  },
  {
    id: 'sponge',
    layerName: '06. Biscuit Joconde or Chiffon Sponge',
    role: 'Moisture & Structure Base',
    description:
      'Airy almond sponge soaked in subtle herbal syrups (Calabrian bergamot or Ethiopian single-origin espresso) that keeps the cake tender for over 72 hours without drying.',
    sourcing: 'Stone-ground unbleached flour & free-range pasture eggs.',
  },
];

export const FlavorAnatomy: React.FC = () => {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(2); // Mousseline default
  const active = ANATOMY_LAYERS[selectedLayerIndex];

  return (
    <section id="flavor-anatomy" className="py-16 lg:py-24 bg-[#FAF8F5] border-b border-[#E8DFD8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8A674D]">
            Pastry Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1F1D1A] mt-1 [text-wrap:balance]">
            The anatomy of an Atelier Sucre creation.
          </h2>
          <p className="text-sm sm:text-base text-[#61554D] mt-2">
            Every cake is an architectural symphony of temperature, acidity, crunch, and aroma. Click each stratum below to inspect our ingredient sourcing and technique.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Layer Selector Stack */}
          <div className="lg:col-span-6 space-y-2.5">
            {ANATOMY_LAYERS.map((layer, idx) => {
              const isSelected = selectedLayerIndex === idx;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setSelectedLayerIndex(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-white border-[#3A3027] ring-1 ring-[#3A3027] shadow-sm'
                      : 'bg-[#FDFCFB] border-[#E8DEC9] hover:border-[#C4B4A5]'
                  }`}
                >
                  <div>
                    <span className="text-xs font-serif font-bold text-[#8A674D] block">
                      {layer.layerName}
                    </span>
                    <span className="text-sm font-semibold text-[#241F1A]">
                      {layer.role}
                    </span>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full border transition-all ${
                      isSelected ? 'bg-[#3A3027] border-[#3A3027]' : 'bg-[#EAE0D5] border-transparent'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Layer Detail Focus Panel */}
          <div className="lg:col-span-6 bg-[#FAF5ED] border border-[#E3D7CB] rounded-2xl p-8 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8A674D]">
                Layer Deep-Dive
              </span>
              <span className="text-xs font-serif italic text-[#7A6B60]">
                Calibrated to ±0.5°C
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold text-[#241F1A]">
                {active.layerName}
              </h3>
              <div className="text-xs font-semibold text-[#7A6B60] mt-1">
                {active.role}
              </div>
            </div>

            <p className="text-sm text-[#52463E] leading-relaxed">
              {active.description}
            </p>

            <div className="pt-4 border-t border-[#E8DEC9] space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8A674D]">
                Provenance & Sourcing:
              </div>
              <p className="text-xs text-[#6B5E54] bg-white p-3 rounded-lg border border-[#E0D5C9]">
                {active.sourcing}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
