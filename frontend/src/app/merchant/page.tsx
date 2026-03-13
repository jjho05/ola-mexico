'use client';

import React, { useState } from 'react';
import { Store, Camera, Save, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function MerchantDashboard() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('Comida y Bebida');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
          const response = await fetch("/api/merchant/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: Math.floor(Math.random() * 1000), // Temporal
              name: businessName,
              category: category,
              description: "Nuevo socio registrado durante el Mundial.",
              tags: [category.toLowerCase()],
              image_url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
              lat: null,
              lng: null,
              rating: 5.0,
              address: address || "Ciudad de México"
            })
          });
      
      const data = await response.json();
      console.log("Registered:", data);
      setStep(3); // Mostramos confirmación
    } catch (error) {
      console.error("Error registering:", error);
      alert("Error al registrar tu negocio. Verifica que el backend esté corriendo.");
    } finally {
      setLoading(false);
    }
  };

  if (step === 3) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 max-w-md mx-auto py-20 text-center">
        <div className="w-20 h-20 bg-[var(--primary)] text-white rounded-full flex items-center justify-center shadow-2xl">
          <Save size={40} />
        </div>
        <h1 className="text-3xl font-black italic tracking-tighter uppercase">{t('merchant_welcome')}</h1>
        <p className="text-[var(--muted)] font-medium px-6">
          {t('merchant_welcome_help')}
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="bg-[var(--primary)] text-white font-bold px-8 py-3 rounded-xl"
        >
          {t('go_home')}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto pb-24">
      <header className="mb-4">
        <h1 className="text-3xl font-black italic tracking-tighter uppercase">
          {t('merchant_portal').split(' ')[0]} <span className="text-[var(--primary)]">{t('merchant_portal').split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="text-[var(--muted)] font-medium">{t('merchant_subtitle')}</p>
      </header>

      {step === 1 ? (
        <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl space-y-4">
          <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-2xl flex items-center justify-center text-[var(--primary)] mb-2">
            <Store size={32} />
          </div>
          <h2 className="text-xl font-bold">{t('merchant_register_title')}</h2>
          <p className="text-sm text-[var(--muted)]">{t('merchant_register_help')}</p>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">{t('merchant_business_name')}</label>
              <input 
                type="text" 
                placeholder="Ej. Tacos El Guero"
                className="w-full p-3 rounded-xl border border-gray-200 mt-1 focus:ring-2 focus:ring-[var(--primary)] outline-none"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">{t('merchant_category')}</label>
              <select 
                className="w-full p-3 rounded-xl border border-gray-200 mt-1 focus:ring-2 focus:ring-[var(--primary)] outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Comida y Bebida</option>
                <option>Artesanías</option>
                <option>Servicios</option>
                <option>Alojamiento</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Dirección</label>
              <input 
                type="text" 
                placeholder="Ej. Calle Bolívar 54, CDMX"
                className="w-full p-3 rounded-xl border border-gray-200 mt-1 focus:ring-2 focus:ring-[var(--primary)] outline-none"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <button 
              onClick={() => handleRegister()}
              disabled={loading || !businessName}
              className={`w-full ${loading ? 'opacity-50' : 'bg-[var(--primary)]'} text-white font-bold py-4 rounded-xl shadow-lg shadow-[var(--primary)]/20 active:scale-95 transition-transform`}
            >
              {loading ? t('merchant_processing') : t('merchant_register_button')}
            </button>
          </div>
        </section>
      ) : (
        <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--secondary)] rounded-xl flex items-center justify-center text-white">
              <Camera size={20} />
            </div>
            <h2 className="text-xl font-bold">{t('menu_digital')}</h2>
          </div>
          
          <p className="text-sm text-[var(--muted)]">{t('menu_upload_help')}</p>
          
          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
            <Plus size={32} className="text-[var(--primary)]" />
            <span className="text-sm font-bold">{t('menu_upload_button')}</span>
          </div>

          <div className="pt-4">
            <div className="p-4 bg-gray-50 rounded-xl text-gray-500 text-sm">
              {t('menu_empty')}
            </div>
          </div>

          <button className="w-full border-2 border-[var(--primary)] text-[var(--primary)] font-bold py-4 rounded-xl active:scale-95 transition-transform">
            {t('save_changes')}
          </button>
        </section>
      )}
    </div>
  );
}
