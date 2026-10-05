import React, { useState } from 'react';
import { Eye, Plus, Star, Sparkles, AlertCircle } from 'lucide-react';
import { CAKE_PRODUCTS } from '../data/cakes';
import { CakeProduct } from '../types/cake';

interface ProductCatalogProps {
  onSelectProduct: (product: CakeProduct) => void;
  onQuickAdd: (product: CakeProduct) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectProduct,
  onQuickAdd,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = CAKE_PRODUCTS.filter((product) => {
    const matchesCategory =
      activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.flavorProfile.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="collection" className="py-16 lg:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E8DFD8]">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8A674D]">
              Artisanal Repertory
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1F1D1A] mt-1 [text-wrap:balance]">
              Signature cakes, baked fresh to your celebration date.
            </h2>
            <p className="text-sm sm:text-base text-[#61554D] mt-2">
              Every entremet and celebration cake is crafted in limited daily batches with certified organic dairy and slow-tempered single-origin chocolate.
            </p>
          </div>

          {/* Interactive Category Segmented Tabs (Functional Buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EFE8DF] rounded-xl self-start md:self-auto">
            {[
              { id: 'all', label: 'All Creations' },
              { id: 'entremets', label: 'Entremets' },
              { id: 'celebration', label: 'Celebration' },
              { id: 'wedding', label: 'Grand Tiered' },
              { id: 'dietary', label: 'Plant-Based / GF' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-white text-[#241F1A] shadow-xs font-semibold'
                    : 'text-[#61554D] hover:text-[#241F1A]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-[#F5EFE8] rounded-2xl border border-[#E3D7CB] p-8">
            <p className="text-[#5E5147] text-base font-serif">
              No cakes found matching your filter criteria.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#241F1A] bg-white rounded-lg border border-[#D5C6B7] hover:bg-[#F2ECE3] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((cake) => (
              <article
                key={cake.id}
                className="group flex flex-col bg-[#FDFCFB] rounded-2xl overflow-hidden border border-[#E8DFD8] hover:border-[#CFBEB0] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                {/* Product Image (Takes 65-75% height feel) */}
                <div
                  className="relative aspect-[4/3] bg-[#EBE3D9] overflow-hidden cursor-pointer"
                  onClick={() => onSelectProduct(cake)}
                >
                  <img
                    src={cake.image}
                    alt={cake.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle scrim overlay on hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(cake);
                      }}
                      className="px-3.5 py-2 bg-white/95 text-[#241F1A] text-xs font-semibold rounded-lg shadow-md hover:bg-white transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details & Custom Message</span>
                    </button>
                  </div>
                </div>

                {/* Product Metadata & Content (Zero-pill discipline) */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Unboxed category and serving specs */}
                    <div className="flex items-center gap-2 text-xs text-[#8A7A6E]">
                      <span className="uppercase font-semibold tracking-wider text-[#9E6E45]">
                        {cake.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{cake.serves}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 text-[#3A3027]">
                        <Star className="w-3 h-3 fill-[#C5A059] text-[#C5A059]" />
                        <span className="font-mono font-semibold">{cake.rating}</span>
                      </span>
                    </div>

                    {/* Cake Title */}
                    <h3
                      onClick={() => onSelectProduct(cake)}
                      className="text-xl font-serif text-[#1F1D1A] font-semibold mt-2 cursor-pointer group-hover:text-[#8A5E38] transition-colors leading-snug"
                    >
                      {cake.name}
                    </h3>

                    {/* Tagline / Flavor Notes */}
                    <p className="text-xs text-[#6B5E54] mt-1.5 line-clamp-2 leading-relaxed">
                      {cake.flavorProfile}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-3 border-t border-[#EFE8E1] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#8A7A6E] block font-mono">From</span>
                      <span className="text-xl font-serif font-bold text-[#1F1D1A] font-mono tabular-nums">
                        ${cake.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(cake)}
                        className="px-3.5 py-2 text-xs font-semibold text-[#3A3027] bg-[#F2ECE4] hover:bg-[#E8DED3] rounded-lg transition-colors cursor-pointer"
                      >
                        Customize
                      </button>
                      <button
                        type="button"
                        onClick={() => onQuickAdd(cake)}
                        aria-label={`Quick add ${cake.name} to cart`}
                        className="p-2 bg-[#3A3027] hover:bg-[#201A15] text-white rounded-lg transition-colors cursor-pointer shadow-xs"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
