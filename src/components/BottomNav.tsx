import { Home, MapPin, Bed, UtensilsCrossed, Compass, MessageSquare } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { icon: Home, label: 'Inicio', path: '/' },
  { icon: MapPin, label: 'Destinos', path: '/destinos' },
  { icon: Bed, label: 'Alojamientos', path: '/alojamientos' },
  { icon: UtensilsCrossed, label: 'Restaurantes', path: '/restaurantes' },
  { icon: Compass, label: 'Tours', path: '/tours' },
  { icon: MessageSquare, label: 'Opiniones', path: '/opiniones' },
];

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 z-50">
      <div className="flex items-center justify-around py-2 max-w-md mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-3 text-xs transition-colors ${
                isActive 
                  ? 'text-red-500' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`
            }
          >
            <item.icon size={22} strokeWidth={2.2} />
            <span className="mt-1">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}