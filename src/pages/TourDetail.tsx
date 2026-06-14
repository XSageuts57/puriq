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
  Calendar,
  Users,
  Compass,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { tours } from '../data/tours';
import Reviews from '../components/Reviews';

export default function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const tour = tours.find((t) => t.id === id);

  // Carrusel automático
  useEffect(() => {
    if (!tour?.gallery.length) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev + 1 >= tour.gallery.length ? 0 : prev + 1
      );
    }, 4000);
    
    return () => clearInterval(interval);
  }, [tour?.gallery.length]);

  if (!tour) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <p className="text-xl">Tour no encontrado</p>
        <button
          onClick={() => navigate('/tours')}
          className="bg-red-600 px-6 py-2 rounded-xl hover:bg-red-700 transition"
        >
          Volver a tours
        </button>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === 'Fácil') return 'text-green-400';
    if (difficulty === 'Moderado') return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      
      {/* Botón de retroceso */}
      <button
        onClick={() => navigate('/tours')}
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
          {(tour.gallery || [tour.image]).map((img, idx) => (
            <div key={idx} className="min-w-full h-full relative">
              <img
                src={img}
                alt={`${tour.title} - ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={17} className="text-red-400" />
            <span className="text-zinc-300">{tour.location}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            {tour.title}
          </h1>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400 fill-yellow-400" size={18} />
              <span className="font-semibold">{tour.rating}</span>
              <span className="text-zinc-400">({tour.reviews} reseñas)</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-red-400" />
              <span className="text-zinc-300">${tour.price} por persona</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-red-400" />
              <span className="text-zinc-300">{tour.duration}</span>
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
                Sobre este tour
              </h2>
              <p className="text-zinc-300 leading-relaxed text-base md:text-lg">
                {tour.longDescription}
              </p>
            </div>

            {/* Itinerario */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Compass size={22} className="text-red-400" />
                Itinerario
              </h2>
              <div className="space-y-6">
                {tour.itinerary.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-28 flex-shrink-0">
                      <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm font-semibold">
                        {item.day}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-zinc-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECCIÓN DE OPINIONES - NUEVA */}
            <div className="mt-6">
              <Reviews 
                itemId={tour.id} 
                itemType="tour"
              />
            </div>
          </div>

          {/* Columna derecha - Tarjeta de información */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-2xl p-6">
              
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-red-400">${tour.price}</div>
                <p className="text-zinc-400 text-sm">por persona</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Clock size={18} className="text-red-400" />
                  <div>
                    <p className="font-semibold">Duración</p>
                    <p className="text-zinc-400 text-xs">{tour.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <Users size={18} className="text-red-400" />
                  <div>
                    <p className="font-semibold">Grupo</p>
                    <p className="text-zinc-400 text-xs">{tour.groupSize}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Compass size={18} className="text-red-400" />
                  <div>
                    <p className="font-semibold">Dificultad</p>
                    <p className={`text-xs ${getDifficultyColor(tour.difficulty)}`}>{tour.difficulty}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Calendar size={18} className="text-red-400" />
                  <div>
                    <p className="font-semibold">Mejor época</p>
                    <p className="text-zinc-400 text-xs">{tour.bestSeason}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Clock size={18} className="text-red-400" />
                  <div>
                    <p className="font-semibold">Horario de salida</p>
                    <p className="text-zinc-400 text-xs">{tour.departureTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Globe size={18} className="text-red-400" />
                  <div>
                    <p className="font-semibold">Idiomas</p>
                    <p className="text-zinc-400 text-xs">{tour.languages.join(', ')}</p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-red-600/30 mb-4">
                Reservar ahora
              </button>

              {/* Contacto */}
              <div className="border-t border-white/10 pt-4 mt-4">
                <p className="text-xs text-zinc-400 mb-2">Más información:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <Phone size={14} className="text-red-400" />
                    <span>{tour.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <Mail size={14} className="text-red-400" />
                    <span className="truncate">{tour.contact.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Qué incluye / No incluye */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-green-600/10 border border-green-600/20 rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-green-400">
              <CheckCircle size={20} />
              ¿Qué incluye?
            </h3>
            <ul className="space-y-2">
              {tour.includes.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-zinc-300 text-sm">
                  <CheckCircle size={14} className="text-green-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-600/10 border border-red-600/20 rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-red-400">
              <XCircle size={20} />
              No incluye
            </h3>
            <ul className="space-y-2">
              {tour.notIncludes.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-zinc-300 text-sm">
                  <XCircle size={14} className="text-red-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Botón volver */}
        <div className="mt-10 mb-8 text-center">
          <button
            onClick={() => navigate('/tours')}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            ← Volver a todos los tours
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}