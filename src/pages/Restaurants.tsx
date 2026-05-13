import BottomNav from '../components/BottomNav';
import { Search, MapPin, Star, Utensils, Clock, } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurants } from '../data/restaurants';

export default function Restaurants() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');
  const navigate = useNavigate();

  const cuisines = [
    { id: 'all', label: 'Todos', icon: '🍽️' },
    { id: 'Peruana', label: 'Peruana', icon: '🇵🇪' },
    { id: 'Nikkei', label: 'Nikkei', icon: '🍣' },
    { id: 'Marina', label: 'Marina', icon: '🐟' },
    { id: 'Internacional', label: 'Internacional', icon: '🌍' },
  ];

  const getPriceIcon = (priceRange: string) => {
    const count = priceRange.split('💰').length - 1;
    return '💰'.repeat(count);
  };

  const filteredRestaurants = restaurants.filter((rest) => {
    const matchesSearch = rest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rest.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = selectedCuisine === 'all' || rest.cuisine.includes(selectedCuisine);
    return matchesSearch && matchesCuisine;
  });

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 py-4">
          
          <p className="text-red-400 text-sm font-semibold uppercase tracking-wider mb-1 flex items-center gap-2">
            <Utensils size={16} /> Gastronomía
          </p>
          
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Restaurantes del Perú
          </h1>

          {/* Buscador */}
          <div className="mt-5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-1.5">
              <div className="relative flex items-center">
                <Search className="absolute left-5 text-zinc-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar restaurante o ubicación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-0 pl-14 py-4 text-base placeholder-zinc-400 focus:outline-none text-white"
                />
              </div>
            </div>
          </div>

          {/* Filtros por tipo de cocina */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {cuisines.map((cuisine) => (
              <button
                key={cuisine.id}
                onClick={() => setSelectedCuisine(cuisine.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCuisine === cuisine.id
                    ? 'bg-red-600 text-white'
                    : 'bg-white/10 text-zinc-300 hover:bg-white/20'
                }`}
              >
                <span className="mr-1">{cuisine.icon}</span>
                {cuisine.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-5 pt-8">
        
        {/* Grid de restaurantes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() => navigate(`/restaurantes/${restaurant.id}`)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-white/20 transition-all bg-zinc-900/30"
            >
              {/* Imagen */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                {/* Precio */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 text-sm font-bold border border-white/20">
                  {getPriceIcon(restaurant.priceRange)}
                </div>
                
                {/* Rating */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md rounded-full px-2 py-1 text-xs flex items-center gap-1">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span>{restaurant.rating}</span>
                  <span className="text-zinc-400">({restaurant.reviews})</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-red-400" />
                  <span className="text-sm text-zinc-400">{restaurant.location}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 line-clamp-1">{restaurant.title}</h3>
                <p className="text-zinc-400 text-sm mb-3 line-clamp-2">{restaurant.description}</p>
                
                {/* Tipo de cocina */}
                <div className="flex flex-wrap gap-2">
                  {restaurant.cuisine.slice(0, 2).map((type, idx) => (
                    <div key={idx} className="text-xs text-red-400 bg-red-600/10 px-2 py-1 rounded-full">
                      {type}
                    </div>
                  ))}
                  {restaurant.cuisine.length > 2 && (
                    <span className="text-xs text-zinc-500">+{restaurant.cuisine.length - 2}</span>
                  )}
                </div>

                {/* Horario */}
                <div className="flex items-center gap-1 mt-3 text-xs text-zinc-500">
                  <Clock size={12} />
                  <span>{restaurant.schedule.split('/')[0]}</span>
                </div>

                <button className="w-full mt-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 py-2.5 rounded-xl font-medium text-sm transition-all">
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-400">No se encontraron restaurantes</p>
          </div>
        )}

        {/* Banner promocional */}
        <div className="mt-12 mb-10">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-white/10 p-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-600/10 to-transparent rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">¿Buscas una experiencia gastronómica?</h3>
                <p className="text-zinc-300">Descubre los mejores restaurantes de Perú</p>
              </div>
              <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-zinc-100 transition-all">
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