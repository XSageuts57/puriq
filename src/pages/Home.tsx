import BottomNav from '../components/BottomNav';
import { Search, ArrowRight, Compass, Bed, Utensils, Ticket } from 'lucide-react';
import { useState } from 'react';

import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; // ajusta la ruta
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await signOut(auth);

    navigate('/');

  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

  const categories = [
    { icon: Compass, label: "Destinos", desc: "Parques y lugares icónicos", color: "from-red-600 to-red-500" },
    { icon: Bed, label: "Alojamientos", desc: "Hoteles y hospedajes", color: "from-amber-600 to-amber-500" },
    { icon: Utensils, label: "Restaurantes", desc: "Gastronomía peruana", color: "from-emerald-600 to-emerald-500" },
    { icon: Ticket, label: "Tours", desc: "Experiencias guiadas", color: "from-violet-600 to-violet-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black text-white pb-20">

      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="px-5 py-3 flex items-center justify-between max-w-7xl mx-auto">

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/30">
              <span className="text-2xl font-black tracking-tighter">P</span>
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tighter">PURIQ</h1>
              <p className="text-red-400 text-[10px] -mt-0.5">Explora Perú</p>
            </div>
          </div>

          {/* BOTÓN LOGOUT */}
          <button
            onClick={handleLogout}
            className="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center text-xl hover:bg-white/20 transition-all cursor-pointer"
          >
            🚪
          </button>

        </div>
      </header>

      {/* Hero Section - Responsive Height */}
      <div className="relative mt-14 md:mt-16 lg:mt-16">
        <div className="relative h-[400px] md:h-[500px] lg:h-[550px] bg-[url('https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1600')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-zinc-950"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-5 pt-12 md:pt-16 lg:pt-20">
            <div className="max-w-3xl">
              <div className="inline-block mb-4">
                <span className="bg-red-600/20 backdrop-blur-sm text-red-400 text-sm px-4 py-1.5 rounded-full border border-red-600/30">
                  ✨ Tu aventura comienza aquí
                </span>
              </div>
              
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter">
                Descubre lo mejor<br />del <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">Perú</span>
              </h2>
              <p className="text-zinc-300 mt-4 md:mt-6 text-lg md:text-xl max-w-xl">
                Experiencias auténticas y viajes inolvidables
              </p>

              {/* Search Bar Mejorada */}
              <div className="mt-8 md:mt-10">
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl p-1.5 shadow-2xl hover:border-white/20 transition-all">
                  <div className="relative flex items-center">
                    <Search className="absolute left-5 text-zinc-400" size={22} />
                    <input
                      type="text"
                      placeholder="¿A dónde quieres ir?"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-transparent border-0 pl-14 py-4 md:py-5 text-base md:text-lg placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 rounded-2xl"
                    />
                    <button className="absolute right-2 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl text-sm font-medium transition-all hidden md:block">
                      Buscar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Categorías */}
        <div className="mt-10 md:mt-14">
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-red-400 text-sm font-semibold uppercase tracking-wider mb-1">Categorías</p>
              <h3 className="text-2xl md:text-3xl font-bold">Explorar por categoría</h3>
            </div>
            <button className="text-zinc-400 hover:text-white text-sm font-medium transition-colors hidden md:block">
              Ver todas →
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div 
                  key={i} 
                  className="group relative overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-900/50 rounded-2xl p-5 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border border-white/5 hover:border-white/20"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="text-red-400" size={28} />
                    </div>
                    <h4 className="font-semibold text-lg text-white mb-1">{cat.label}</h4>
                    <p className="text-xs text-zinc-500">{cat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}