export interface Restaurant {
  id: string;
  title: string;
  location: string;
  priceRange: '💰' | '💰💰' | '💰💰💰' | '💰💰💰💰';
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  cuisine: string[];
  features: string[];
  description: string;
  longDescription: string;
  schedule: string;
  contact: {
    phone: string;
    email: string;
    address: string;
    website?: string;
  };
  signatureDishes: string[];
}

export const restaurants: Restaurant[] = [
  {
    id: "central",
    title: "Central",
    location: "Barranco, Lima",
    priceRange: "💰💰💰💰",
    rating: 4.9,
    reviews: 2847,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
    ],
    cuisine: ["Peruana", "Fusión", "Alta cocina", "Contemporánea"],
    features: ["Mejor restaurante del mundo", "Menú degustación", "Ingredientes autóctonos", "Vista espectacular"],
    description: "Considerado el mejor restaurante de América Latina, Central ofrece una experiencia culinaria única basada en la biodiversidad peruana.",
    longDescription: "Dirigido por el chef Virgilio Martínez, Central ha sido reconocido como el Mejor Restaurante del Mundo en 2023. Su propuesta gastronómica explora los diferentes ecosistemas del Perú, desde el mar hasta la selva amazónica, pasando por los Andes. Cada plato es una expedición a través de las altitudes y profundidades del país, utilizando ingredientes autóctonos en preparaciones innovadoras.",
    schedule: "Martes a Sábado: 12:30 - 15:00 / 19:30 - 23:00",
    contact: {
      phone: "+51 1 2428515",
      email: "reservas@central.com.pe",
      address: "Av. Pedro de Osma 301, Barranco",
      website: "https://centralrestaurante.com.pe"
    },
    signatureDishes: ["Mater Elevation", "Extremo del Pacífico", "Valle Alto", "Selva Amazónica"]
  },
  {
    id: "maido",
    title: "Maido",
    location: "Miraflores, Lima",
    priceRange: "💰💰💰💰",
    rating: 4.8,
    reviews: 2156,
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    ],
    cuisine: ["Nikkei", "Peruano-Japonesa", "Fusión"],
    features: ["Top 5 Latinoamérica", "Cocina Nikkei", "Menú Nikkei Experience"],
    description: "La mejor fusión de la cocina peruana y japonesa, liderada por el chef Mitsuharu Tsumura.",
    longDescription: "Maido representa la perfecta fusión entre la tradición culinaria japonesa y los ingredientes peruanos. El chef Mitsuharu Tsumura crea una experiencia única donde el respeto por los productos del mar se une a técnicas ancestrales japonesas. Su menú Nikkei Experience es un viaje de más de 15 pasos que deleita todos los sentidos.",
    schedule: "Lunes a Sábado: 13:00 - 16:00 / 19:30 - 23:00",
    contact: {
      phone: "+51 1 3135100",
      email: "reservas@maido.pe",
      address: "Calle San Martín 399, Miraflores",
      website: "https://maido.pe"
    },
    signatureDishes: ["Nikkei Cebiche", "Tiradito Nikkei", "Sushi de temporada", "Dumplings de langosta"]
  },
  {
    id: "astrid-y-gaston",
    title: "Astrid y Gastón",
    location: "San Isidro, Lima",
    priceRange: "💰💰💰",
    rating: 4.7,
    reviews: 1892,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    ],
    cuisine: ["Peruana", "Tradicional", "Innovadora"],
    features: ["Restaurante histórico", "Casona republicana", "Cocina a la leña"],
    description: "Pioneros de la cocina peruana moderna, ubicados en una hermosa casona republicana.",
    longDescription: "Fundado por Gastón Acurio y Astrid Gutsche, este restaurante es un ícono de la gastronomía peruana. Ubicado en una impresionante casona de los años 40, combina arquitectura clásica con cocina innovadora. Su propuesta rescata recetas tradicionales peruanas con técnicas modernas, creando platos que honran la historia culinaria del país.",
    schedule: "Lunes a Domingo: 12:30 - 15:30 / 19:00 - 23:30",
    contact: {
      phone: "+51 1 4422777",
      email: "reservas@astridygaston.com",
      address: "Av. Paz Soldán 290, San Isidro",
      website: "https://astridygaston.com"
    },
    signatureDishes: ["Ají de gallina revisitado", "Lomo saltado tradicional", "Suspiro a la limeña", "Anticuchos de corazón"]
  },
  {
    id: "la-mar",
    title: "La Mar Cebichería",
    location: "Miraflores, Lima",
    priceRange: "💰💰",
    rating: 4.6,
    reviews: 3421,
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    ],
    cuisine: ["Marina", "Peruana", "Cebichería"],
    features: ["Mariscos frescos", "Ambiente relajado", "Terraza al aire libre"],
    description: "La cebichería más famosa de Lima, con el pescado más fresco del Pacífico.",
    longDescription: "La Mar es el templo del cebiche en Lima. Con un ambiente informal y vibrante, este restaurante de Gastón Acurio se especializa en pescados y mariscos frescos del día. Su barra de cebiche es un espectáculo en sí misma, donde puedes ver a los maestros cebicheros preparar las mejores combinaciones de pescado, limón, ají y camote.",
    schedule: "Lunes a Domingo: 12:00 - 18:00",
    contact: {
      phone: "+51 1 4213365",
      email: "info@lamarcebicheria.com",
      address: "Av. Mariscal La Mar 770, Miraflores",
      website: "https://lamarcebicheria.com"
    },
    signatureDishes: ["Cebiche mixto", "Causa limeña", "Jalea mixta", "Arroz con mariscos"]
  },
  {
    id: "isolina",
    title: "Isolina",
    location: "Barranco, Lima",
    priceRange: "💰💰",
    rating: 4.8,
    reviews: 2156,
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    ],
    cuisine: ["Peruana", "Tradicional", "Cocina de autor"],
    features: ["Porciones generosas", "Comida de mercado", "Ambiente bohemio"],
    description: "Comida peruana tradicional con porciones generosas en el corazón de Barranco.",
    longDescription: "Isolina rescata las recetas de la abuela Isolina, ofreciendo platos tradicionales peruanos en porciones enormes para compartir. El ambiente es cálido y bohemio, ubicado en una casona restaurada en Barranco. Cada plato cuenta una historia familiar y celebra los sabores de la cocina criolla peruana.",
    schedule: "Martes a Domingo: 12:00 - 23:00",
    contact: {
      phone: "+51 1 2475075",
      email: "reservas@isolina.pe",
      address: "Av. San Martín 101, Barranco",
      website: "https://isolina.pe"
    },
    signatureDishes: ["Anticuchos de corazón", "Papa a la huancaína", "Lomo saltado", "Picante de mariscos"]
  },
  {
    id: "miraflores-park",
    title: "Miraflores Park",
    location: "Miraflores, Lima",
    priceRange: "💰💰💰",
    rating: 4.5,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    ],
    cuisine: ["Internacional", "Peruana", "Alta cocina"],
    features: ["Vista al mar", "Hotel Belmond", "Comida gourmet"],
    description: "Restaurante con vista al mar en el exclusivo barrio de Miraflores.",
    longDescription: "Ubicado en el último piso del Hotel Belmond Miraflores Park, este restaurante ofrece una experiencia gastronómica con espectaculares vistas al Océano Pacífico. Su cocina combina lo mejor de la gastronomía peruana e internacional en un ambiente elegante y sofisticado.",
    schedule: "Lunes a Domingo: 06:30 - 10:30 / 12:30 - 15:30 / 19:00 - 23:00",
    contact: {
      phone: "+51 1 3158000",
      email: "restaurante@miraflorespark.com",
      address: "Av. Malecón de la Reserva 1035, Miraflores",
      website: "https://belmond.com"
    },
    signatureDishes: ["Cebiche de lenguado", "Lomo saltado premium", "Tiradito Nikkei", "Pulpo al olivo"]
  }
];