import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import { AppCard } from '../ui/AppCard';

const FACTS = [
  "Producing 1 kg of beef emits approximately 60 kg CO₂e, making diet the most impactful lifestyle choice.",
  "Using public transport can reduce your commuting emissions by up to 45% compared to driving a gas car.",
  "Lowering your thermostat by just 1 degree in winter can save up to 10% on your energy footprint.",
  "Streaming 1 hour of video emits about 55g of CO₂, equivalent to driving 300 meters.",
  "A 10-minute shorter shower saves about 15 liters of water and significant heating energy."
];

export function DidYouKnowCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FACTS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % FACTS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + FACTS.length) % FACTS.length);

  return (
    <AppCard className="bg-gradient-to-br from-carbon-800 to-carbon-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Lightbulb className="w-32 h-32" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4 text-carbon-200">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          <h3 className="text-sm font-bold uppercase tracking-widest">Did You Know?</h3>
        </div>
        
        <div className="min-h-[80px] flex items-center">
          <p className="text-lg font-medium leading-relaxed max-w-lg">
            {FACTS[currentIndex]}
          </p>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
          <div className="flex gap-1.5">
            {FACTS.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-6 bg-carbon-300' : 'w-1.5 bg-white/20'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={prev} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={next} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </AppCard>
  );
}
