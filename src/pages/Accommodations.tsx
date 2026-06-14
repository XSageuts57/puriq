import BottomNav from '../components/BottomNav';
import { Search, MapPin, Star, Wifi, Coffee, Dumbbell, Waves, Utensils, Car, Sparkles, Bed, Plus, List } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddContentModal from '../components/AddContentModal';
import UserContentManager from '../components/UserContentManager';
import { getAllAccommodations, type Accommodation } from '../data/accommodations';

export default function Accommodations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMyContent, setShowMyContent] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  // Obtener todos los alojamientos (incluyendo los agregados por usuarios)
  const allAccommodations = getAllAccommodations();

  const types = [
    { id: 'all', label: 'Todos', icon: '🏨' },
    { id: 'hotel', label: 'Hoteles', icon: '🏨' },
    { id: 'resort', label: 'Resorts', icon: '🏖️' },
    { id: 'eco-lodge', label: 'Eco Lodges', icon: '🌿' },
    { id: 'casa', label: 'Casas', icon: '🏠' },
  ];

  const getAmenityIcon = (amenity: string) => {
    if (amenity.includes('WiFi')) return <Wifi size={14} />;
    if (amenity.includes('Desayuno')) return <Coffee size={14} />;
    if (amenity.includes('Piscina')) return <Waves size={14} />;
    if (amenity.includes('Gimnasio')) return <Dumbbell size={14} />;
    if (amenity.includes('Restaurante')) return <Utensils size={14} />;
    if (amenity.includes('Estacionamiento')) return <Car size={14} />;
    return null;
  };

  const filteredAccommodations = allAccommodations.filter((acc) => {
    const matchesSearch = acc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          acc.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || acc.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Forzar re-render cuando se agrega nuevo contenido
  useEffect(() => {
    // Este efecto se ejecuta cuando refreshKey cambia
  }, [refreshKey]);

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 py-4">
          
          <div className="flex justify-between items-center mb-1">
            <p className="text-red-400 text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
              <Bed size={16} /> Alojamientos
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowMyContent(!showMyContent)}
                className={`p-2 rounded-xl transition-all ${showMyContent ? 'bg-red-600' : 'bg-white/10 hover:bg-white/20'}`}
                title="Ver mis alojamientos"
              >
                <List size={20} />
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 p-2 rounded-xl transition-all shadow-lg shadow-red-600/30"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Dónde hospedarte
          </h1>

          {/* Buscador */}
          <div className="mt-5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-1.5">
              <div className="relative flex items-center">
                <Search className="absolute left-5 text-zinc-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por hotel o ciudad..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-0 pl-14 py-4 text-base placeholder-zinc-400 focus:outline-none text-white"
                />
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {types.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  selectedType === type.id
                    ? 'bg-red-600 text-white'
                    : 'bg-white/10 text-zinc-300 hover:bg-white/20'
                }`}
              >
                <span className="mr-1">{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-5 pt-8">
        
        {/* Mostrar mis contenidos si está activo */}
        {showMyContent ? (
          <div className="mb-8">
            <UserContentManager 
              type="accommodation" 
              onUpdate={() => setRefreshKey(prev => prev + 1)} 
            />
          </div>
        ) : (
          <>
            {/* Resultados */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAccommodations.map((accommodation) => (
                <div
                  key={accommodation.id}
                  onClick={() => navigate(`/alojamientos/${accommodation.id}`)}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-white/20 transition-all bg-zinc-900/30"
                >
                  {/* Imagen */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={accommodation.image}
                      alt={accommodation.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Badge de "Agregado por usuario" - Esquina superior izquierda */}
                    {(accommodation as Accommodation & { isUserAdded?: boolean }).isUserAdded && (
                      <div className="absolute top-3 left-3 z-20 bg-green-600/90 backdrop-blur-md rounded-full px-2 py-0.5 text-[10px] font-medium">
                        👤 Agregado por usuario
                      </div>
                    )}
                    
                    {/* Rating */}
                    <div className="absolute top-3 left-3 z-20 bg-black/60 backdrop-blur-md rounded-full px-2 py-1 text-xs flex items-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold text-sm">{accommodation.rating}</span>
                      <span className="text-zinc-300 text-xs">({accommodation.reviews})</span>
                    </div>
                    
                    {/* Precio */}
                    <div className="absolute top-3 right-3 z-20 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 text-sm font-bold border border-white/20">
                      ${accommodation.price}
                      <span className="text-xs font-normal text-zinc-300">/noche</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 mb-1">
                      <MapPin size={12} className="text-red-400" />
                      <span className="text-xs text-zinc-400">{accommodation.location}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-1.5 line-clamp-1">{accommodation.title}</h3>
                    <p className="text-zinc-400 text-xs mb-3 line-clamp-2">{accommodation.description}</p>
                    
                    {/* Amenidades */}
                    <div className="flex flex-wrap gap-1.5">
                      {accommodation.amenities.slice(0, 3).map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-0.5 text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded-full">
                          {getAmenityIcon(amenity)}
                          <span>{amenity.split(' ')[0]}</span>
                        </div>
                      ))}
                      {accommodation.amenities.length > 3 && (
                        <span className="text-[10px] text-zinc-500">+{accommodation.amenities.length - 3}</span>
                      )}
                    </div>

                    <button className="w-full mt-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 py-2 rounded-xl font-medium text-xs transition-all flex items-center justify-center gap-2 group/btn">
                      Ver disponibilidad
                      <Sparkles size={12} className="group-hover/btn:rotate-12 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredAccommodations.length === 0 && (
              <div className="text-center py-20">
                <p className="text-zinc-400">No se encontraron alojamientos</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="mt-4 bg-red-600 px-6 py-2 rounded-xl hover:bg-red-700 transition-all"
                >
                  + Agregar el primero
                </button>
              </div>
            )}

            {/* Banner promocional */}
            <div className="mt-12 mb-10">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-white/10 p-8">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-600/10 to-transparent rounded-full blur-3xl"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">¿Buscas algo especial?</h3>
                    <p className="text-zinc-300">Contáctanos para encontrar el alojamiento perfecto para ti</p>
                  </div>
                  <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-zinc-100 transition-all">
                    Hablar con un asesor
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal para agregar alojamiento */}
      <AddContentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        type="accommodation"
        onSuccess={() => {
          setRefreshKey(prev => prev + 1);
          setShowMyContent(false);
        }}
      />

      <BottomNav />
    </div>
  );
}