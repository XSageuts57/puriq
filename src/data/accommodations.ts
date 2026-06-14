export interface Accommodation {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  type: 'hotel' | 'hostal' | 'resort' | 'casa' | 'eco-lodge';
  amenities: string[];
  description: string;
  longDescription: string;
  includes: string[];
  notIncludes: string[];
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}




export const accommodations: Accommodation[] = [
  {
    id: "belmond-sanctuary-lodge",
    title: "Belmond Sanctuary Lodge",
    location: "Machu Picchu, Cusco",
    price: 520,
    rating: 4.9,
    reviews: 1247,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
    ],
    type: "hotel",
    amenities: ["WiFi gratis", "Desayuno incluido", "Vista a la montaña", "Spa", "Restaurante", "Bar", "Transporte al sitio"],
    description: "El único hotel ubicado justo en la entrada de Machu Picchu. Disfruta de vistas espectaculares y comodidad de lujo.",
    longDescription: "Belmond Sanctuary Lodge es el único hotel que se encuentra junto a la ciudadela de Machu Picchu. Ofrece habitaciones lujosas con vistas increíbles, un restaurante de clase mundial y un spa para relajarse después de explorar las ruinas. La ubicación es inmejorable, permitiendo a los huéspedes acceder al sitio arqueológico antes que las multitudes.",
    includes: [
      "Alojamiento de lujo",
      "Desayuno buffet",
      "Acceso prioritario a Machu Picchu",
      "WiFi de alta velocidad",
      "Servicio de conserjería 24/7"
    ],
    notIncludes: [
      "Traslados desde Cusco",
      "Almuerzos y cenas",
      "Tratamientos de spa",
      "Propinas"
    ],
    contact: {
      phone: "+51 84 211000",
      email: "reservas@belmond.com.pe",
      website: "https://www.belmond.com"
    },
    coordinates: {
      lat: -13.1631,
      lng: -72.5450
    }
  },
  {
    id: "tambo-del-inka",
    title: "Tambo del Inka",
    location: "Urubamba, Cusco",
    price: 380,
    rating: 4.8,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
    ],
    type: "resort",
    amenities: ["Piscina", "Spa", "Restaurante", "Bar", "Gimnasio", "Estacionamiento gratis", "WiFi gratis"],
    description: "Un lujoso resort en el Valle Sagrado con su propia estación de tren a Machu Picchu.",
    longDescription: "Tambo del Inka combina lujo moderno con tradición andina. Este resort de 5 estrellas cuenta con su propia estación de tren que te lleva directamente a Machu Picchu. Disfruta de habitaciones espaciosas, una piscina climatizada y el premiado restaurante que ofrece lo mejor de la gastronomía peruana.",
    includes: [
      "Alojamiento de lujo",
      "Desayuno buffet",
      "Acceso a piscina y spa",
      "WiFi en todo el hotel",
      "Estacionamiento gratuito"
    ],
    notIncludes: [
      "Traslados al aeropuerto",
      "Comidas adicionales",
      "Tratamientos de spa",
      "Tickets a Machu Picchu"
    ],
    contact: {
      phone: "+51 84 581777",
      email: "reservas@tambodelinka.com",
      website: "https://www.tambodelinka.com"
    },
    coordinates: {
      lat: -13.3036,
      lng: -72.1151
    }
  },
  {
    id: "casa-andina-miraflores",
    title: "Casa Andina Premium",
    location: "Miraflores, Lima",
    price: 180,
    rating: 4.6,
    reviews: 2156,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
    ],
    type: "hotel",
    amenities: ["WiFi gratis", "Desayuno incluido", "Restaurante", "Bar", "Gimnasio", "Centro de negocios"],
    description: "Hotel elegante en el corazón de Miraflores, cerca del malecón y restaurantes.",
    longDescription: "Casa Andina Premium Miraflores ofrece una experiencia de lujo en el distrito más exclusivo de Lima. Las habitaciones son modernas y confortables, el restaurante sirve lo mejor de la cocina peruana e internacional, y la ubicación es perfecta para explorar los mejores restaurantes, tiendas y atracciones de la ciudad.",
    includes: [
      "Alojamiento premium",
      "Desayuno buffet",
      "WiFi de alta velocidad",
      "Acceso al gimnasio",
      "Servicio a la habitación"
    ],
    notIncludes: [
      "Traslados",
      "Almuerzos y cenas",
      "Lavandería",
      "Propinas"
    ],
    contact: {
      phone: "+51 1 2139000",
      email: "reservas@casaandina.com",
      website: "https://www.casaandina.com"
    },
    coordinates: {
      lat: -12.1211,
      lng: -77.0265
    }
  },
  {
    id: "eco-lodge-tambopata",
    title: "Tambopata Eco Lodge",
    location: "Puerto Maldonado, Madre de Dios",
    price: 250,
    rating: 4.7,
    reviews: 634,
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
    ],
    type: "eco-lodge",
    amenities: ["Excursiones incluidas", "Comidas caseras", "Guías locales", "Observación de aves", "WiFi en áreas comunes"],
    description: "Alójate en la selva amazónica con todas las comodidades y excursiones incluidas.",
    longDescription: "Tambopata Eco Lodge ofrece una experiencia única en la Amazonía peruana. Ubicado en la Reserva Nacional Tambopata, podrás explorar la increíble biodiversidad de la selva con guías expertos. Las cabañas son cómodas y están diseñadas para integrarse con la naturaleza, ofreciendo una experiencia auténtica y sostenible.",
    includes: [
      "Alojamiento en cabaña",
      "Todas las comidas",
      "Excursiones guiadas",
      "Guía especializado",
      "Transporte desde Puerto Maldonado"
    ],
    notIncludes: [
      "Vuelos a Puerto Maldonado",
      "Bebidas alcohólicas",
      "Seguro de viaje",
      "Propinas"
    ],
    contact: {
      phone: "+51 82 571020",
      email: "info@tambopatalodge.com",
      website: "https://www.tambopatalodge.com"
    },
    coordinates: {
      lat: -12.5933,
      lng: -69.1842
    }
  }

  
];


// Interfaz para alojamientos de usuario
interface UserAccommodation {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  type?: 'hotel' | 'hostal' | 'resort' | 'casa' | 'eco-lodge';
  amenities?: string[];
  gallery?: string[];
  includes?: string[];
  notIncludes?: string[];
  contactPhone?: string;
  contactEmail?: string;
  isUserAdded?: boolean;
}

export const getAllAccommodations = (): Accommodation[] => {
  const userAccommodations: UserAccommodation[] = JSON.parse(localStorage.getItem('user_accommodations') || '[]');
  
  // Asegurar que los alojamientos de usuario tengan la estructura correcta
  const formattedUserAccommodations: Accommodation[] = userAccommodations.map((acc: UserAccommodation) => ({
    id: acc.id,
    title: acc.title,
    location: acc.location,
    price: acc.price,
    rating: acc.rating || 0,
    reviews: acc.reviews || 0,
    image: acc.image,
    gallery: acc.gallery || [acc.image],
    type: acc.type || 'hotel',
    amenities: acc.amenities || ['WiFi gratis'],
    description: acc.description,
    longDescription: acc.description,
    includes: acc.includes || [],
    notIncludes: acc.notIncludes || [],
    contact: {
      phone: acc.contactPhone || '',
      email: acc.contactEmail || '',
    },
    coordinates: { lat: 0, lng: 0 },
  }));
  
  return [...accommodations, ...formattedUserAccommodations];
};