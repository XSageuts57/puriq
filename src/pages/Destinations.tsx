import BottomNav from '../components/BottomNav';
import {
  ArrowRight,
  Search,
  MapPin,
  Star,
} from 'lucide-react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Destinations() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // DESTINOS
  const destinations = [
    {
      id: 'machu-picchu',
      title: 'Machu Picchu',
      location: 'Cusco • Perú',
      rating: 4.9,
      category: 'Maravilla del Mundo',
      image:
        'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1200',
      description:
        'La joya arqueológica más importante del Perú.',
    },

    {
      id: 'islas-ballestas',
      title: 'Islas Ballestas',
      location: 'Ica • Reserva Natural',
      rating: 4.8,
      category: 'Naturaleza',
      image: '/images/islas-ballestas.jpg',
      description:
        'Fauna marina, aves y paisajes impresionantes.',
    },

    {
      id: 'lago-titicaca',
      title: 'Lago Titicaca',
      location: 'Puno • Lago Sagrado',
      rating: 4.7,
      category: 'Cultura',
      image:
        '/images/lago-titicaca.jpg',
      description:
        'El lago navegable más alto del mundo.',
    },

    {
      id: 'huacachina',
      title: 'Huacachina',
      location: 'Ica • Oasis del Desierto',
      rating: 4.9,
      category: 'Aventura',
      image:
        '/images/huacachina.jpg',
      description:
        'Dunas gigantes, tubulares y sunsets increíbles.',
    },
  ];

  // FILTRADO
  const filteredDestinations = destinations.filter((destination) =>
    destination.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-24">

      {/* HEADER */}
      <div className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 py-4">

          <p className="text-red-400 text-sm font-semibold uppercase tracking-wider mb-1">
            Explora
          </p>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Destinos del Perú
          </h1>

          {/* BUSCADOR */}
          <div className="mt-5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-1.5">

              <div className="relative flex items-center">
                <Search
                  className="absolute left-5 text-zinc-400"
                  size={20}
                />

                <input
                  type="text"
                  placeholder="Buscar destinos..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="w-full bg-transparent border-0 pl-14 py-4 text-base placeholder-zinc-400 focus:outline-none"
                />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* CONTENIDO */}
      <div className="max-w-7xl mx-auto px-5 pt-8">

        {/* DESTINO PRINCIPAL */}
        <div
          onClick={() =>
            navigate('/destinos/machu-picchu')
          }
          className="group relative rounded-3xl overflow-hidden h-[520px] cursor-pointer shadow-2xl mb-10"
        >

          <img
            src={destinations[0].image}
            alt="Machu Picchu"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

          {/* BADGE */}
          <div className="absolute top-5 left-5">
            <div className="bg-red-600/90 backdrop-blur-lg px-4 py-2 rounded-full text-sm font-medium">
              DESTINO MÁS POPULAR
            </div>
          </div>

          {/* INFO */}
          <div className="absolute bottom-0 left-0 right-0 p-8">

            <div className="flex items-center gap-2 mb-3">
              <MapPin
                size={16}
                className="text-red-400"
              />

              <span className="text-sm text-zinc-300">
                {destinations[0].location}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              {destinations[0].title}
            </h2>

            <p className="text-zinc-300 max-w-xl leading-relaxed">
              {destinations[0].description}
            </p>

            <div className="flex items-center gap-2 mt-4">
              <Star
                size={18}
                className="text-yellow-400 fill-yellow-400"
              />

              <span className="font-medium">
                {destinations[0].rating}
              </span>

              <span className="text-zinc-400">
                • 2,484 reseñas
              </span>
            </div>

            <button className="mt-6 bg-white text-black px-7 py-3 rounded-2xl font-semibold flex items-center gap-2 hover:bg-zinc-100 transition-all group/button">

              Explorar destino

              <ArrowRight
                size={18}
                className="group-hover/button:translate-x-1 transition-transform"
              />

            </button>

          </div>
        </div>

        {/* TITULO GRID */}
        <div className="flex items-center justify-between mb-6">

          <div>
            <h3 className="text-2xl font-bold">
              Explora más destinos
            </h3>

            <p className="text-zinc-400 text-sm mt-1">
              Descubre lugares increíbles del Perú
            </p>
          </div>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredDestinations.slice(1).map((destination) => (
            <div
              key={destination.id}
              onClick={() =>
                navigate(`/destinos/${destination.id}`)
              }
              className="group relative rounded-3xl overflow-hidden h-[360px] cursor-pointer border border-white/10 hover:border-white/20 transition-all"
            >

              <img
                src={destination.image}
                alt={destination.title}
                className="absolute w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

              {/* CATEGORY */}
              <div className="absolute top-4 left-4">
                <div className="bg-black/50 backdrop-blur-lg px-3 py-1 rounded-full text-xs border border-white/10">
                  {destination.category}
                </div>
              </div>

              {/* CONTENT */}
              <div className="absolute bottom-0 left-0 right-0 p-5">

                <div className="flex items-center gap-2 mb-2">
                  <MapPin
                    size={15}
                    className="text-red-400"
                  />

                  <span className="text-sm text-zinc-300">
                    {destination.location}
                  </span>
                </div>

                <h3 className="text-2xl font-bold">
                  {destination.title}
                </h3>

                <p className="text-zinc-300 text-sm mt-2 leading-relaxed">
                  {destination.description}
                </p>

                <div className="flex items-center justify-between mt-5">

                  <div className="flex items-center gap-1">
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />

                    <span className="text-sm font-medium">
                      {destination.rating}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-red-400 text-sm font-medium group-hover:gap-2 transition-all">
                    Ver más
                    <ArrowRight size={15} />
                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>

        {/* BANNER */}
        <div className="mt-12 mb-10">

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 to-red-800 p-8 md:p-10">

            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">

              <div className="inline-flex bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full text-sm mb-4">
                ✨ Promoción limitada
              </div>

              <h4 className="text-3xl md:text-4xl font-bold mb-3">
                ¡Ofertas exclusivas!
              </h4>

              <p className="text-white/90 mb-6 max-w-lg leading-relaxed">
                Aprovecha descuentos especiales en paquetes turísticos y experiencias únicas por todo el Perú.
              </p>

              <button className="bg-white text-red-600 px-7 py-3 rounded-2xl font-semibold hover:bg-zinc-100 transition-all shadow-xl">
                Ver ofertas
              </button>

            </div>

          </div>

        </div>

      </div>

      <BottomNav />
    </div>
  );
}