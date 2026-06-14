import { useState } from 'react';
import { Star, User, Calendar, ThumbsUp} from 'lucide-react';

interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  userImage?: string;
}

interface ReviewsProps {
  itemId: string;
  itemType: 'destination' | 'accommodation' | 'restaurant' | 'tour';
}

export default function Reviews({ itemId, itemType }: ReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem(`reviews_${itemType}_${itemId}`);
    if (saved) return JSON.parse(saved);
    
    // Reseñas de ejemplo
    const sampleReviews: Review[] = [
      {
        id: '1',
        userName: 'María González',
        rating: 5,
        date: '2024-05-15',
        comment: '¡Una experiencia increíble! Superó todas mis expectativas. Definitivamente volvería.',
        helpful: 24,
      },
      {
        id: '2',
        userName: 'Carlos Rodríguez',
        rating: 4,
        date: '2024-05-10',
        comment: 'Muy buena experiencia, aunque el servicio podría mejorar un poco. Lo recomiendo.',
        helpful: 12,
      },
      {
        id: '3',
        userName: 'Ana Martínez',
        rating: 5,
        date: '2024-05-05',
        comment: 'Excelente lugar, atención de primera. El personal es muy amable.',
        helpful: 18,
      },
    ];
    return sampleReviews;
  });

  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    userName: '',
    rating: 5,
    comment: '',
  });
  const [userNameError, setUserNameError] = useState('');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones
    if (newReview.userName.trim().length < 3) {
      setUserNameError('El nombre debe tener al menos 3 caracteres');
      return;
    }
    if (newReview.comment.trim().length < 10) {
      alert('La reseña debe tener al menos 10 caracteres');
      return;
    }
    
    const review: Review = {
      id: Date.now().toString(),
      userName: newReview.userName.trim(),
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      comment: newReview.comment.trim(),
      helpful: 0,
    };
    
    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${itemType}_${itemId}`, JSON.stringify(updatedReviews));
    
    setNewReview({ userName: '', rating: 5, comment: '' });
    setShowForm(false);
    setUserNameError('');
  };

  const handleHelpful = (reviewId: string) => {
    const updatedReviews = reviews.map(review =>
      review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review
    );
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${itemType}_${itemId}`, JSON.stringify(updatedReviews));
  };

  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => Math.floor(r.rating) === star).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { star, count, percentage };
  });

  return (
    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 md:p-8">
      
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Star className="text-yellow-400 fill-yellow-400" size={24} />
            Opiniones de viajeros
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Basado en {reviews.length} reseñas
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 px-5 py-2.5 rounded-xl font-medium text-sm transition-all"
        >
          {showForm ? 'Cancelar' : '✍️ Escribir reseña'}
        </button>
      </div>

      {/* Resumen de calificaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-white/10">
        {/* Calificación promedio */}
        <div className="text-center md:text-left">
          <div className="text-6xl font-bold text-yellow-400">{averageRating.toFixed(1)}</div>
          <div className="flex justify-center md:justify-start gap-1 my-2">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                size={20}
                className={star <= Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-600'}
              />
            ))}
          </div>
          <p className="text-zinc-400 text-sm">Promedio de {reviews.length} reseñas</p>
        </div>

        {/* Distribución */}
        <div className="space-y-2">
          {ratingDistribution.map(({ star, percentage }) => (
            <div key={star} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm">{star}</span>
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
              </div>
              <div className="flex-1 h-2 bg-zinc-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-xs text-zinc-400 w-12">{percentage.toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Formulario para nueva reseña */}
      {showForm && (
        <div className="bg-zinc-800/50 rounded-xl p-6 mb-8 border border-white/10">
          <h3 className="text-lg font-bold mb-4">Comparte tu experiencia</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tu nombre</label>
              <input
                type="text"
                value={newReview.userName}
                onChange={(e) => {
                  setNewReview({ ...newReview, userName: e.target.value });
                  setUserNameError('');
                }}
                placeholder="Ej: Juan Pérez"
                className={`w-full bg-zinc-900 border ${userNameError ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-all`}
              />
              {userNameError && (
                <p className="text-red-400 text-xs mt-1">{userNameError}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Calificación</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      size={32}
                      className={star <= newReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-600'}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Tu reseña</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Cuéntanos sobre tu experiencia..."
                rows={4}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-all resize-none"
              />
              <p className="text-zinc-500 text-xs mt-1">Mínimo 10 caracteres</p>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 py-3 rounded-xl font-semibold transition-all"
            >
              Publicar reseña
            </button>
          </form>
        </div>
      )}

      {/* Lista de reseñas */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-white/10 pb-6 last:border-0">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center">
                  <User size={18} />
                </div>
                <div>
                  <p className="font-semibold">{review.userName}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          size={14}
                          className={star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-600'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(review.date).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-zinc-300 mt-3 leading-relaxed">{review.comment}</p>
            
            <button
              onClick={() => handleHelpful(review.id)}
              className="flex items-center gap-2 text-xs text-zinc-500 hover:text-red-400 transition-colors mt-3"
            >
              <ThumbsUp size={14} />
              Útil ({review.helpful})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}