import BottomNav from '../components/BottomNav';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  ArrowLeft,
  Heart,
  Share2,
  Info,
  DollarSign,
  Utensils,
  CheckCircle,
} from 'lucide-react';
import { restaurants } from '../data/restaurants';

export default function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const restaurant = restaurants.find((res) => res.id === id);

  // Carrusel automático
  useEffect(() => {
    if (!restaurant?.gallery.length) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev + 1 >= restaurant.gallery.length ? 0 : prev + 1
      );
    }, 4000);
    
    return () => clearInterval(interval);
  }, [restaurant?.gallery.length]);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <p className="text-xl">Restaurante no encontrado</p>
        <button
          onClick={() => navigate('/restaurantes')}
          className="bg-red-600 px-6 py-2 rounded-xl hover:bg-red-700 transition"
        >
          Volver a restaurantes
        </button>
      </div>
    );
  }

  const getPriceIcon = () => {
    const count = restaurant.priceRange.split('💰').length - 1;
    return '💰'.repeat(count);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      
      {/* Botón de retroceso */}
      <button
        onClick={() => navigate('/restaurantes')}
        className="fixed top-5 left-5 z-50 bg-black/60 backdrop-blur-xl p-3 rounded-full border border-white/20 hover:bg-black/80 transition-all"
      >
        <ArrowLeft size={22} />
      </button>

      {/* Botones de acción */}
      <div className="fixed top-5 right-5 z-50 flex gap-2">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="bg-black/60 backdrop-blur-xl p-3 rounded-full border border-white/20 hover:bg-black/80 transition-all"
        >
          <Heart size={22} className={isLiked ? 'fill-red-500 text-red-500' : 'text-white'} />
        </button>
        <button className="bg-black/60 backdrop-blur-xl p-3 rounded-full border border-white/20 hover:bg-black/80 transition-all">
          <Share2 size={22} />
        </button>
      </div>

      {/* Hero Section con Carrusel */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        
        <div 
          className="flex transition-transform duration-700 ease-out h-full"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {(restaurant.gallery || [restaurant.image]).map((img, idx) => (
            <div key={idx} className="min-w-full h-full relative">
              <img
                src={img}
                alt={`${restaurant.title} - ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={17} className="text-red-400" />
            <span className="text-zinc-300">{restaurant.location}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            {restaurant.title}
          </h1>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400 fill-yellow-400" size={18} />
              <span className="font-semibold">{restaurant.rating}</span>
              <span className="text-zinc-400">({restaurant.reviews} reseñas)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">{getPriceIcon()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-5 pt-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna izquierda */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Descripción */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Info size={22} className="text-red-400" />
                Sobre este restaurante
              </h2>
              <p className="text-zinc-300 leading-relaxed text-base md:text-lg">
                {restaurant.longDescription}
              </p>
            </div>

            {/* Especialidades */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Utensils size={22} className="text-red-400" />
                Platos destacados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {restaurant.signatureDishes.map((dish, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle size={14} className="text-red-400" />
                    <span className="text-sm">{dish}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tipo de cocina */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Star size={22} className="text-red-400" />
                Tipos de cocina
              </h2>
              <div className="flex flex-wrap gap-2">
                {restaurant.cuisine.map((type, idx) => (
                  <span key={idx} className="px-4 py-2 bg-red-600/20 text-red-400 rounded-full text-sm">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Columna derecha - Tarjeta de información */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-2xl p-6">
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Clock size={18} className="text-red-400" />
                  <div>
                    <p className="font-semibold">Horario</p>
                    <p className="text-zinc-400 text-xs">{restaurant.schedule}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <MapPin size={18} className="text-red-400" />
                  <div>
                    <p className="font-semibold">Dirección</p>
                    <p className="text-zinc-400 text-xs">{restaurant.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <DollarSign size={18} className="text-red-400" />
                  <div>
                    <p className="font-semibold">Rango de precio</p>
                    <p className="text-zinc-400 text-xs">{getPriceIcon()} por persona</p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-red-600/30 mb-4">
                Reservar mesa
              </button>

              {/* Contacto */}
              <div className="border-t border-white/10 pt-4 mt-4">
                <p className="text-xs text-zinc-400 mb-2">Contacto:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <Phone size={14} className="text-red-400" />
                    <span>{restaurant.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <Mail size={14} className="text-red-400" />
                    <span className="truncate">{restaurant.contact.email}</span>
                  </div>
                  {restaurant.contact.website && (
                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                      <Globe size={14} className="text-red-400" />
                      <span className="truncate">{restaurant.contact.website}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón volver */}
        <div className="mt-10 mb-8 text-center">
          <button
            onClick={() => navigate('/restaurantes')}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            ← Volver a todos los restaurantes
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}