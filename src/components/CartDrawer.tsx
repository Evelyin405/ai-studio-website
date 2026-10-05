import React, { useState, useId } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Calendar, Sparkles, Check } from 'lucide-react';
import { CartItem } from '../types/cake';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: (deliveryDate: string, giftNote: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [deliveryDate, setDeliveryDate] = useState(() => {
    // Default to tomorrow
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [giftNote, setGiftNote] = useState('');

  const dateInputId = useId();
  const giftNoteId = useId();

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const freeDeliveryThreshold = 120;
  const progressToFreeDelivery = Math.min(
    100,
    (subtotal / freeDeliveryThreshold) * 100
  );
  const amountNeeded = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-fade-in"
    >
      <div
        className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#E5DACD] animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E8DFD8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#3A3027]" />
            <h2 id="cart-drawer-title" className="text-xl font-serif font-bold text-[#1F1D1A]">
              Your Tasting Bag
            </h2>
            <span className="text-xs font-mono font-semibold text-[#8A7A6E]">
              ({items.reduce((acc, it) => acc + it.quantity, 0)})
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="p-1.5 text-[#594E46] hover:text-[#1F1D1A] hover:bg-[#F2ECE4] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="px-6 py-3 bg-[#F4EFEB] border-b border-[#E8DFD8]">
          <div className="flex items-center justify-between text-xs text-[#52463E] mb-1.5">
            {amountNeeded > 0 ? (
              <span>Add <strong className="font-mono">${amountNeeded.toFixed(2)}</strong> for Free Climate Courier</span>
            ) : (
              <span className="text-[#2E6B45] font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                Qualified for Free Climate Courier Delivery!
              </span>
            )}
            <span className="font-mono text-[11px] font-semibold">{Math.round(progressToFreeDelivery)}%</span>
          </div>
          <div className="w-full bg-[#E5DCD1] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#3A3027] h-full transition-all duration-500"
              style={{ width: `${progressToFreeDelivery}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#C4B4A5] mx-auto" />
              <p className="text-sm font-serif text-[#5E5147]">
                Your tasting bag is currently empty.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#3A3027] underline underline-offset-4 cursor-pointer"
              >
                Browse Signature Cakes
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white rounded-xl border border-[#E8DEC9] space-y-3 shadow-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-serif font-bold text-[#1F1D1A]">
                      {item.type === 'catalog'
                        ? item.product?.name
                        : `${item.customCake?.tierName} (Bespoke)`}
                    </h3>

                    {/* Custom details */}
                    {item.type === 'custom' && item.customCake && (
                      <div className="text-[11px] text-[#7A6B60] mt-1 space-y-0.5">
                        <div>
                          <strong>Sponge:</strong> {item.customCake.spongeFlavor}
                        </div>
                        <div>
                          <strong>Filling:</strong> {item.customCake.fillingFlavor}
                        </div>
                        <div>
                          <strong>Finish:</strong> {item.customCake.frostingStyle} ({item.customCake.exteriorColor})
                        </div>
                        {item.customCake.toppings.length > 0 && (
                          <div>
                            <strong>Toppings:</strong> {item.customCake.toppings.join(', ')}
                          </div>
                        )}
                        {item.customCake.pipedMessage && (
                          <div className="italic text-[#9C663C]">
                            "{item.customCake.pipedMessage}"
                          </div>
                        )}
                      </div>
                    )}

                    {/* Catalog inscription */}
                    {item.type === 'catalog' && item.inscriptionMessage && (
                      <div className="text-[11px] italic text-[#9C663C] mt-1">
                        Plaque: "{item.inscriptionMessage}"
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    aria-label="Remove item"
                    className="text-[#99887C] hover:text-[#8B263E] transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#F2ECE4]">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#D9CFC4] rounded-md overflow-hidden">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="px-2.5 py-1 text-xs text-[#3A3027] hover:bg-[#F2ECE4] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-2.5 py-1 text-xs font-mono font-bold text-[#3A3027] tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="px-2.5 py-1 text-xs text-[#3A3027] hover:bg-[#F2ECE4] cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <span className="font-serif text-sm font-bold text-[#1F1D1A] font-mono tabular-nums">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}

          {/* Delivery Date & Gift Card note */}
          {items.length > 0 && (
            <div className="pt-2 space-y-3">
              <div>
                <label htmlFor={dateInputId} className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#52463E] mb-1">
                  <Calendar className="w-3.5 h-3.5 text-[#8A674D]" />
                  <span>Celebration Delivery / Pickup Date</span>
                </label>
                <input
                  id={dateInputId}
                  type="date"
                  value={deliveryDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-lg text-xs text-[#241F1A] focus:outline-none focus:ring-1 focus:ring-[#3A3027]"
                />
              </div>

              <div>
                <label htmlFor={giftNoteId} className="text-xs font-semibold uppercase tracking-wider text-[#52463E] mb-1 block">
                  Complimentary Gift Message Card
                </label>
                <textarea
                  id={giftNoteId}
                  rows={2}
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Written by hand in ink on embossed card stock..."
                  className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-lg text-xs text-[#241F1A] placeholder:text-[#9E9187] focus:outline-none focus:ring-1 focus:ring-[#3A3027]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#E8DFD8] bg-[#F7F2EA] space-y-4">
            <div className="space-y-1.5 text-xs text-[#5E5147]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-semibold text-[#1F1D1A] tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Climate Courier Delivery</span>
                <span className="font-mono text-[#1F1D1A] tabular-nums">
                  {subtotal >= freeDeliveryThreshold ? (
                    <span className="text-[#2E6B45] font-semibold">Free</span>
                  ) : (
                    '$12.00'
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E8DFD8] flex justify-between text-base font-serif font-bold text-[#1F1D1A]">
                <span>Estimated Total</span>
                <span className="font-mono tabular-nums">
                  ${(subtotal >= freeDeliveryThreshold ? subtotal : subtotal + 12).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onProceedToCheckout(deliveryDate, giftNote)}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#3A3027] hover:bg-[#201A15] text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-sm transition-all cursor-pointer hover:translate-y-[-1px]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#DDC0A0]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
