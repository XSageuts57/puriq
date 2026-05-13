export interface Tour {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  category: 'aventura' | 'cultural' | 'naturaleza' | 'gastronomico' | 'religioso';
  includes: string[];
  notIncludes: string[];
  description: string;
  longDescription: string;
  difficulty: 'Fácil' | 'Moderado' | 'Difícil';
  groupSize: string;
  languages: string[];
  departureTime: string;
  bestSeason: string;
  itinerary: {
    day: string;
    title: string;
    description: string;
  }[];
  contact: {
    phone: string;
    email: string;
    whatsapp?: string;
  };
}

export const tours: Tour[] = [
  {
    id: "camino-inca",
    title: "Camino Inca a Machu Picchu",
    location: "Cusco, Perú",
    duration: "4 días / 3 noches",
    price: 450,
    rating: 4.9,
    reviews: 3256,
    image: "/images/camino-inca.jpeg",
    gallery: [
      "/images/camino-inca-1.jpg",
      "/images/camino-inca-2.jpg",
      "/images/camino-inca-3.jpg",
      "/images/camino-inca-4.jpeg",
    ],
    category: "aventura",
    includes: [
      "Transporte ida y vuelta desde Cusco",
      "Entrada al Camino Inca y Machu Picchu",
      "Guía profesional bilingüe",
      "Carpa de campaña",
      "Alimentación completa (3 comidas diarias)",
      "Botiquín de primeros auxilios",
      "Oxígeno de emergencia"
    ],
    notIncludes: [
      "Sleeping bag (se puede alquilar)",
      "Propinas",
      "Seguro de viaje",
      "Botellas de agua adicionales"
    ],
    description: "La caminata más famosa de Sudamérica, 4 días de aventura hasta llegar a la majestuosa Machu Picchu.",
    longDescription: "El Camino Inca es una de las rutas de trekking más espectaculares del mundo. Durante 4 días, caminarás por antiguos senderos incas, atravesando paisajes andinos de ensueño, pasos de montaña, bosques nubosos y sitios arqueológicos impresionantes. El cuarto día, llegarás a Machu Picchu a través de la Puerta del Sol (Inti Punku), presenciando el amanecer sobre la ciudadela inca.",
    difficulty: "Moderado",
    groupSize: "Máximo 16 personas",
    languages: ["Español", "Inglés", "Francés"],
    departureTime: "04:30 AM",
    bestSeason: "Abril - Octubre",
    itinerary: [
      {
        day: "Día 1",
        title: "Cusco - Piscacucho - Wayllabamba",
        description: "Salida temprana desde Cusco. Inicio del trekking en el km 82. Visita a los sitios arqueológicos de Patallacta. Caminata hasta Wayllabamba (3,000 msnm)."
      },
      {
        day: "Día 2",
        title: "Wayllabamba - Pacaymayu",
        description: "Día más desafiante. Ascenso al Abra Warmiwañusca (4,215 msnm), el punto más alto del camino. Descenso al valle de Pacaymayu."
      },
      {
        day: "Día 3",
        title: "Pacaymayu - Wiñay Wayna",
        description: "Visita a sitios arqueológicos como Runkurakay, Sayacmarca y Phuyupatamarca. Llegada a Wiñay Wayna con vistas espectaculares."
      },
      {
        day: "Día 4",
        title: "Wiñay Wayna - Machu Picchu - Cusco",
        description: "Llegada temprano a Inti Punku (Puerta del Sol). Amanecer sobre Machu Picchu. Tour guiado por la ciudadela y regreso a Cusco."
      }
    ],
    contact: {
      phone: "+51 84 254000",
      email: "info@caminoinca.com",
      whatsapp: "+51987654321"
    }
  },
  {
    id: "amazon-explorer",
    title: "Explorador Amazónico",
    location: "Puerto Maldonado, Madre de Dios",
    duration: "3 días / 2 noches",
    price: 280,
    rating: 4.8,
    reviews: 1243,
    image: "/images/madre-dios.jpg",
    gallery: [
      "/images/madre-dios-1.jpg",
      "/images/madre-dios-2.jpg",
      "/images/madre-dios-3.jpg",
    ],
    category: "naturaleza",
    includes: [
      "Traslados aeropuerto - lodge",
      "Alojamiento en eco-lodge",
      "Alimentación completa",
      "Excursiones con guía nativo",
      "Bote para excursiones",
      "Botas de agua"
    ],
    notIncludes: [
      "Vuelos a Puerto Maldonado",
      "Bebidas alcohólicas",
      "Propinas",
      "Seguro de viaje"
    ],
    description: "Sumérgete en la selva amazónica, observa fauna exótica y aprende sobre la biodiversidad de la región.",
    longDescription: "Esta aventura te llevará al corazón de la Amazonía peruana. Alojado en un eco-lodge sostenible, explorarás la Reserva Nacional Tambopata, uno de los lugares con mayor biodiversidad del planeta. Navegarás por ríos, caminarás por senderos interpretativos, visitarás collpas (arcillas) para observar guacamayos y aprenderás sobre plantas medicinales con guías locales expertos.",
    difficulty: "Fácil",
    groupSize: "Máximo 12 personas",
    languages: ["Español", "Inglés"],
    departureTime: "09:00 AM",
    bestSeason: "Todo el año",
    itinerary: [
      {
        day: "Día 1",
        title: "Puerto Maldonado - Eco Lodge",
        description: "Llegada a Puerto Maldonado, navegación por el río Madre de Dios hasta el lodge. Caminata nocturna para observar fauna."
      },
      {
        day: "Día 2",
        title: "Collpa de Guacamayos",
        description: "Visita temprano a la collpa de guacamayos. Tarde de pesca de pirañas y kayak en el río."
      },
      {
        day: "Día 3",
        title: "Caminata por la selva - Regreso",
        description: "Última caminata por senderos interpretativos. Regreso a Puerto Maldonado para tomar el vuelo."
      }
    ],
    contact: {
      phone: "+51 82 571234",
      email: "info@amazonexplorer.com",
      whatsapp: "+51987654322"
    }
  },
  {
    id: "valle-sagrado",
    title: "Tour Valle Sagrado",
    location: "Cusco, Perú",
    duration: "1 día",
    price: 85,
    rating: 4.7,
    reviews: 2156,
    image: "/images/valle-sagrado.jpg",
    gallery: [
      "/images/valle-sagrado-1.jpg",
      "/images/valle-sagrado-2.jpg",
      "/images/valle-sagrado-3.jpg",
    ],
    category: "cultural",
    includes: [
      "Transporte ida y vuelta",
      "Guía profesional",
      "Entradas a sitios arqueológicos",
      "Almuerzo buffet",
      "Botella de agua"
    ],
    notIncludes: [
      "Desayuno",
      "Propinas",
      "Comidas adicionales"
    ],
    description: "Recorre los impresionantes valles andinos, visita mercados tradicionales y sitios arqueológicos incas.",
    longDescription: "El Valle Sagrado de los Incas fue la zona más productiva del Imperio Inca. En este tour de día completo visitarás el pintoresco pueblo de Pisac, con su famoso mercado artesanal y la impresionante fortaleza en la montaña. También conocerás Ollantaytambo, una fortaleza estratégica con terrazas increíbles, y el pueblo de Chinchero, conocido por sus tejidos tradicionales.",
    difficulty: "Fácil",
    groupSize: "Máximo 20 personas",
    languages: ["Español", "Inglés", "Portugués"],
    departureTime: "08:00 AM",
    bestSeason: "Todo el año",
    itinerary: [
      {
        day: "Día completo",
        title: "Cusco - Pisac - Urubamba - Ollantaytambo - Chinchero - Cusco",
        description: "Salida temprano hacia Pisac. Visita al mercado artesanal y la fortaleza. Almuerzo buffet en Urubamba. Tour por Ollantaytambo y Chinchero. Regreso a Cusco."
      }
    ],
    contact: {
      phone: "+51 84 254001",
      email: "info@vallesagrado.com",
      whatsapp: "+51987654323"
    }
  },
  {
    id: "nazca-lines",
    title: "Sobre vuelo Líneas de Nazca",
    location: "Nazca, Ica",
    duration: "Medio día",
    price: 120,
    rating: 4.6,
    reviews: 1892,
    image: "/images/nazca.jpg",
    gallery: [
      "/images/nazca-1.jpg",
      "/images/nazca-2.jpg",
      "/images/nazca-3.jpg",
    ],
    category: "aventura",
    includes: [
      "Sobre vuelo sobre las Líneas de Nazca",
      "Transporte desde/hacia la terminal",
      "Guía en tierra",
      "Tasas aeroportuarias"
    ],
    notIncludes: [
      "Traslados desde Lima/Ica",
      "Alimentos",
      "Propinas"
    ],
    description: "Vuela sobre los misteriosos geoglifos de Nazca y descubre una de las mayores incógnitas arqueológicas del mundo.",
    longDescription: "Las Líneas de Nazca son uno de los mayores misterios arqueológicos del mundo. En este sobre vuelo de 35 minutos, podrás apreciar desde el aire las impresionantes figuras: el colibrí, el mono, el cóndor, la araña y muchas más. Los guías te explicarán las teorías sobre su origen y significado mientras vuelas sobre este fascinante desierto.",
    difficulty: "Fácil",
    groupSize: "Máximo 12 personas",
    languages: ["Español", "Inglés"],
    departureTime: "09:00 AM, 11:00 AM, 14:00 PM",
    bestSeason: "Todo el año",
    itinerary: [
      {
        day: "Medio día",
        title: "Aeropuerto de Nazca - Sobre vuelo",
        description: "Llegada al aeropuerto, check-in y briefing. Sobre vuelo de 35 minutos sobre las líneas. Regreso."
      }
    ],
    contact: {
      phone: "+51 56 523456",
      email: "info@nazcaflights.com",
      whatsapp: "+51987654324"
    }
  },
  {
    id: "titicaca-experience",
    title: "Islas del Lago Titicaca",
    location: "Puno, Perú",
    duration: "2 días / 1 noche",
    price: 150,
    rating: 4.8,
    reviews: 1567,
    image: "/images/lago-titicaca3.jpg",
    gallery: [
      "/images/islas-1.jpg",
      "/images/islas-2.jpg",
      "/images/islas-3.jpg",
    ],
    category: "cultural",
    includes: [
      "Traslados hotel - puerto",
      "Bote a las islas",
      "Alojamiento en casa de familia",
      "Alimentación completa",
      "Guía local",
      "Actividades culturales"
    ],
    notIncludes: [
      "Traslados a Puno",
      "Propinas",
      "Seguro de viaje"
    ],
    description: "Pasa una noche con familias locales en las islas flotantes de los Uros y en la isla de Amantaní.",
    longDescription: "Esta experiencia única te permitirá conocer la cultura viva del Lago Titicaca. Visitarás las famosas islas flotantes de los Uros, hechas completamente de totora, donde conocerás su forma de vida. Luego, pasarás la noche con una familia en la isla de Amantaní, participando en sus tradiciones y disfrutando de su hospitalidad.",
    difficulty: "Fácil",
    groupSize: "Máximo 15 personas",
    languages: ["Español", "Inglés"],
    departureTime: "08:00 AM",
    bestSeason: "Mayo - Septiembre",
    itinerary: [
      {
        day: "Día 1",
        title: "Puno - Uros - Amantaní",
        description: "Salida hacia las islas Uros. Navegación a Amantaní. Caminata al templo Pachatata. Noche con familia local."
      },
      {
        day: "Día 2",
        title: "Amantaní - Taquile - Puno",
        description: "Desayuno en la isla. Visita a la isla de Taquile, famosa por sus textiles. Regreso a Puno."
      }
    ],
    contact: {
      phone: "+51 51 365789",
      email: "info@titicacaexperience.com",
      whatsapp: "+51987654325"
    }
  },
  {
    id: "huacachina-adventure",
    title: "Aventura en Huacachina",
    location: "Ica, Perú",
    duration: "Medio día",
    price: 65,
    rating: 4.9,
    reviews: 2341,
    image: "/images/huacachina3.jpg",
    gallery: [
      "/images/huacachina1.jpg",
      "/images/huacachina2.jpg",
      "/images/huacachina.jpg",
    ],
    category: "aventura",
    includes: [
      "Paseo en tubulares",
      "Tabla de sandboarding",
      "Guía especializado",
      "Equipo de seguridad",
      "Fotografías"
    ],
    notIncludes: [
      "Traslados a Ica",
      "Alimentos",
      "Bebidas",
      "Ropa adecuada"
    ],
    description: "Emoción y adrenalina en las dunas más altas de América del Sur. Tubulares y sandboarding.",
    longDescription: "Huacachina es el único oasis de América del Sur y el lugar perfecto para los amantes de la adrenalina. Subirás a potentes tubulares que recorren las dunas a gran velocidad, subiendo y bajando pendientes pronunciadas. Luego, practicarás sandboarding, deslizándote por las dunas con tablas especiales. El atardecer en el oasis es espectacular.",
    difficulty: "Moderado",
    groupSize: "Máximo 10 personas",
    languages: ["Español", "Inglés"],
    departureTime: "15:00 PM (atardecer)",
    bestSeason: "Marzo - Diciembre",
    itinerary: [
      {
        day: "Tarde",
        title: "Huacachina - Dunas",
        description: "Salida desde Huacachina en tubulares. Recorrido por las dunas más altas. Práctica de sandboarding. Atardecer en el oasis."
      }
    ],
    contact: {
      phone: "+51 56 234567",
      email: "info@huacachinaadventure.com",
      whatsapp: "+51987654326"
    }
  }
];