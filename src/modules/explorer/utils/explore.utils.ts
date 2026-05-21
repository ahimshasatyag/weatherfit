import type { ExploreOutfit, Accessory } from '../types/explore.types';

// High Quality Curated Outfits Database
export const MOCK_OUTFITS: ExploreOutfit[] = [
  // Streetwear
  {
    id: 'outfit-street-1',
    name: 'Neo-Tokyo Oversized Fit',
    category: 'streetwear',
    image: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=800&auto=format&fit=crop',
    weather: 'windy',
    style: 'Oversized Streetwear',
    gender: 'unisex',
    season: 'autumn',
    activity: 'hangout',
    pieces: ['Oversized Graphic Sweatshirt', 'Black Double-Loop Cargo Pants', 'Chunky Platform Sneakers'],
    rating: 4.8,
    likes: 342
  },
  {
    id: 'outfit-street-2',
    name: 'Cyberpunk Utility Set',
    category: 'streetwear',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    weather: 'rainy',
    style: 'Urban Tech-Street',
    gender: 'male',
    season: 'winter',
    activity: 'travel',
    pieces: ['Waterproof Tactical Shell Jacket', 'Jogger Strap Pants', 'Reflective Sneakerboots'],
    rating: 4.9,
    likes: 512
  },
  // Casual
  {
    id: 'outfit-casual-1',
    name: 'Minimal Sage Comfort',
    category: 'casual',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop',
    weather: 'sunny',
    style: 'Minimal Casual',
    gender: 'female',
    season: 'summer',
    activity: 'hangout',
    pieces: ['Sage Green Linen Button-Up', 'Light Cream Cotton Shorts', 'Leather Slide Sandals'],
    rating: 4.7,
    likes: 219
  },
  {
    id: 'outfit-casual-2',
    name: 'Classic Indigo Daily',
    category: 'casual',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop',
    weather: 'cloudy',
    style: 'Smart Casual',
    gender: 'unisex',
    season: 'spring',
    activity: 'work',
    pieces: ['Heavy Cotton White Tee', 'Relaxed Dark Indigo Denim', 'Minimal White Sneakers'],
    rating: 4.6,
    likes: 185
  },
  // Formal
  {
    id: 'outfit-formal-1',
    name: 'Sandstone Tailored Suit',
    category: 'formal',
    image: 'https://images.unsplash.com/photo-1594938298598-71ee5994659e?q=80&w=800&auto=format&fit=crop',
    weather: 'sunny',
    style: 'Modern Executive',
    gender: 'male',
    season: 'spring',
    activity: 'work',
    pieces: ['Structured Sandstone Blazer', 'Crisp White Oxford Shirt', 'Tailored Cropped Trouser', 'Tan Leather Penny Loafers'],
    rating: 4.9,
    likes: 420
  },
  {
    id: 'outfit-formal-2',
    name: 'Silk Double-Breasted Fit',
    category: 'formal',
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=800&auto=format&fit=crop',
    weather: 'cloudy',
    style: 'Chic Evening Formal',
    gender: 'female',
    season: 'autumn',
    activity: 'date',
    pieces: ['Navy Double-Breasted Silk Blazer', 'Tailored Straight Leg Pants', 'Patent Pointed Heels'],
    rating: 4.8,
    likes: 298
  },
  // Sporty
  {
    id: 'outfit-sporty-1',
    name: 'Speed Carbon Runner',
    category: 'sporty',
    image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=800&auto=format&fit=crop',
    weather: 'sunny',
    style: 'Athletic Performance',
    gender: 'unisex',
    season: 'summer',
    activity: 'gym',
    pieces: ['Breathable Compression Tee', 'Lightweight Running Shorts', 'Carbon Plate Road Runners'],
    rating: 4.7,
    likes: 154
  },
  {
    id: 'outfit-sporty-2',
    name: 'Winter Shield Athleisure',
    category: 'sporty',
    image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?q=80&w=800&auto=format&fit=crop',
    weather: 'snowy',
    style: 'Cold-Weather Activewear',
    gender: 'female',
    season: 'winter',
    activity: 'gym',
    pieces: ['Thermal Fleece Pullover', 'Wind-Resistant Running Leggings', 'Grip Trail Runners'],
    rating: 4.8,
    likes: 243
  },
  // Vintage
  {
    id: 'outfit-vintage-1',
    name: 'Retro Corduroy Layer',
    category: 'vintage',
    image: 'https://images.unsplash.com/photo-1550614000-4b95d4ebf951?q=80&w=800&auto=format&fit=crop',
    weather: 'windy',
    style: '70s Retro',
    gender: 'unisex',
    season: 'autumn',
    activity: 'hangout',
    pieces: ['Tobacoo Corduroy Over-shirt', 'Striped Crewneck Tee', 'Flared Denim Jeans', 'Chunky Leather Derby Shoes'],
    rating: 4.8,
    likes: 310
  },
  {
    id: 'outfit-vintage-2',
    name: 'Tweed Cozy Comfort',
    category: 'vintage',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop',
    weather: 'windy',
    style: 'Academic Vintage',
    gender: 'male',
    season: 'winter',
    activity: 'travel',
    pieces: ['Heavy Tweed Jacket', 'Knitted Crewneck Sweater', 'Woolen Pleated Pants'],
    rating: 4.9,
    likes: 405
  },
  // Minimalist
  {
    id: 'outfit-minimal-1',
    name: 'Monochrome Linen Set',
    category: 'minimalist',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    weather: 'sunny',
    style: 'Clean Minimalist',
    gender: 'female',
    season: 'summer',
    activity: 'hangout',
    pieces: ['Oatmeal Linen Oversized Tee', 'Linen Wide-Leg Trousers', 'Vegan Suede Slides'],
    rating: 4.8,
    likes: 560
  },
  // Korean Style
  {
    id: 'outfit-korean-1',
    name: 'Hongdae Street Cardigan',
    category: 'korean',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop',
    weather: 'cloudy',
    style: 'K-Fashion Streetwear',
    gender: 'female',
    season: 'spring',
    activity: 'date',
    pieces: ['Loose Cropped Knit Cardigan', 'White Pleated Tennis Skirt', 'High Socks with Platform Loafers'],
    rating: 4.9,
    likes: 678
  },
  {
    id: 'outfit-korean-2',
    name: 'Seoul Classic Overcoat',
    category: 'korean',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop',
    weather: 'snowy',
    style: 'K-Minimalist Dandy',
    gender: 'male',
    season: 'winter',
    activity: 'date',
    pieces: ['Wool Double Coat in Caramel', 'Black Ribbed Turtleneck', 'Slim Cropped Slacks'],
    rating: 4.8,
    likes: 520
  },
  // Techwear
  {
    id: 'outfit-tech-1',
    name: 'Cyber-Shield Tactical Shell',
    category: 'techwear',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=800&auto=format&fit=crop',
    weather: 'rainy',
    style: 'Full Techwear Fit',
    gender: 'unisex',
    season: 'winter',
    activity: 'travel',
    pieces: ['3L Gore-Tex Breathable Anorak', 'Asymmetric Cargo Utility Joggers', 'Vibram Waterproof Hiking Sneakers'],
    rating: 4.9,
    likes: 710
  }
];

// Aesthetic Accessories Database
export const ACCESSORIES_DATABASE: Accessory[] = [
  {
    id: 'acc-1',
    name: 'Waterproof Tactical Beanie',
    category: 'beanie',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?q=80&w=400&auto=format&fit=crop',
    matchingStyles: ['streetwear', 'techwear', 'sporty'],
    price: 29,
    description: 'Bahan poliester berinsulasi termal tahan rintik air.'
  },
  {
    id: 'acc-2',
    name: 'Black Matte Acetate Sunglasses',
    category: 'glasses',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=400&auto=format&fit=crop',
    matchingStyles: ['streetwear', 'casual', 'minimalist', 'korean'],
    price: 45,
    description: 'UV400 protection dengan siluet retro-modern.'
  },
  {
    id: 'acc-3',
    name: 'Silver Curb Chain Necklace',
    category: 'necklace',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&auto=format&fit=crop',
    matchingStyles: ['streetwear', 'vintage', 'korean'],
    price: 35,
    description: 'Rantai curb perak padat tahan karat.'
  },
  {
    id: 'acc-4',
    name: 'Classic Minimalist Leather Watch',
    category: 'watch',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=400&auto=format&fit=crop',
    matchingStyles: ['formal', 'minimalist', 'casual'],
    price: 159,
    description: 'Dial minimalis dengan strap kulit sapi asli.'
  },
  {
    id: 'acc-5',
    name: 'Canvas Heavyweight Tote Bag',
    category: 'bag',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=400&auto=format&fit=crop',
    matchingStyles: ['casual', 'minimalist', 'korean', 'vintage'],
    price: 24,
    description: 'Tote katun kanvas tebal dengan saku laptop internal.'
  },
  {
    id: 'acc-6',
    name: 'Tactical Belt with Cobra Buckle',
    category: 'belt',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=400&auto=format&fit=crop',
    matchingStyles: ['techwear', 'streetwear'],
    price: 39,
    description: 'Buckle logam lepas-cepat dengan anyaman nilon militer.'
  },
  {
    id: 'acc-7',
    name: 'Cashmere Scarf in Charcoal',
    category: 'scarf',
    image: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?q=80&w=400&auto=format&fit=crop',
    matchingStyles: ['formal', 'vintage', 'korean'],
    price: 79,
    description: 'Sutra kasmir rajut super lembut dan menghangatkan.'
  },
  {
    id: 'acc-8',
    name: 'Minimalist Titanium Rings (Set of 3)',
    category: 'ring',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop',
    matchingStyles: ['streetwear', 'techwear', 'minimalist', 'korean'],
    price: 49,
    description: 'Cincin titanium brushed tahan korosi.'
  },
  {
    id: 'acc-9',
    name: 'Aesthetic Leather Bracelet',
    category: 'bracelet',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=400&auto=format&fit=crop',
    matchingStyles: ['casual', 'vintage'],
    price: 19,
    description: 'Gelang jalinan kulit dengan kancing logam.'
  },
  {
    id: 'acc-10',
    name: 'Classic Felt Baseball Cap',
    category: 'hat',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=400&auto=format&fit=crop',
    matchingStyles: ['casual', 'sporty', 'streetwear'],
    price: 25,
    description: 'Topi baseball wol tebal bergaya retro.'
  },
  {
    id: 'acc-11',
    name: 'Waterproof Tech Backpack',
    category: 'bag',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&auto=format&fit=crop',
    matchingStyles: ['techwear', 'streetwear', 'sporty'],
    price: 110,
    description: 'Kapasitas 25L dengan ritsleting tahan air YKK.'
  },
  {
    id: 'acc-12',
    name: 'Retro Chunky Sneakers',
    category: 'shoes',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=400&auto=format&fit=crop',
    matchingStyles: ['streetwear', 'korean', 'sporty'],
    price: 120,
    description: 'Platform sneaker chunky vintage yang empuk dan trendi.'
  }
];

// Mix & Match Automatic Accessory Generator
export const mixAndMatchAccessories = (style: string): Accessory[] => {
  const normStyle = style.toLowerCase();
  
  // Find accessories that support this style
  return ACCESSORIES_DATABASE.filter(acc => 
    acc.matchingStyles.some(s => normStyle.includes(s) || s.includes(normStyle))
  ).slice(0, 4); // return up to 4 recommendations
};

// Weather-Based Outfits Mock Database
export const WEATHER_COLLECTIONS = [
  {
    id: 'sunny',
    name: 'Sunny Day Essentials',
    description: 'Sinar matahari melimpah menuntut pakaian tipis, bersirkulasi udara tinggi, serta aksesoris pelindung sinar UV.',
    icon: '☀️',
    badge: 'Sunny',
    bgClass: 'from-orange-500/10 to-amber-500/10 border-orange-500/20',
    pieces: ['Linen Button-up Shirts', 'Cotton Twill Shorts', 'Retro Sunglasses', 'Aesthetic Cap'],
    image: 'https://images.unsplash.com/photo-1502472591631-9a99aa8e95d1e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'rainy',
    name: 'Monsoon Tactical Layering',
    description: 'Pertahankan tubuh tetap kering dengan bahan pelindung anti air, ritsleting kedap air, dan alas kaki berdaya cengkeram tinggi.',
    icon: '🌧️',
    badge: 'Rainy',
    bgClass: 'from-blue-500/10 to-indigo-500/10 border-blue-500/20',
    pieces: ['Gore-Tex Anorak Jacket', 'Strap Cargo Trousers', 'Waterproof Beanie', 'Trail Sneakers'],
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cloudy',
    name: 'Cloudy Comfort Layer',
    description: 'Suhu seimbang di bawah naungan awan. Ideal untuk lapisan ganda yang santai seperti sweater rajut atau outer corduroy.',
    icon: '☁️',
    badge: 'Cloudy',
    bgClass: 'from-sky-500/10 to-slate-500/10 border-slate-500/20',
    pieces: ['Heavyweight Sweatshirt', 'Slim Chino Pants', 'Minimal Tote Bag', 'Classic Watch'],
    image: 'https://images.unsplash.com/photo-1534067783941-51c9c23eccfd?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'snowy',
    name: 'Alpine Sub-Zero Collection',
    description: 'Menghadapi cuaca beku salju dengan jaket thermal terisolasi tebal, topi rajut, serta syal kasmir yang memanjakan leher.',
    icon: '❄️',
    badge: 'Snowy',
    bgClass: 'from-cyan-500/10 to-blue-500/10 border-cyan-500/20',
    pieces: ['Down Parka Jacket', 'Woolen Trousers', 'Knitted Beanie', 'Cashmere Scarf'],
    image: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'windy',
    name: 'Urban Wind-Shield Armor',
    description: 'Penahan tiupan angin perkotaan dengan jaket windbreaker taktis, celana ripstop, serta tudung kepala yang fungsional.',
    icon: '💨',
    badge: 'Windy',
    bgClass: 'from-teal-500/10 to-emerald-500/10 border-teal-500/20',
    pieces: ['Shield Windbreaker', 'Ripstop Cargo Joggers', 'Cobra Buckle Belt', 'Technical Backpack'],
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop'
  }
];

// Seasonal Collections Mock Database
export const SEASON_COLLECTIONS = [
  {
    id: 'summer',
    name: 'Summer Oasis',
    badge: 'Summer',
    bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    description: 'Linen sejuk, potongan santai, dan kacamata hitam untuk menikmati ombak panas perkotaan.',
    accentColor: 'from-amber-400 to-orange-500'
  },
  {
    id: 'autumn',
    name: 'Golden Autumn Whispers',
    badge: 'Autumn',
    bgImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
    description: 'Warna tembakau, corduroy tebal, trench coat bergaya vintage, dan tumpukan aksesoris kulit.',
    accentColor: 'from-orange-500 to-red-600'
  },
  {
    id: 'winter',
    name: 'Winter Eclipse',
    badge: 'Winter',
    bgImage: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=800&auto=format&fit=crop',
    description: 'Jaket bulu termal angsa, techwear hitam arang, syal kasmir wol, dan sarung tangan taktis.',
    accentColor: 'from-cyan-400 to-blue-600'
  },
  {
    id: 'spring',
    name: 'Spring Blossom Peak',
    badge: 'Spring',
    bgImage: 'https://images.unsplash.com/photo-1455218873509-8097305ee378?q=80&w=800&auto=format&fit=crop',
    description: 'Setelan kardigan rajut ringan, warna pastel, rok lipit tenis, serta wangi aroma floral.',
    accentColor: 'from-rose-400 to-teal-400'
  }
];

// Activity Collections Mock Database
export const ACTIVITY_COLLECTIONS = [
  {
    id: 'work',
    name: 'Smart Work Commute',
    badge: 'Office / Work',
    description: 'Blazer premium linen semi-formal, jam tangan kulit mewah, dan celana slacks untuk tampilan profesional modern.',
    icon: '💼',
    style: 'formal',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'travel',
    name: 'Aerodynamic Travel Gear',
    badge: 'Exploring / Travel',
    description: 'Hoodie techwear taktis tahan air, backpack tangguh 25L, dan platform sneakers untuk langkah tanpa batas.',
    icon: '✈️',
    style: 'techwear',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'gym',
    name: 'Gym Performance Peak',
    badge: 'Training / Gym',
    description: 'Kaos kompresi aerodinamis penyerap keringat, celana running mesh fleksibel, dan kacamata visor olahraga.',
    icon: '🏋️',
    style: 'sporty',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'date',
    name: 'Romantic Date Night',
    badge: 'Evening / Date',
    description: 'Kardigan dandy longgar, parfum floral, cincin perak minimalis, dan celana straight slacks yang anggun.',
    icon: '✨',
    style: 'korean',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'hangout',
    name: 'Chill City Hangout',
    badge: 'Weekend / Hangout',
    description: 'Graphic boxy tee, celana denim acid wash berdaya tahan tinggi, kacamata hitam retro, dan topi baseball.',
    icon: '🍕',
    style: 'streetwear',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop'
  }
];
