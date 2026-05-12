import BottomNav from '../components/BottomNav';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
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
    { 
      icon: "🏔️", 
      label: "Destinos", 
      desc: "Parques y lugares icónicos" 
    },
    { 
      icon: "🛏️", 
      label: "Alojamientos", 
      desc: "Hoteles y hospedajes" 
    },
    { 
      icon: "🍽️", 
      label: "Restaurantes", 
      desc: "Gastronomía peruana" 
    },
    { 
      icon: "🎟️", 
      label: "Tours", 
      desc: "Experiencias guiadas" 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black text-white pb-20">

      {/* Header Fijo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="px-5 py-3 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/30">
              <span className="text-2xl font-black tracking-tighter">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tighter">PURIQ</h1>
              <p className="text-red-400 text-[10px] -mt-0.5">Explora Perú</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center text-xl hover:bg-white/20 transition-all"
          >
            🚪
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative mt-14">
        <div className="relative h-[420px] md:h-[500px] bg-[url('https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1600')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-zinc-950"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-5 pt-16 md:pt-20">
            <div className="max-w-3xl">
              <span className="inline-block bg-red-600/20 text-red-400 text-sm px-4 py-1.5 rounded-full border border-red-600/30 mb-4">
                ✨ Tu aventura comienza aquí
              </span>
              
              <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tighter">
                Descubre lo mejor<br />del <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">Perú</span>
              </h2>
              <p className="text-zinc-300 mt-5 text-lg md:text-xl">
                Experiencias auténticas y viajes inolvidables
              </p>

              {/* Search Bar */}
              <div className="mt-8">
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-1.5">
                  <div className="relative flex items-center">
                    <Search className="absolute left-5 text-zinc-400" size={24} />
                    <input
                      type="text"
                      placeholder="¿A dónde quieres ir?"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-transparent border-0 pl-14 py-5 text-lg placeholder-zinc-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categorías */}
      <div className="max-w-7xl mx-auto px-5 mt-12">
        <div className="flex justify-between items-end mb-6">
          <div>
            <p className="text-red-400 text-sm font-semibold uppercase tracking-wider">Categorías</p>
            <h3 className="text-3xl font-bold">Explorar por categoría</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat, i) => (
            <div 
              key={i} 
              className="group bg-zinc-900/70 border border-white/10 hover:border-red-600/30 rounded-3xl p-6 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <div className="text-5xl mb-4">{cat.icon}</div>
              <h4 className="font-semibold text-xl mb-1">{cat.label}</h4>
              <p className="text-zinc-400 text-sm">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}