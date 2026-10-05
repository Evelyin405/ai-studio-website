import React, { useState, useId } from 'react';
import {
  X,
  CheckCircle2,
  Truck,
  Store,
  CreditCard,
  Banknote,
  ShieldCheck,
  Calendar,
  Clock,
  Printer,
  Sparkles,
} from 'lucide-react';
import { CartItem, OrderDetails } from '../types/cake';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  deliveryDate: string;
  giftNote: string;
  onOrderSuccess: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  deliveryDate,
  giftNote,
  onOrderSuccess,
}) => {
  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [address, setAddress] = useState('');
  const [timeSlot, setTimeSlot] = useState('13:00 - 17:00 (Afternoon)');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  const nameInputId = useId();
  const phoneInputId = useId();
  const emailInputId = useId();
  const addressInputId = useId();
  const timeSlotId = useId();

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const deliveryFee = fulfillmentType === 'delivery' ? (subtotal >= 120 ? 0 : 12) : 0;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || (fulfillmentType === 'delivery' && !address)) {
      alert('Please fill out the required contact and address details.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const order: OrderDetails = {
        orderId: `AS-${Math.floor(10000 + Math.random() * 90000)}`,
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        customerName,
        customerPhone,
        customerEmail,
        fulfillmentType,
        deliveryAddress: fulfillmentType === 'delivery' ? address : 'Atelier Sucre Boutique (64 Rue Saint-Honoré, Paris)',
        deliveryDate,
        deliveryTimeSlot: timeSlot,
        giftMessage: giftNote,
        items,
        subtotal,
        deliveryFee,
        discount: 0,
        total,
        paymentMethod,
        status: 'confirmed',
      };

      setCompletedOrder(order);
      setIsSubmitting(false);
      onOrderSuccess(order);
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E8DFD8] overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E8DFD8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 id="checkout-modal-title" className="text-xl sm:text-2xl font-serif font-bold text-[#1F1D1A]">
              {completedOrder ? 'Celebration Order Confirmed' : 'Checkout & Celebration Schedule'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout"
            className="p-1.5 text-[#594E46] hover:text-[#1F1D1A] hover:bg-[#F2ECE4] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Form vs Confirmation */}
        {completedOrder ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-[#2E6B45]/10 text-[#2E6B45] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#1F1D1A]">
                Merci, {completedOrder.customerName}!
              </h3>
              <p className="text-xs sm:text-sm text-[#61554D] max-w-md mx-auto">
                Order <strong className="font-mono text-[#1F1D1A]">{completedOrder.orderId}</strong> has been secured in our production registry. Our confectionery team will begin tempering and layering 24 hours prior to delivery.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-[#FAF5ED] border border-[#E5DCD1] rounded-xl p-5 space-y-3 text-xs">
              <div className="flex justify-between border-b border-[#E8DEC9] pb-2 text-[#7A6B60]">
                <span>Fulfillment Schedule</span>
                <span className="font-semibold text-[#241F1A]">
                  {completedOrder.deliveryDate} · {completedOrder.deliveryTimeSlot}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#E8DEC9] pb-2 text-[#7A6B60]">
                <span>Method</span>
                <span className="font-semibold text-[#241F1A] capitalize">
                  {completedOrder.fulfillmentType === 'delivery'
                    ? 'Refrigerated Climate Courier'
                    : 'Boutique Pickup'}
                </span>
              </div>
              {completedOrder.deliveryAddress && (
                <div className="flex justify-between border-b border-[#E8DEC9] pb-2 text-[#7A6B60]">
                  <span>Destination</span>
                  <span className="font-medium text-[#241F1A] max-w-[260px] text-right truncate">
                    {completedOrder.deliveryAddress}
                  </span>
                </div>
              )}
              <div className="flex justify-between border-b border-[#E8DEC9] pb-2 text-[#7A6B60]">
                <span>Payment</span>
                <span className="font-semibold text-[#241F1A]">
                  {completedOrder.paymentMethod === 'cod'
                    ? 'Cash on Delivery / Pickup'
                    : 'Debit/Credit Card Verified'}
                </span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-serif font-bold text-[#1F1D1A]">
                <span>Total Amount</span>
                <span className="font-mono tabular-nums">${completedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-3 px-4 bg-white border border-[#D9CFC4] hover:bg-[#F2ECE4] text-xs font-semibold uppercase tracking-wider text-[#3A3027] rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Order Receipt</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-[#3A3027] hover:bg-[#201A15] text-xs font-semibold uppercase tracking-wider text-white rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Return to Boutique
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Fulfillment Type Selector */}
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#52463E] mb-2">
                Fulfillment Preference
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFulfillmentType('delivery')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    fulfillmentType === 'delivery'
                      ? 'bg-white border-[#3A3027] ring-1 ring-[#3A3027] shadow-xs'
                      : 'bg-[#FAF5ED] border-[#E8DEC9] hover:border-[#C4B4A5]'
                  }`}
                >
                  <Truck className="w-4 h-4 text-[#8A674D] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#241F1A]">Climate Courier</div>
                    <div className="text-[11px] text-[#7A6B60] mt-0.5">
                      {subtotal >= 120 ? 'Free Delivery' : '$12.00 Flat rate'}
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfillmentType('pickup')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    fulfillmentType === 'pickup'
                      ? 'bg-white border-[#3A3027] ring-1 ring-[#3A3027] shadow-xs'
                      : 'bg-[#FAF5ED] border-[#E8DEC9] hover:border-[#C4B4A5]'
                  }`}
                >
                  <Store className="w-4 h-4 text-[#8A674D] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#241F1A]">Atelier Boutique Pickup</div>
                    <div className="text-[11px] text-[#7A6B60] mt-0.5">Free · Complimentary espresso</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Recipient Details */}
            <div className="space-y-3.5">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#52463E]">
                Recipient & Contact
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={nameInputId} className="block text-[11px] font-semibold text-[#52463E] mb-1">
                    Full Name *
                  </label>
                  <input
                    id={nameInputId}
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Jacqueline Vane"
                    className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-lg text-xs text-[#241F1A] focus:outline-none focus:ring-1 focus:ring-[#3A3027]"
                  />
                </div>

                <div>
                  <label htmlFor={phoneInputId} className="block text-[11px] font-semibold text-[#52463E] mb-1">
                    Mobile Phone (For Delivery SMS) *
                  </label>
                  <input
                    id={phoneInputId}
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. +1 (555) 234-5678"
                    className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-lg text-xs text-[#241F1A] focus:outline-none focus:ring-1 focus:ring-[#3A3027]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={emailInputId} className="block text-[11px] font-semibold text-[#52463E] mb-1">
                  Email Address (For Order Tracking Receipt) *
                </label>
                <input
                  id={emailInputId}
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="e.g. jacqueline@example.com"
                  className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-lg text-xs text-[#241F1A] focus:outline-none focus:ring-1 focus:ring-[#3A3027]"
                />
              </div>

              {fulfillmentType === 'delivery' && (
                <div>
                  <label htmlFor={addressInputId} className="block text-[11px] font-semibold text-[#52463E] mb-1">
                    Complete Street Address & Apartment/Gate Code *
                  </label>
                  <input
                    id={addressInputId}
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                    className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-lg text-xs text-[#241F1A] focus:outline-none focus:ring-1 focus:ring-[#3A3027]"
                  />
                </div>
              )}

              {/* Time slot selector */}
              <div>
                <label htmlFor={timeSlotId} className="block text-[11px] font-semibold text-[#52463E] mb-1">
                  Preferred Time Window on {deliveryDate}
                </label>
                <select
                  id={timeSlotId}
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#D9CFC4] rounded-lg text-xs text-[#241F1A] focus:outline-none focus:ring-1 focus:ring-[#3A3027]"
                >
                  <option value="09:00 - 12:00 (Morning)">09:00 - 12:00 (Morning Slot)</option>
                  <option value="13:00 - 17:00 (Afternoon)">13:00 - 17:00 (Afternoon Slot)</option>
                  <option value="17:00 - 20:00 (Evening)">17:00 - 20:00 (Evening Slot)</option>
                </select>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#52463E] mb-2">
                Payment Option
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'bg-white border-[#3A3027] ring-1 ring-[#3A3027] shadow-xs'
                      : 'bg-[#FAF5ED] border-[#E8DEC9] hover:border-[#C4B4A5]'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-[#8A674D] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#241F1A]">
                      {fulfillmentType === 'delivery' ? 'Cash on Delivery (COD)' : 'Pay at Boutique'}
                    </div>
                    <div className="text-[11px] text-[#7A6B60] mt-0.5">Pay upon inspecting cake</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-white border-[#3A3027] ring-1 ring-[#3A3027] shadow-xs'
                      : 'bg-[#FAF5ED] border-[#E8DEC9] hover:border-[#C4B4A5]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#8A674D] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#241F1A]">Credit / Debit Card</div>
                    <div className="text-[11px] text-[#7A6B60] mt-0.5">Secure simulated checkout</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Order Total & Submit */}
            <div className="pt-4 border-t border-[#E8DFD8] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#7A6B60] block font-mono">Total Due</span>
                <span className="text-2xl font-serif font-bold text-[#1F1D1A] font-mono tabular-nums">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 px-6 bg-[#3A3027] hover:bg-[#201A15] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? 'Securing Celebration...' : 'Confirm Celebration Order'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
