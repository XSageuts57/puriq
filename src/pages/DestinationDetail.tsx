import BottomNav from '../components/BottomNav';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Star,
  MapPin,
  Camera,
} from 'lucide-react';
import { destinations } from '../data/destinations';
import Reviews from '../components/Reviews';

export default function DestinationDetail() {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // BUSCAR DESTINO
  const destination = destinations.find(
    (dest) => dest.id === id
  );

  // Carrusel automático con animación - cambia de imagen cada 4 segundos
  useEffect(() => {
    if (!destination?.gallery.length) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev + 1 >= destination.gallery.length ? 0 : prev + 1
      );
    }, 4000);
    
    return () => clearInterval(interval);
  }, [destination?.gallery.length]);

  // SI NO EXISTE
  if (!destination) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-xl">
        Destino no encontrado
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">

      {/* HERO CON CARRUSEL Y ANIMACIÓN */}
      <div className="relative h-[450px] overflow-hidden">
        
        {/* Contenedor de imágenes con animación de deslizamiento */}
        <div 
          className="flex transition-transform duration-700 ease-out h-full"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {(destination.gallery || [destination.image]).map((img, idx) => (
            <div key={idx} className="min-w-full h-full relative">
              <img
                src={img}
                alt={`${destination.title} - ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10"></div>

        {/* INFO */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">

          <div className="flex items-center gap-2 mb-3">
            <MapPin
              size={17}
              className="text-red-400"
            />

            <span className="text-zinc-300">
              {destination.location}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {destination.title}
          </h1>

          <div className="flex items-center gap-2 mt-4">

            <Star
              className="text-yellow-400 fill-yellow-400"
              size={18}
            />

            <span className="font-semibold">
              {destination.rating}
            </span>

            <span className="text-zinc-400">
              • {destination.reviews} opiniones
            </span>

          </div>

        </div>

      </div>

      {/* CONTENIDO */}
      <div className="max-w-6xl mx-auto px-5 pt-10">

        {/* DESCRIPCIÓN */}
        <div className="bg-zinc-900 border border-white/5 rounded-3xl p-6 md:p-8">

          <h2 className="text-2xl font-bold mb-5">
            Sobre este destino
          </h2>

          <p className="text-zinc-300 leading-relaxed text-[15px] md:text-base">
            {destination.description}
          </p>

        </div>

        {/* GALERÍA */}
        <div className="mt-10">

          <div className="flex items-center gap-2 mb-5">

            <Camera size={20} />

            <h2 className="text-2xl font-bold">
              Galería
            </h2>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            {destination.gallery.map(
              (image, index) => (
                <div
                  key={index}
                  className="group overflow-hidden rounded-2xl"
                  onClick={() => setCurrentImageIndex(index)}
                >

                  <img
                    src={image}
                    alt={destination.title}
                    className="h-52 md:h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                  />

                </div>
              )
            )}

          </div>

        </div>

        {/* SECCIÓN DE OPINIONES - NUEVA */}
        <div className="mt-10">
          <Reviews 
            itemId={destination.id} 
            itemType="destination"
          />
        </div>

      </div>

      <BottomNav />
    </div>
  );
}