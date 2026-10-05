import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CustomCakeStudio } from './components/CustomCakeStudio';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductModal } from './components/ProductModal';
import { CakeSliceCalculator } from './components/CakeSliceCalculator';
import { FlavorAnatomy } from './components/FlavorAnatomy';
import { BakeryStory } from './components/BakeryStory';
import { CustomerReviews } from './components/CustomerReviews';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { CakeProduct, CustomCakeConfig, CartItem, OrderDetails } from './types/cake';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CakeProduct | null>(null);
  const [checkoutDeliveryDate, setCheckoutDeliveryDate] = useState('');
  const [checkoutGiftNote, setCheckoutGiftNote] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  // Add signature catalog cake
  const handleAddCatalogCake = (
    product: CakeProduct,
    quantity: number,
    inscription: string
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.type === 'catalog' &&
          item.product?.id === product.id &&
          item.inscriptionMessage === inscription
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      const newItem: CartItem = {
        id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        type: 'catalog',
        product,
        quantity,
        unitPrice: product.price,
        inscriptionMessage: inscription,
      };
      return [...prev, newItem];
    });

    showToast(`Added ${quantity}× "${product.name}" to your tasting bag`);
  };

  // Add custom cake creation
  const handleAddCustomCake = (customCake: CustomCakeConfig) => {
    const newItem: CartItem = {
      id: `custom-item-${Date.now()}`,
      type: 'custom',
      customCake,
      quantity: 1,
      unitPrice: customCake.totalPrice,
      inscriptionMessage: customCake.pipedMessage,
    };

    setCartItems((prev) => [...prev, newItem]);
    showToast(`Added Bespoke ${customCake.tierName} to your tasting bag`);
    setIsCartOpen(true);
  };

  // Quick add from catalog card
  const handleQuickAdd = (product: CakeProduct) => {
    handleAddCatalogCake(product, 1, '');
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleProceedToCheckout = (deliveryDate: string, giftNote: string) => {
    setCheckoutDeliveryDate(deliveryDate);
    setCheckoutGiftNote(giftNote);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: OrderDetails) => {
    // Clear cart after successful checkout
    setCartItems([]);
  };

  const scrollToCustomizer = () => {
    const el = document.getElementById('custom-studio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1F1D1A]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#241F1A] text-white px-5 py-3 rounded-xl shadow-xl border border-[#4A3D34] text-xs font-medium flex items-center gap-3 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#7BB661]" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="underline underline-offset-2 text-[#E6C280] hover:text-white cursor-pointer ml-1"
          >
            View Bag
          </button>
        </div>
      )}

      {/* 3-Zone Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateToCustomizer={scrollToCustomizer}
        onNavigateToCatalog={scrollToCatalog}
      />

      {/* Main Experience */}
      <main className="flex-1">
        {/* Campaign Hero */}
        <Hero
          onExploreCollection={scrollToCatalog}
          onOpenCustomizer={scrollToCustomizer}
        />

        {/* Signature Cake Catalog */}
        <ProductCatalog
          onSelectProduct={(product) => setSelectedProduct(product)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Bespoke Custom Cake Studio */}
        <CustomCakeStudio onAddToCart={handleAddCustomCake} />

        {/* Slice & Guest Calculator */}
        <CakeSliceCalculator
          onSelectRecommendedTier={(tierId) => {
            scrollToCustomizer();
          }}
        />

        {/* Flavor & Layer Anatomy */}
        <FlavorAnatomy />

        {/* Bakery Heritage & Sourcing */}
        <BakeryStory />

        {/* Customer Proof & Testimonials */}
        <CustomerReviews />
      </main>

      {/* Contiguous Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddCatalogCake}
      />

      {/* Sliding Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Full Checkout & Order Confirmation Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        deliveryDate={checkoutDeliveryDate}
        giftNote={checkoutGiftNote}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}
