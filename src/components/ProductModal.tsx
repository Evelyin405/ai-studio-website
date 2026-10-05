import React, { useState, useId } from 'react';
import { X, Star, Clock, AlertTriangle, ShieldCheck, Check, ShoppingBag } from 'lucide-react';
import { CakeProduct } from '../types/cake';

interface ProductModalProps {
  product: CakeProduct | null;
  onClose: () => void;
  onAddToCart: (product: CakeProduct, quantity: number, inscription: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [inscription, setInscription] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  const plaqueInputId = useId();

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity, inscription.trim());
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E8DFD8] overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-[#332A22] rounded-full shadow-xs transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image & Visual Presence */}
          <div className="md:col-span-6 bg-[#EBE3D9] relative min-h-[300px] md:min-h-[460px]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg text-xs font-mono text-[#332A22] border border-[#DDD3C7] shadow-xs">
              {product.dimensions}
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category and Lead Time */}
              <div className="flex items-center gap-2 text-xs text-[#8A7A6E]">
                <span className="uppercase font-semibold tracking-wider text-[#9E6E45]">
                  {product.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>{product.serves}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-[#3A3027]">
                  <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                  <span className="font-mono font-bold">{product.rating}</span>
                  <span className="text-[#8A7A6E]">({product.reviewCount})</span>
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h2 id="product-modal-title" className="text-2xl sm:text-3xl font-serif font-bold text-[#1F1D1A]">
                  {product.name}
                </h2>
                <p className="text-sm italic font-serif text-[#6B5E54] mt-1">
                  {product.tagline}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#1F1D1A] font-mono tabular-nums">
                  ${product.price}
                </span>
                <span className="text-xs text-[#806E62]">tax included · freshly prepared</span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#594E46] leading-relaxed">
                {product.description}
              </p>

              {/* Layer Anatomy */}
              <div className="pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6B60] block mb-2">
                  Artisanal Layer Architecture:
                </span>
                <ul className="space-y-1.5 text-xs text-[#52463E]">
                  {product.layers.map((layer, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] shrink-0" />
                      <span>{layer}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Allergen & Dietary Info */}
              <div className="p-3 bg-[#F4EFEB] rounded-xl border border-[#E3D9CE] space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-[#59493E]">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#A5693F] shrink-0" />
                  <span className="font-semibold">Allergens:</span>
                  <span>{product.allergens.join(', ')}</span>
                </div>
                <div className="text-[11px] text-[#7A6D63] pl-5">
                  Prepared in our certified Parisian confectionery atelier.
                </div>
              </div>

              {/* Custom Inscription Plaque Input */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor={plaqueInputId} className="text-xs font-semibold uppercase tracking-wider text-[#594E46]">
                    Hand-Piped Message Plaque (Complimentary)
                  </label>
                  <span className="text-[11px] font-mono text-[#8A7A6E]">
                    {inscription.length}/30
                  </span>
                </div>
                <input
                  id={plaqueInputId}
                  type="text"
                  maxLength={30}
                  value={inscription}
                  onChange={(e) => setInscription(e.target.value)}
                  placeholder="e.g. Joyeux Anniversaire Emma"
                  className="w-full px-3.5 py-2 bg-white border border-[#D9CFC4] rounded-lg text-xs text-[#241F1A] placeholder:text-[#9E9187] focus:outline-none focus:ring-1 focus:ring-[#3A3027]"
                />
              </div>
            </div>

            {/* Bottom Actions: Quantity + Add to Bag */}
            <div className="pt-4 border-t border-[#E8DFD8] flex items-center gap-4">
              {/* Stepper */}
              <div className="flex items-center border border-[#D9CFC4] rounded-lg bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-sm font-semibold text-[#3A3027] hover:bg-[#F2ECE4] transition-colors cursor-pointer"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-mono font-bold text-[#3A3027] tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-sm font-semibold text-[#3A3027] hover:bg-[#F2ECE4] transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Primary Buy CTA */}
              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm ${
                  justAdded
                    ? 'bg-[#2E6B45] text-white'
                    : 'bg-[#3A3027] hover:bg-[#201A15] text-white'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Added To Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#DDC0A0]" />
                    <span>Add to Bag · ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
