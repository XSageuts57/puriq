import BottomNav from '../components/BottomNav';
import { useParams } from 'react-router-dom';
import {
  Star,
  MapPin,
  Camera,
  MessageCircle,
} from 'lucide-react';

import { destinations } from '../data/destinations';

export default function DestinationDetail() {
  const { id } = useParams();

  // BUSCAR DESTINO
  const destination = destinations.find(
    (dest) => dest.id === id
  );

  // SI NO EXISTE
  if (!destination) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-xl">
        Destino no encontrado
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-24">

      {/* HERO */}
      <div className="relative h-[450px] overflow-hidden">

        <img
          src={destination.image}
          alt={destination.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/40 to-black/10"></div>

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
              • 2,484 opiniones
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
                >

                  <img
                    src={image}
                    alt={destination.title}
                    className="h-52 md:h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                </div>
              )
            )}

          </div>

        </div>

        {/* OPINIONES */}
        <div className="mt-10">

          <div className="flex items-center gap-2 mb-5">

            <MessageCircle size={20} />

            <h2 className="text-2xl font-bold">
              Opiniones
            </h2>

          </div>

          <div className="space-y-4">

            {destination.reviews.map(
              (review, index) => (
                <div
                  key={index}
                  className="bg-zinc-900 border border-white/5 rounded-3xl p-5"
                >

                  <div className="flex items-center gap-4 mb-4">

                    {/* AVATAR */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center font-bold text-lg">
                      {review.name.charAt(0)}
                    </div>

                    {/* INFO */}
                    <div>

                      <h4 className="font-semibold">
                        {review.name}
                      </h4>

                      <div className="flex text-yellow-400 text-sm">
                        {'★'.repeat(review.rating)}
                      </div>

                    </div>

                  </div>

                  {/* COMENTARIO */}
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {review.comment}
                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </div>

      <BottomNav />
    </div>
  );
}