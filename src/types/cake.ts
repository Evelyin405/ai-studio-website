export type CakeCategory = 'all' | 'entremets' | 'celebration' | 'wedding' | 'dietary';

export interface CakeProduct {
  id: string;
  name: string;
  tagline: string;
  category: 'entremets' | 'celebration' | 'wedding' | 'dietary';
  price: number;
  serves: string;
  leadTimeHours: number;
  image: string;
  description: string;
  layers: string[];
  allergens: string[];
  dietaryFlags: string[];
  rating: number;
  reviewCount: number;
  dimensions: string;
  flavorProfile: string;
}

export interface CustomCakeConfig {
  id: string;
  tierId: string;
  tierName: string;
  diameter: string;
  servesMin: number;
  servesMax: number;
  basePrice: number;
  spongeFlavor: string;
  spongeColor: string;
  fillingFlavor: string;
  fillingColor: string;
  frostingStyle: string;
  exteriorColor: string;
  exteriorHex: string;
  toppings: string[];
  toppingsPrice: number;
  pipedMessage: string;
  plaqueStyle: 'gold' | 'chocolate' | 'sugar';
  specialInstructions: string;
  totalPrice: number;
}

export interface CartItem {
  id: string;
  type: 'catalog' | 'custom';
  product?: CakeProduct;
  customCake?: CustomCakeConfig;
  selectedSize?: string;
  quantity: number;
  unitPrice: number;
  inscriptionMessage?: string;
  deliveryDate?: string;
  giftCardMessage?: string;
}

export interface OrderDetails {
  orderId: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  fulfillmentType: 'delivery' | 'pickup';
  deliveryAddress?: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  giftMessage?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: 'card' | 'cod';
  status: 'confirmed' | 'baking' | 'decorating' | 'ready';
}
