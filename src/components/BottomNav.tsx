import { Home, MapPin, Bed, UtensilsCrossed, Compass } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { icon: Home, label: 'Inicio', path: '/' },
  { icon: MapPin, label: 'Destinos', path: '/destinos' },
  { icon: Bed, label: 'Alojamientos', path: '/alojamientos' },
  { icon: UtensilsCrossed, label: 'Restaurantes', path: '/restaurantes' },
  { icon: Compass, label: 'Tours', path: '/tours' },
];

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 z-50">
      <div className="flex items-center justify-around py-2 max-w-md mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-3 text-xs transition-all duration-200 ${
                isActive 
                  ? 'text-red-500 scale-105' 
                  : 'text-zinc-400 hover:text-zinc-200 hover:scale-105'
              }`
            }
          >
            <item.icon size={22} strokeWidth={2} />
            <span className="mt-1 text-[11px]">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}