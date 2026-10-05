import React, { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-[#241E19] text-[#E8DFD7] pt-16 pb-12 border-t border-[#382F28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#382F28]">
          {/* Brand & Ethos */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-2xl font-serif tracking-tight text-white block">
              Atelier Sucre
            </span>
            <p className="text-xs sm:text-sm text-[#B8AAA0] leading-relaxed max-w-sm">
              Artisanal French confectionery and bespoke tiered cakes, sculpted daily using organic Normandy churned butter, single-origin cacao, and handpicked seasonal fruit.
            </p>
            <div className="text-xs text-[#99887C] pt-2 font-mono">
              Certified French Pâtisserie Tradition № 482-FR
            </div>
          </div>

          {/* Boutique Atelier */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <span className="font-semibold uppercase tracking-wider text-white block font-sans">
              Boutique Atelier
            </span>
            <p className="text-[#B8AAA0] leading-relaxed">
              64 Rue Saint-Honoré<br />
              75001 Paris, France
            </p>
            <div className="pt-2 text-[#B8AAA0] space-y-1">
              <div><strong>Tuesday – Saturday:</strong> 08:30 – 19:30</div>
              <div><strong>Sunday:</strong> 09:00 – 16:00</div>
              <div><strong>Monday:</strong> Master Atelier Closed for Research</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <span className="font-semibold uppercase tracking-wider text-white block font-sans">
              Navigation
            </span>
            <ul className="space-y-2 text-[#B8AAA0]">
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  Signature Cakes
                </a>
              </li>
              <li>
                <a href="#custom-studio" className="hover:text-white transition-colors">
                  Custom Cake Studio
                </a>
              </li>
              <li>
                <a href="#flavor-anatomy" className="hover:text-white transition-colors">
                  Layer Anatomy
                </a>
              </li>
              <li>
                <a href="#slice-calculator" className="hover:text-white transition-colors">
                  Guest Slice Guide
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors">
                  Our Pastry Chefs
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Dispatch */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <span className="font-semibold uppercase tracking-wider text-white block font-sans">
              Tasting Journal
            </span>
            <p className="text-[#B8AAA0] leading-relaxed">
              Receive seasonal flavor releases, limited holiday bûche reservations, and private tasting invitations.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3 py-2 bg-[#2D2620] border border-[#4A3D34] rounded-l-lg text-xs text-white placeholder:text-[#8A796E] focus:outline-none focus:border-[#C5A059]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="px-3 bg-[#4A3D34] hover:bg-[#5C4D42] text-white rounded-r-lg transition-colors flex items-center justify-center cursor-pointer"
                >
                  {subscribed ? (
                    <Check className="w-4 h-4 text-[#7BB661]" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </div>
              {subscribed && (
                <span className="text-[11px] text-[#7BB661] block">
                  Bienvenue! You are now subscribed to our tasting journal.
                </span>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar (Clean unboxed text) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A796E] gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Atelier Sucre Inc.</span>
            <span aria-hidden="true">·</span>
            <span>All rights reserved</span>
            <span aria-hidden="true">·</span>
            <span>Handcrafted Daily</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Climate Controlled Delivery</span>
            <span aria-hidden="true">·</span>
            <span>Strict Allergen Protocols</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Patisserie</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
