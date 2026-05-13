import BottomNav from '../components/BottomNav';
import { Search, Compass, Bed, Utensils, Ticket, Sparkles, ArrowRight, Star, MapPin, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const categories = [
    { icon: Compass, label: "Destinos", desc: "Parques y lugares icónicos", color: "from-red-600 to-orange-500" },
    { icon: Bed, label: "Alojamientos", desc: "Hoteles y hospedajes", color: "from-amber-600 to-yellow-500" },
    { icon: Utensils, label: "Restaurantes", desc: "Gastronomía peruana", color: "from-emerald-600 to-green-500" },
    { icon: Ticket, label: "Tours", desc: "Experiencias guiadas", color: "from-violet-600 to-purple-500" },
  ];


  const experiences = [
    { icon: "🏔️", title: "Trekking", desc: "Rutas al aire libre", active: true },
    { icon: "🍜", title: "Gastronomía", desc: "Clases de cocina", active: false },
    { icon: "📸", title: "Fotografía", desc: "Paisajes únicos", active: false },
    { icon: "🧘", title: "Bienestar", desc: "Retiros espirituales", active: false },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-20 overflow-x-hidden">
      
      {/* Efectos de fondo MEJORADOS - Sin pixelado */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradiente principal más suave */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-red-600/15 via-transparent to-transparent opacity-70"></div>
        
        {/* Gradiente secundario */}
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-purple-600/10 via-transparent to-transparent"></div>
        
        {/* Gradiente terciario más sutil */}
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-gradient-radial from-blue-500/5 via-transparent to-transparent"></div>
      </div>

      {/* Header con transición SUAVE */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        scrolled 
          ? 'bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-sm border-b border-transparent'
      }`}>
        <div className="px-4 py-3 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 rounded-xl blur-lg opacity-60"></div>
              <div className="relative w-9 h-9 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center shadow-xl">
                <span className="text-xl font-black tracking-tighter">P</span>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tighter bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">PURIQ</h1>
              <p className="text-red-400 text-[9px] -mt-0.5 font-medium">Explora Perú</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative group">
              <div className="relative w-9 h-9 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all">
                <Sparkles size={18} className="text-yellow-400" />
              </div>
            </button>
            <button
              onClick={handleLogout}
              className="relative group"
            >
              <div className="relative w-9 h-9 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all">
                <span className="text-base">🚪</span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section con transición limpia */}
      <div className="relative">
        <div className="relative h-[550px] md:h-[600px] lg:h-[650px] overflow-hidden">
          {/* Imagen de fondo con mejor calidad */}
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1600')] bg-cover bg-center"
          ></div>
          
          {/* Gradiente de transición SUAVE - clave para el efecto limpio */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black"></div>
          
          {/* Gradiente adicional para suavizar el borde con el contenido */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 pt-28 md:pt-32 lg:pt-36">
            <div className="max-w-3xl">
              {/* Badge animado */}
              <div className="inline-flex items-center gap-2 bg-red-600/20 backdrop-blur-sm text-red-400 text-xs md:text-sm px-4 py-2 rounded-full border border-red-600/30 mb-5 animate-pulse">
                <Sparkles size={14} />
                <span>Tu aventura comienza aquí</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tighter">
                Descubre lo mejor<br />del{' '}
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-400 to-red-500 blur-2xl opacity-40"></span>
                  <span className="relative bg-gradient-to-r from-red-500 via-red-400 to-red-300 bg-clip-text text-transparent">
                    Perú
                  </span>
                </span>
              </h2>
              <p className="text-zinc-300 mt-5 md:mt-6 text-lg md:text-xl max-w-xl leading-relaxed">
                Experiencias auténticas y viajes inolvidables en el corazón de los Andes
              </p>

              {/* Search Bar Premium con mejor contraste */}
              <div className="mt-8 md:mt-10">
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative bg-black/70 backdrop-blur-2xl border border-white/15 rounded-2xl md:rounded-3xl p-1.5 group-hover:border-white/25 transition-all">
                    <div className="relative flex items-center">
                      <Search className="absolute left-4 text-zinc-400" size={20} />
                      <input
                        type="text"
                        placeholder="¿A dónde quieres ir?"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-transparent border-0 pl-12 pr-4 py-3 md:py-5 text-base md:text-lg placeholder-zinc-500 focus:outline-none text-white"
                      />
                      <button className="hidden md:block absolute right-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 px-6 py-2 rounded-xl text-sm font-medium transition-all shadow-lg shadow-red-600/30">
                        Explorar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats rápidos */}
              <div className="flex gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-red-400" />
                  <span className="text-sm text-zinc-400">+50K viajeros</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-red-400" />
                  <span className="text-sm text-zinc-400">200+ destinos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-yellow-400" />
                  <span className="text-sm text-zinc-400">4.9 rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal con fondo sólido para contraste */}
      <div className="relative z-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Categorías */}
          <div className="pt-12 md:pt-16">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-red-400 text-xs md:text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
                  <Sparkles size={14} /> Explorar por categoría
                </p>
                <h3 className="text-2xl md:text-3xl font-bold mt-1">Descubre lo que te apasiona</h3>
              </div>
              <button className="text-zinc-400 hover:text-white text-sm font-medium transition-all hidden md:flex items-center gap-1 group">
                Ver todas <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <div 
                    key={i} 
                    className="group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 cursor-pointer hover:scale-[1.02] bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border border-white/10 hover:border-white/20"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                        <Icon className="text-white" size={28} />
                      </div>
                      <h4 className="font-semibold text-lg text-white mb-1">{cat.label}</h4>
                      <p className="text-zinc-400 text-sm">{cat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>


          {/* Banner Promocional */}
          <div className="mt-14 md:mt-20 mb-10">
            <div className="relative group overflow-hidden rounded-2xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-purple-600 to-red-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-gradient-to-r from-zinc-900 to-black rounded-2xl p-8 md:p-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-600/20 to-purple-600/20 rounded-full blur-3xl"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles size={20} className="text-yellow-400" />
                      <span className="text-red-400 font-semibold uppercase tracking-wider text-sm">Oferta Especial</span>
                    </div>
                    <h4 className="text-3xl md:text-4xl font-bold mb-2">¡Descuento exclusivo!</h4>
                    <p className="text-zinc-300 mb-4">Hasta <span className="text-2xl font-bold text-red-400">30% OFF</span> en paquetes turísticos</p>
                    <button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-red-600/30 flex items-center gap-2">
                      Ver ofertas <ArrowRight size={18} />
                    </button>
                  </div>
                  <div className="text-8xl md:text-9xl opacity-20 group-hover:opacity-30 transition-opacity">🗻</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de Experiencias */}
          <div className="mt-10 mb-12">
            <div className="text-center mb-8">
              <p className="text-red-400 text-sm font-semibold uppercase tracking-wider">Experiencias únicas</p>
              <h3 className="text-2xl md:text-3xl font-bold mt-1">Vive Perú como nunca antes</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {experiences.map((exp, idx) => (
                <div key={idx} className={`text-center p-4 rounded-2xl transition-all cursor-pointer ${
                  exp.active 
                    ? 'bg-gradient-to-br from-red-600/20 to-red-600/10 border border-red-600/30' 
                    : 'bg-zinc-900/50 border border-white/5 hover:border-white/10'
                }`}>
                  <div className="text-3xl mb-2">{exp.icon}</div>
                  <p className="font-semibold text-sm">{exp.title}</p>
                  <p className="text-xs text-zinc-500 mt-1">{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}