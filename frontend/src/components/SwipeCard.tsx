'use client';

import React from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { Heart, X, MapPin } from 'lucide-react';

interface SwipeCardProps {
  business: {
    id: number;
    name: string;
    description: string;
    image_url: string;
    address: string;
  };
  onSwipe: (direction: 'left' | 'right') => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ business, onSwipe }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-50, -150], [0, 1]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
      onSwipe('left');
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <motion.div
        style={{ x, rotate, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        className="relative w-full max-w-sm h-[600px] bg-white rounded-3xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing border-4 border-white"
      >
        <img src={business.image_url} alt={business.name} className="w-full h-full object-cover pointer-events-none" />
        
        {/* Overlays */}
        <motion.div style={{ opacity: likeOpacity }} className="absolute top-10 left-10 border-4 border-green-500 rounded-lg px-4 py-2 rotate-[-20deg]">
          <span className="text-4xl font-black text-green-500 uppercase">LIKE</span>
        </motion.div>
        <motion.div style={{ opacity: nopeOpacity }} className="absolute top-10 right-10 border-4 border-red-500 rounded-lg px-4 py-2 rotate-[20deg]">
          <span className="text-4xl font-black text-red-500 uppercase">NOPE</span>
        </motion.div>

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
          <h2 className="text-3xl font-bold">{business.name}</h2>
          <p className="flex items-center gap-1 text-sm mt-1 opacity-90">
            <MapPin size={16} /> {business.address}
          </p>
          <p className="mt-4 text-sm line-clamp-2 opacity-80">{business.description}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default SwipeCard;
