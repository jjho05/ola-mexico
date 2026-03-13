'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Star } from 'lucide-react';

const businesses = [
  {
    "id": 1,
    "name": "Tacos El Guero",
    "category": "Comida",
    "image_url": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
    "rating": 4.8,
    "address": "Centro Histórico"
  },
  {
    "id": 2,
    "name": "Artesanías El Jaguar",
    "category": "Compras",
    "image_url": "https://images.unsplash.com/photo-1590076215667-873d3215904a",
    "rating": 4.5,
    "address": "Colonia Juárez"
  }
];

export default function Home() {
  const { t } = useTranslation();
  const [businesses, setBusinesses] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch("/api/businesses");
        const data = await response.json();
        setBusinesses(data);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinesses();
  }, []);

  return (
    <div className="flex flex-col gap-8 max-w-md mx-auto">
      <header className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-black italic tracking-tighter">
            OLA <span className="text-[var(--primary)]">MÉXICO</span>
          </h1>
          <span className="bg-[var(--secondary)] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest rotate-2 shadow-lg">
            2026 WC
          </span>
        </div>
        <p className="text-[var(--muted)] font-medium">Nivela la cancha digital y apoya lo local.</p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold flex items-center justify-between">
          {t('discover')}
          <span className="text-[var(--primary)] text-sm font-medium">Ver todo</span>
        </h2>
        
        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
            </div>
          ) : (
            businesses.map((biz) => (
              <div key={biz.id} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 transition-transform active:scale-[0.98]">
                <div className="relative h-48 w-full">
                  <img src={biz.image_url} alt={biz.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-xl text-xs font-black text-[var(--primary)] uppercase tracking-tight shadow-sm">
                    {biz.category}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-black text-xl tracking-tight">{biz.name}</h3>
                      <p className="text-[var(--muted)] text-sm flex items-center gap-1 mt-1 font-medium">
                        <MapPin size={14} className="text-[var(--primary)]" /> {biz.address}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-[var(--primary)]/10 text-[var(--primary)] px-2 py-1 rounded-xl">
                      <Star size={14} fill="currentColor" />
                      <span className="text-sm font-black">{biz.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
