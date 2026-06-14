import BottomNav from '../components/BottomNav';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Star,
  MapPin,
  Wifi,
  Coffee,
  Dumbbell,
  Waves,
  Utensils,
  Car,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Heart,
  Share2,
  Info,
  DollarSign,
  Sparkles,
} from 'lucide-react';
import { getAllAccommodations, type Accommodation } from '../data/accommodations';
import Reviews from '../components/Reviews';
import BookingModal from '../components/BookingModal';

export default function AccommodationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Buscar en TODOS los alojamientos (incluyendo los de usuario)
  const allAccommodations = getAllAccommodations();
  const accommodation = allAccommodations.find((acc) => acc.id === id);

  // Carrusel automático con animación
  useEffect(() => {
    if (!accommodation?.gallery?.length) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev + 1 >= accommodation.gallery.length ? 0 : prev + 1
      );
    }, 4000);
    
    return () => clearInterval(interval);
  }, [accommodation?.gallery?.length]);

  if (!accommodation) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <p className="text-xl">Alojamiento no encontrado</p>
        <button
          onClick={() => navigate('/alojamientos')}
          className="bg-red-600 px-6 py-2 rounded-xl hover:bg-red-700 transition"
        >
          Volver a alojamientos
        </button>
      </div>
    );
  }

  const getAmenityIcon = (amenity: string) => {
    if (amenity.includes('WiFi')) return <Wifi size={18} className="text-red-400" />;
    if (amenity.includes('Desayuno')) return <Coffee size={18} className="text-red-400" />;
    if (amenity.includes('Piscina')) return <Waves size={18} className="text-red-400" />;
    if (amenity.includes('Gimnasio')) return <Dumbbell size={18} className="text-red-400" />;
    if (amenity.includes('Restaurante')) return <Utensils size={18} className="text-red-400" />;
    if (amenity.includes('Estacionamiento')) return <Car size={18} className="text-red-400" />;
    return <Sparkles size={18} className="text-red-400" />;
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      
      {/* Botón de retroceso */}
      <button
        onClick={() => navigate('/alojamientos')}
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
          {(accommodation.gallery || [accommodation.image]).map((img, idx) => (
            <div key={idx} className="min-w-full h-full relative">
              <img
                src={img}
                alt={`${accommodation.title} - ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

        {/* Información del alojamiento */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={17} className="text-red-400" />
            <span className="text-zinc-300">{accommodation.location}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            {accommodation.title}
          </h1>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400 fill-yellow-400" size={18} />
              <span className="font-semibold">{accommodation.rating}</span>
              <span className="text-zinc-400">({accommodation.reviews} reseñas)</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-red-400" />
              <span className="text-zinc-300">${accommodation.price} por noche</span>
            </div>
            {(accommodation as Accommodation & { isUserAdded?: boolean }).isUserAdded && (
              <div className="bg-green-600/20 border border-green-600/30 rounded-full px-3 py-1 text-xs">
                👤 Agregado por usuario
              </div>
            )}
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
                Sobre este alojamiento
              </h2>
              <p className="text-zinc-300 leading-relaxed text-base md:text-lg">
                {accommodation.longDescription}
              </p>
            </div>

            {/* Amenidades */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Sparkles size={22} className="text-red-400" />
                Amenidades
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {accommodation.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-zinc-300">
                    {getAmenityIcon(amenity)}
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ¿Qué incluye? */}
            {accommodation.includes && accommodation.includes.length > 0 && (
              <div className="bg-green-600/10 border border-green-600/20 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-green-400">
                  <CheckCircle size={20} />
                  ¿Qué incluye?
                </h3>
                <ul className="space-y-2">
                  {accommodation.includes.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-zinc-300 text-sm">
                      <CheckCircle size={14} className="text-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* No incluye */}
            {accommodation.notIncludes && accommodation.notIncludes.length > 0 && (
              <div className="bg-red-600/10 border border-red-600/20 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-red-400">
                  <XCircle size={20} />
                  No incluye
                </h3>
                <ul className="space-y-2">
                  {accommodation.notIncludes.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-zinc-300 text-sm">
                      <XCircle size={14} className="text-red-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sección de reseñas */}
            <div>
              <Reviews itemId={accommodation.id} itemType="accommodation" />
            </div>
          </div>

          {/* Columna derecha - Tarjeta de reserva */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-2xl p-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-red-400">${accommodation.price}</div>
                <p className="text-zinc-400 text-sm">por noche</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Star size={16} className="text-yellow-400" />
                  <span>{accommodation.rating} · {accommodation.reviews} reseñas</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin size={16} className="text-red-400" />
                  <span>{accommodation.location}</span>
                </div>
              </div>

              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-red-600/30 mb-4"
              >
                Reservar ahora
              </button>

              {/* Contacto */}
              <div className="border-t border-white/10 pt-4 mt-4">
                <p className="text-xs text-zinc-400 mb-2">Contacto directo:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <Phone size={14} className="text-red-400" />
                    <span>{accommodation.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <Mail size={14} className="text-red-400" />
                    <span className="truncate">{accommodation.contact.email}</span>
                  </div>
                  {accommodation.contact.website && (
                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                      <Globe size={14} className="text-red-400" />
                      <a 
                        href={accommodation.contact.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="truncate hover:text-red-400 transition-colors"
                      >
                        {accommodation.contact.website}
                      </a>
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
            onClick={() => navigate('/alojamientos')}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            ← Volver a todos los alojamientos
          </button>
        </div>
      </div>

      {/* Modal de reserva */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        type="accommodation"
        itemTitle={accommodation.title}
        itemLocation={accommodation.location}
      />

      <BottomNav />
    </div>
  );
}