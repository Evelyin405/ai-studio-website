import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Sparkles, Cake } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateToCustomizer: () => void;
  onNavigateToCatalog: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigateToCustomizer,
  onNavigateToCatalog,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8DFD8] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-2xl sm:text-3xl font-serif tracking-tight text-[#241F1A] hover:text-[#7D5A44] transition-colors"
        >
          Atelier Sucre
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-[14px] font-medium tracking-wide text-[#594E46]">
          <a
            href="#collection"
            onClick={onNavigateToCatalog}
            className="hover:text-[#1F1D1A] transition-colors"
          >
            Signature Cakes
          </a>
          <a
            href="#custom-studio"
            onClick={onNavigateToCustomizer}
            className="hover:text-[#1F1D1A] transition-colors flex items-center gap-1.5"
          >
            <span>Custom Studio</span>
            <span className="text-[10px] font-sans font-semibold tracking-wider text-[#A06D3B] uppercase">Bespoke</span>
          </a>
          <a
            href="#flavor-anatomy"
            className="hover:text-[#1F1D1A] transition-colors"
          >
            Flavors & Layers
          </a>
          <a
            href="#slice-calculator"
            className="hover:text-[#1F1D1A] transition-colors"
          >
            Slice Calculator
          </a>
          <a
            href="#story"
            className="hover:text-[#1F1D1A] transition-colors"
          >
            Our Story
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToCustomizer}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#3A3027] hover:bg-[#251E17] rounded-lg transition-colors whitespace-nowrap shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E6C280]" />
            <span>Design Custom</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="relative p-2.5 text-[#3A3027] hover:text-[#1F1D1A] hover:bg-[#F2ECE4] rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[#3A3027]"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-[20px] px-1 text-[11px] font-bold font-mono tabular-nums text-white bg-[#964734] rounded-full shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-[#3A3027] hover:bg-[#F2ECE4] rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DFD8] bg-[#FAF8F5] px-4 pt-4 pb-6 space-y-3 shadow-lg">
          <a
            href="#collection"
            onClick={() => {
              onNavigateToCatalog();
              setMobileMenuOpen(false);
            }}
            className="block py-2 text-base font-medium text-[#3A3027] hover:text-[#7D5A44]"
          >
            Signature Cakes
          </a>
          <a
            href="#custom-studio"
            onClick={() => {
              onNavigateToCustomizer();
              setMobileMenuOpen(false);
            }}
            className="block py-2 text-base font-medium text-[#3A3027] hover:text-[#7D5A44]"
          >
            Custom Studio (Cake Builder)
          </a>
          <a
            href="#flavor-anatomy"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#3A3027] hover:text-[#7D5A44]"
          >
            Flavors & Layers Anatomy
          </a>
          <a
            href="#slice-calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#3A3027] hover:text-[#7D5A44]"
          >
            Guest & Slice Calculator
          </a>
          <a
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#3A3027] hover:text-[#7D5A44]"
          >
            Our Story & Ingredients
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                onNavigateToCustomizer();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-white bg-[#3A3027] rounded-lg shadow-sm"
            >
              Start Custom Cake Builder
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
