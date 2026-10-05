import React, { useState, useId } from 'react';
import {
  Sparkles,
  Check,
  Plus,
  Info,
  Layers,
  Palette,
  Cherry,
  PenTool,
  ShoppingBag,
  RotateCcw,
} from 'lucide-react';
import {
  CUSTOM_TIER_OPTIONS,
  SPONGE_FLAVORS,
  FILLING_FLAVORS,
  FROSTING_STYLES,
  EXTERIOR_PALETTES,
  TOPPING_OPTIONS,
} from '../data/cakes';
import { CustomCakeConfig } from '../types/cake';

interface CustomCakeStudioProps {
  onAddToCart: (customCake: CustomCakeConfig) => void;
}

export const CustomCakeStudio: React.FC<CustomCakeStudioProps> = ({ onAddToCart }) => {
  const [selectedTier, setSelectedTier] = useState(CUSTOM_TIER_OPTIONS[1]); // 8" Classic default
  const [selectedSponge, setSelectedSponge] = useState(SPONGE_FLAVORS[0]); // Vanilla Bourbon
  const [selectedFilling, setSelectedFilling] = useState(FILLING_FLAVORS[0]); // Raspberry Coulis
  const [selectedFrosting, setSelectedFrosting] = useState(FROSTING_STYLES[0]); // Smooth Swiss
  const [selectedPalette, setSelectedPalette] = useState(EXTERIOR_PALETTES[0]); // Chantilly Ivory
  const [selectedToppings, setSelectedToppings] = useState<string[]>([TOPPING_OPTIONS[0].id, TOPPING_OPTIONS[1].id]);
  const [pipedMessage, setPipedMessage] = useState('Happy Birthday Sophia');
  const [plaqueStyle, setPlaqueStyle] = useState<'gold' | 'chocolate' | 'sugar'>('gold');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [activeTab, setActiveTab] = useState<'size' | 'flavors' | 'finish' | 'toppings' | 'inscription'>('size');
  const [justAdded, setJustAdded] = useState(false);

  const plaqueInputId = useId();
  const instructionsInputId = useId();

  // Calculate total price
  const toppingsTotal = selectedToppings.reduce((sum, topId) => {
    const top = TOPPING_OPTIONS.find((t) => t.id === topId);
    return sum + (top ? top.price : 0);
  }, 0);

  const frostingExtra = selectedFrosting.extraPrice || 0;
  const fillingExtra = selectedFilling.extraPrice || 0;
  const totalPrice = selectedTier.basePrice + toppingsTotal + frostingExtra + fillingExtra;

  const toggleTopping = (id: string) => {
    setSelectedToppings((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    const customConfig: CustomCakeConfig = {
      id: `custom-${Date.now()}`,
      tierId: selectedTier.id,
      tierName: selectedTier.name,
      diameter: selectedTier.diameter,
      servesMin: selectedTier.servesMin,
      servesMax: selectedTier.servesMax,
      basePrice: selectedTier.basePrice,
      spongeFlavor: selectedSponge.name,
      spongeColor: selectedSponge.colorHex,
      fillingFlavor: selectedFilling.name,
      fillingColor: selectedFilling.colorHex,
      frostingStyle: selectedFrosting.name,
      exteriorColor: selectedPalette.name,
      exteriorHex: selectedPalette.hex,
      toppings: selectedToppings.map(
        (id) => TOPPING_OPTIONS.find((t) => t.id === id)?.name || ''
      ).filter(Boolean),
      toppingsPrice: toppingsTotal,
      pipedMessage: pipedMessage.trim(),
      plaqueStyle,
      specialInstructions: specialInstructions.trim(),
      totalPrice,
    };

    onAddToCart(customConfig);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2400);
  };

  const resetToDefault = () => {
    setSelectedTier(CUSTOM_TIER_OPTIONS[1]);
    setSelectedSponge(SPONGE_FLAVORS[0]);
    setSelectedFilling(FILLING_FLAVORS[0]);
    setSelectedFrosting(FROSTING_STYLES[0]);
    setSelectedPalette(EXTERIOR_PALETTES[0]);
    setSelectedToppings([TOPPING_OPTIONS[0].id, TOPPING_OPTIONS[1].id]);
    setPipedMessage('Happy Birthday Sophia');
    setPlaqueStyle('gold');
    setSpecialInstructions('');
  };

  return (
    <section id="custom-studio" className="py-16 lg:py-24 bg-[#FAF7F2] border-b border-[#ECE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A674D]">
            <span>Bespoke Confectionery Studio</span>
            <span aria-hidden="true">·</span>
            <span>Real-Time Layer Configurator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1F1D1A] mt-2 [text-wrap:balance]">
            Sculpt your custom cake layer by artisanal layer.
          </h2>
          <p className="text-base text-[#61554D] mt-3">
            Choose your architectural tier scale, single-origin sponges, fruit coulis or praline fillings, and hand-piped finishes. Watch your creation materialize in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Live Visual Cake Renderer */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <div className="bg-[#FAF5ED] border border-[#E4D9CC] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col items-center justify-center relative overflow-hidden min-h-[460px]">
              {/* Studio Backdrop glow */}
              <div className="absolute inset-0 bg-radial from-white/90 via-[#FAF5ED]/50 to-[#F2E8DC]/80 pointer-events-none" />

              {/* Pedestal Stand and Visual Layer Cake */}
              <div className="relative z-10 w-full flex flex-col items-center">
                {/* Toppings Layer (Top of Cake) */}
                <div className="relative flex items-center justify-center gap-2 mb-[-10px] z-20 transition-all duration-300">
                  {selectedToppings.includes('fresh-berries') && (
                    <div className="flex items-center -space-x-1 filter drop-shadow-md animate-fade-in">
                      <span className="w-5 h-5 rounded-full bg-[#B22234] border border-[#7D1120] inline-block shadow-inner" title="Raspberry" />
                      <span className="w-4 h-4 rounded-full bg-[#201A24] border border-black inline-block shadow-inner" title="Blackberry" />
                      <span className="w-5 h-5 rounded-full bg-[#C41E3A] border border-[#8B1428] inline-block shadow-inner" title="Raspberry" />
                    </div>
                  )}

                  {selectedToppings.includes('french-macarons') && (
                    <div className="flex items-center gap-1.5 filter drop-shadow-md">
                      <span className="w-5 h-3.5 rounded-full bg-[#F4D06F] border border-[#D4A328] inline-block" title="Vanilla Macaron" />
                      <span className="w-5 h-3.5 rounded-full bg-[#F2A6B0] border border-[#D97986] inline-block" title="Raspberry Macaron" />
                    </div>
                  )}

                  {selectedToppings.includes('gold-leaf') && (
                    <div className="flex items-center gap-1 text-[#C5A059] animate-pulse">
                      <Sparkles className="w-4 h-4 fill-[#C5A059]" />
                      <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#9C7A28]">24K Gold</span>
                    </div>
                  )}

                  {selectedToppings.includes('edible-florals') && (
                    <div className="flex items-center gap-1 filter drop-shadow-xs">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#9B5DE5] opacity-80" />
                      <span className="w-3.5 h-3.5 rounded-full bg-[#F15BB5] opacity-80" />
                    </div>
                  )}

                  {selectedToppings.includes('figs-thyme') && (
                    <span className="text-xs font-serif italic text-[#4A3222] bg-[#EBE2D7] px-2 py-0.5 rounded-md border border-[#D8C7B4]">
                      Mission Fig & Thyme
                    </span>
                  )}
                </div>

                {/* THE CAKE BODY (Dynamic visual tiers) */}
                <div className="flex flex-col items-center justify-center my-3 transition-all duration-300">
                  {/* Tier 3 (if 3-Tier selected) */}
                  {selectedTier.id === 'tier-3tier' && (
                    <div
                      className="w-32 h-14 rounded-t-lg border-2 border-black/10 shadow-sm relative overflow-hidden transition-all duration-300 flex flex-col justify-between"
                      style={{ backgroundColor: selectedPalette.hex }}
                    >
                      <div className="h-1.5 w-full bg-white/30" />
                      {/* Lambeth scallops if chosen */}
                      {selectedFrosting.type === 'piped' && (
                        <div className="absolute top-1 inset-x-0 flex justify-around text-white/70 text-[8px]">
                          <span>~</span><span>~</span><span>~</span><span>~</span>
                        </div>
                      )}
                      {/* Semi naked look */}
                      {selectedFrosting.type === 'naked' && (
                        <div className="absolute inset-0 opacity-40 bg-gradient-to-r from-transparent via-[#8B5A2B]/20 to-transparent" />
                      )}
                    </div>
                  )}

                  {/* Tier 2 (if 2-Tier or 3-Tier) */}
                  {(selectedTier.id === 'tier-2tier' || selectedTier.id === 'tier-3tier') && (
                    <div
                      className="w-44 h-16 rounded-t-lg border-2 border-black/10 shadow-md relative overflow-hidden transition-all duration-300 flex flex-col justify-between"
                      style={{ backgroundColor: selectedPalette.hex }}
                    >
                      <div className="h-1.5 w-full bg-white/20" />
                      {selectedFrosting.type === 'piped' && (
                        <div className="absolute top-1 inset-x-0 flex justify-around text-white/70 text-[9px]">
                          <span>~~~</span><span>~~~</span><span>~~~</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Main / Bottom Tier */}
                  <div
                    className={`rounded-t-xl border-2 border-black/10 shadow-lg relative overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                      selectedTier.id === 'tier-6'
                        ? 'w-48 h-24'
                        : selectedTier.id === 'tier-8'
                        ? 'w-56 h-28'
                        : selectedTier.id === 'tier-10'
                        ? 'w-64 h-32'
                        : 'w-60 h-28'
                    }`}
                    style={{ backgroundColor: selectedPalette.hex }}
                  >
                    {/* Top trim border */}
                    <div className="h-2 w-full bg-white/30" />

                    {/* Cutaway or Layer cross-section stripe preview */}
                    <div className="mx-4 my-auto p-1.5 bg-black/15 backdrop-blur-xs rounded-md border border-white/20 flex flex-col gap-1">
                      <div
                        className="h-2.5 rounded-xs w-full flex items-center justify-center text-[8px] font-mono text-white/90 truncate px-1"
                        style={{ backgroundColor: selectedSponge.colorHex }}
                      >
                        Sponge: {selectedSponge.name}
                      </div>
                      <div
                        className="h-2 rounded-xs w-full flex items-center justify-center text-[7px] font-mono text-white/90 truncate px-1"
                        style={{ backgroundColor: selectedFilling.colorHex }}
                      >
                        Filling: {selectedFilling.name}
                      </div>
                      <div
                        className="h-2.5 rounded-xs w-full flex items-center justify-center text-[8px] font-mono text-white/90 truncate px-1"
                        style={{ backgroundColor: selectedSponge.colorHex }}
                      >
                        Sponge: {selectedSponge.name}
                      </div>
                    </div>

                    {/* Lambeth bottom swag */}
                    {selectedFrosting.type === 'piped' && (
                      <div className="h-3 w-full flex justify-around items-center text-white/75 text-[11px] font-serif">
                        <span>◠</span><span>◠</span><span>◠</span><span>◠</span><span>◠</span><span>◠</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cake Plaque (Piped Message Banner) */}
                {pipedMessage && (
                  <div
                    className={`mt-2 px-4 py-1.5 rounded-md shadow-md text-center max-w-[240px] border transition-all ${
                      plaqueStyle === 'gold'
                        ? 'bg-[#FCF8EC] text-[#5C4217] border-[#D4AF37] shadow-[#D4AF37]/15'
                        : plaqueStyle === 'chocolate'
                        ? 'bg-[#291F18] text-[#F3EFE9] border-[#4A392C]'
                        : 'bg-white text-[#2D2620] border-[#E0D5C9]'
                    }`}
                  >
                    <span className="font-serif italic text-xs tracking-wide block truncate">
                      "{pipedMessage}"
                    </span>
                  </div>
                )}

                {/* Pedestal Footing */}
                <div className="w-64 h-3 bg-[#E0D7CC] rounded-full shadow-md mt-2 border-t border-white/60" />
                <div className="w-24 h-6 bg-gradient-to-b from-[#D4CBC0] to-[#BCB2A6] rounded-b-md shadow-md" />
                <div className="w-40 h-2 bg-[#A89E92] rounded-full mt-0.5 opacity-40 blur-[1px]" />
              </div>

              {/* Dynamic Live Spec Summary Footer inside Preview */}
              <div className="w-full mt-6 pt-4 border-t border-[#E8DEC9] text-xs text-[#6B5E54] flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#2D2620]">{selectedTier.name}</span>
                  <span className="mx-1.5">·</span>
                  <span>Serves {selectedTier.servesMin}–{selectedTier.servesMax}</span>
                </div>
                <div className="font-serif text-lg font-bold text-[#2D2620] font-mono tabular-nums">
                  ${totalPrice}
                </div>
              </div>
            </div>

            {/* Quick Reset action */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={resetToDefault}
                className="inline-flex items-center gap-1.5 text-xs text-[#806E62] hover:text-[#2D2620] transition-colors py-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Selections</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Step-by-Step Customization Panel */}
          <div className="lg:col-span-7 space-y-6">
            {/* Navigation Tabs (Functional button controls) */}
            <div className="flex items-center gap-1 p-1 bg-[#ECE3DA] rounded-xl overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('size')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'size'
                    ? 'bg-white text-[#241F1A] shadow-xs'
                    : 'text-[#61554D] hover:text-[#241F1A]'
                }`}
              >
                1. Size & Tiers
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('flavors')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'flavors'
                    ? 'bg-white text-[#241F1A] shadow-xs'
                    : 'text-[#61554D] hover:text-[#241F1A]'
                }`}
              >
                2. Sponge & Filling
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('finish')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'finish'
                    ? 'bg-white text-[#241F1A] shadow-xs'
                    : 'text-[#61554D] hover:text-[#241F1A]'
                }`}
              >
                3. Frosting & Tint
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('toppings')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'toppings'
                    ? 'bg-white text-[#241F1A] shadow-xs'
                    : 'text-[#61554D] hover:text-[#241F1A]'
                }`}
              >
                4. Toppings
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('inscription')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'inscription'
                    ? 'bg-white text-[#241F1A] shadow-xs'
                    : 'text-[#61554D] hover:text-[#241F1A]'
                }`}
              >
                5. Piped Plaque
              </button>
            </div>

            {/* TAB CONTENT: 1. SIZE & TIERS */}
            {activeTab === 'size' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-serif font-semibold text-[#241F1A]">Select Cake Scale & Tiers</h3>
                  <span className="text-xs text-[#7A6B60]">Includes reinforced pastry cake-board</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CUSTOM_TIER_OPTIONS.map((tier) => {
                    const isSelected = selectedTier.id === tier.id;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSelectedTier(tier)}
                        className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white border-[#3A3027] ring-1 ring-[#3A3027] shadow-sm'
                            : 'bg-[#FDFCFA] border-[#E8DEC9] hover:border-[#C4B4A5]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-semibold text-[#241F1A] text-base">{tier.name}</span>
                          <span className="font-mono text-sm font-bold text-[#3A3027]">${tier.basePrice}</span>
                        </div>
                        <div className="text-xs text-[#806E62] mt-1 font-medium">
                          {tier.diameter} · Serves {tier.servesMin}–{tier.servesMax}
                        </div>
                        <p className="text-xs text-[#6B5E54] mt-2 line-clamp-2 leading-relaxed">
                          {tier.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB CONTENT: 2. SPONGE & FILLING */}
            {activeTab === 'flavors' && (
              <div className="space-y-6 animate-fade-in">
                {/* Sponge selection */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-serif font-semibold text-[#241F1A]">1. Sponge Flavor (Baked From Scratch)</h3>
                    <span className="text-xs text-[#7A6B60]">Natural extracts only</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SPONGE_FLAVORS.map((sponge) => {
                      const isSelected = selectedSponge.id === sponge.id;
                      return (
                        <button
                          key={sponge.id}
                          type="button"
                          onClick={() => setSelectedSponge(sponge)}
                          className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white border-[#3A3027] ring-1 ring-[#3A3027]'
                              : 'bg-[#FDFCFA] border-[#E8DEC9] hover:border-[#C4B4A5]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                              style={{ backgroundColor: sponge.colorHex }}
                            />
                            <span className="text-sm font-semibold text-[#241F1A]">{sponge.name}</span>
                          </div>
                          <p className="text-xs text-[#6B5E54] mt-1.5 leading-normal">
                            {sponge.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Filling selection */}
                <div className="pt-4 border-t border-[#ECE3DA]">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-serif font-semibold text-[#241F1A]">2. Confiture or Ganache Filling</h3>
                    <span className="text-xs text-[#7A6B60]">Layered between sponges</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {FILLING_FLAVORS.map((filling) => {
                      const isSelected = selectedFilling.id === filling.id;
                      return (
                        <button
                          key={filling.id}
                          type="button"
                          onClick={() => setSelectedFilling(filling)}
                          className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white border-[#3A3027] ring-1 ring-[#3A3027]'
                              : 'bg-[#FDFCFA] border-[#E8DEC9] hover:border-[#C4B4A5]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span
                                className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                                style={{ backgroundColor: filling.colorHex }}
                              />
                              <span className="text-sm font-semibold text-[#241F1A]">{filling.name}</span>
                            </div>
                            {filling.extraPrice > 0 && (
                              <span className="text-xs font-mono font-bold text-[#8A674D]">
                                +${filling.extraPrice}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#6B5E54] mt-1.5 leading-normal">
                            {filling.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 3. FROSTING & EXTERIOR PALETTE */}
            {activeTab === 'finish' && (
              <div className="space-y-6 animate-fade-in">
                {/* Frosting Technique */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-serif font-semibold text-[#241F1A]">Piping & Surface Finish</h3>
                    <span className="text-xs text-[#7A6B60]">Crafted by master decorators</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {FROSTING_STYLES.map((frost) => {
                      const isSelected = selectedFrosting.id === frost.id;
                      return (
                        <button
                          key={frost.id}
                          type="button"
                          onClick={() => setSelectedFrosting(frost)}
                          className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white border-[#3A3027] ring-1 ring-[#3A3027]'
                              : 'bg-[#FDFCFA] border-[#E8DEC9] hover:border-[#C4B4A5]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-[#241F1A]">{frost.name}</span>
                            {frost.extraPrice && frost.extraPrice > 0 && (
                              <span className="text-xs font-mono font-bold text-[#8A674D]">
                                +${frost.extraPrice}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#6B5E54] mt-1.5 leading-normal">
                            {frost.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Exterior Palette Tint */}
                <div className="pt-4 border-t border-[#ECE3DA]">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-serif font-semibold text-[#241F1A]">Exterior Palette Tint</h3>
                    <span className="text-xs text-[#7A6B60]">Natural vegetable & botanical tints</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {EXTERIOR_PALETTES.map((pal) => {
                      const isSelected = selectedPalette.id === pal.id;
                      return (
                        <button
                          key={pal.id}
                          type="button"
                          onClick={() => setSelectedPalette(pal)}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white border-[#3A3027] ring-1 ring-[#3A3027]'
                              : 'bg-[#FDFCFA] border-[#E8DEC9] hover:border-[#C4B4A5]'
                          }`}
                        >
                          <span
                            className="w-5 h-5 rounded-full border border-black/25 shrink-0 shadow-xs"
                            style={{ backgroundColor: pal.hex }}
                          />
                          <span className="text-xs font-medium text-[#241F1A] truncate">{pal.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 4. TOPPINGS & GARNISHES */}
            {activeTab === 'toppings' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-serif font-semibold text-[#241F1A]">Crown Garnishes & Accents</h3>
                  <span className="text-xs text-[#7A6B60]">Select multiple crowns</span>
                </div>
                <div className="space-y-2.5">
                  {TOPPING_OPTIONS.map((top) => {
                    const isSelected = selectedToppings.includes(top.id);
                    return (
                      <button
                        key={top.id}
                        type="button"
                        onClick={() => toggleTopping(top.id)}
                        className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                          isSelected
                            ? 'bg-white border-[#3A3027] ring-1 ring-[#3A3027]'
                            : 'bg-[#FDFCFA] border-[#E8DEC9] hover:border-[#C4B4A5]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                              isSelected
                                ? 'bg-[#3A3027] border-[#3A3027] text-white'
                                : 'border-[#C4B4A5] bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-[#241F1A]">{top.name}</span>
                            <p className="text-xs text-[#6B5E54]">{top.description}</p>
                          </div>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#8A674D] tabular-nums shrink-0 ml-4">
                          +${top.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB CONTENT: 5. PIPED PLAQUE & INSCRIPTION */}
            {activeTab === 'inscription' && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor={plaqueInputId} className="text-lg font-serif font-semibold text-[#241F1A]">
                      Piped Inscription Message
                    </label>
                    <span className="text-xs font-mono text-[#7A6B60]">
                      {pipedMessage.length}/35 characters
                    </span>
                  </div>
                  <input
                    id={plaqueInputId}
                    type="text"
                    maxLength={35}
                    value={pipedMessage}
                    onChange={(e) => setPipedMessage(e.target.value)}
                    placeholder="e.g., Happy 30th Birthday Claire!"
                    className="w-full px-4 py-3 bg-white border border-[#D9CFC4] rounded-xl text-sm text-[#241F1A] placeholder:text-[#9E9187] focus:outline-none focus:ring-2 focus:ring-[#3A3027]"
                  />
                  <p className="text-xs text-[#7A6B60] mt-1.5">
                    Our calligrapher hand-pipes this message onto an artisanal sugar plaque positioned on the cake.
                  </p>
                </div>

                <div>
                  <span className="block text-sm font-semibold text-[#241F1A] mb-2">Plaque Material Style</span>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'gold', name: '24K Gold Rim Plaque' },
                      { id: 'chocolate', name: 'Tempered Dark Chocolate' },
                      { id: 'sugar', name: 'Pressed White Almond Fondant' },
                    ].map((plaque) => (
                      <button
                        key={plaque.id}
                        type="button"
                        onClick={() => setPlaqueStyle(plaque.id as any)}
                        className={`p-3 text-xs font-medium rounded-xl border text-center transition-all cursor-pointer ${
                          plaqueStyle === plaque.id
                            ? 'bg-white border-[#3A3027] ring-1 ring-[#3A3027] text-[#241F1A] font-semibold'
                            : 'bg-[#FDFCFA] border-[#E8DEC9] text-[#6B5E54] hover:text-[#241F1A]'
                        }`}
                      >
                        {plaque.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor={instructionsInputId} className="block text-sm font-semibold text-[#241F1A] mb-1.5">
                    Special Pastry Chef Notes (Optional)
                  </label>
                  <textarea
                    id={instructionsInputId}
                    rows={2}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Please arrange berries on the left rim only, nut allergy for 1 guest, need 10 birthday candles..."
                    className="w-full px-4 py-2.5 bg-white border border-[#D9CFC4] rounded-xl text-xs text-[#241F1A] placeholder:text-[#9E9187] focus:outline-none focus:ring-2 focus:ring-[#3A3027]"
                  />
                </div>
              </div>
            )}

            {/* Bottom Sticky Action Bar inside Studio */}
            <div className="pt-4 border-t border-[#E8DEC9] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-[#7A6B60] font-medium">Bespoke Total Estimation</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-serif font-bold text-[#241F1A] font-mono tabular-nums">
                    ${totalPrice}
                  </span>
                  <span className="text-xs text-[#7A6B60]">
                    ({selectedTier.servesMin}–{selectedTier.servesMax} servings · ~${(totalPrice / selectedTier.servesMax).toFixed(2)}/slice)
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm ${
                  justAdded
                    ? 'bg-[#2E6B45] text-white'
                    : 'bg-[#3A3027] hover:bg-[#201A15] text-white hover:translate-y-[-1px]'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Added To Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#DDC0A0]" />
                    <span>Add Custom Creation To Bag</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
