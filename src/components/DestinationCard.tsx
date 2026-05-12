import { MapPin, Star } from 'lucide-react';

interface DestinationCardProps {
  image: string;
  title: string;
  location: string;
  description: string;
  type: string;
  rating?: number;
}

export default function DestinationCard({ 
  image, title, location, description, type, rating = 4.8 
}: DestinationCardProps) {
  return (
    <div className="group bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-red-600/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="relative h-52">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          {rating}
        </div>
        <div className="absolute bottom-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-medium">
          {type}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <div className="flex items-center text-zinc-400 text-sm mb-3">
          <MapPin size={16} className="mr-1" />
          {location}
        </div>
        <p className="text-zinc-400 text-sm line-clamp-2">{description}</p>
      </div>
    </div>
  );
}