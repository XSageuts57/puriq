// src/components/BookingModal.tsx
import { useState } from 'react';
import { X, Calendar, Clock, Users, MapPin, User, AlertCircle, CheckCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'accommodation' | 'restaurant';
  itemTitle: string;
  itemLocation: string;
}

export default function BookingModal({ isOpen, onClose, type, itemTitle, itemLocation }: BookingModalProps) {
  const [formData, setFormData] = useState({
    // Datos comunes
    name: '',
    email: '',
    phone: '',
    dni: '',
    date: '',
    time: '',
    // Para alojamiento
    roomType: '',
    nights: 1,
    // Para restaurante
    peopleCount: 2,
    specialRequests: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Opciones de habitaciones para hoteles
  const roomTypes = [
    { id: 'standard', name: 'Habitación Estándar', price: 100 },
    { id: 'double', name: 'Habitación Doble', price: 150 },
    { id: 'suite', name: 'Suite', price: 250 },
    { id: 'family', name: 'Habitación Familiar', price: 200 },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim() || formData.name.length < 3) {
      newErrors.name = 'Nombre completo requerido';
    }
    if (!formData.email || !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Email válido requerido';
    }
    if (!formData.phone || formData.phone.length < 9) {
      newErrors.phone = 'Teléfono válido requerido';
    }
    if (!formData.dni || formData.dni.length < 8) {
      newErrors.dni = 'DNI válido requerido';
    }
    if (!formData.date) {
      newErrors.date = 'Selecciona una fecha';
    }
    if (!formData.time) {
      newErrors.time = 'Selecciona un horario';
    }
    if (type === 'accommodation' && !formData.roomType) {
      newErrors.roomType = 'Selecciona un tipo de habitación';
    }
    if (type === 'restaurant' && (!formData.peopleCount || formData.peopleCount < 1)) {
      newErrors.peopleCount = 'Número de personas válido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // Crear la reserva
      const bookingData = {
        id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: type,
        itemTitle: itemTitle,
        itemLocation: itemLocation,
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          dni: formData.dni,
        },
        bookingDetails: type === 'accommodation' ? {
          roomType: formData.roomType,
          nights: formData.nights,
          date: formData.date,
          time: formData.time,
        } : {
          peopleCount: formData.peopleCount,
          date: formData.date,
          time: formData.time,
          specialRequests: formData.specialRequests,
        },
        createdAt: new Date().toISOString(),
        status: 'pending',
      };
      
      // Guardar en localStorage
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      bookings.push(bookingData);
      localStorage.setItem('bookings', JSON.stringify(bookings));
      
      // Enviar notificación al administrador (simulado)
      console.log('Nueva reserva:', bookingData);
      
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        // Resetear formulario
        setFormData({
          name: '',
          email: '',
          phone: '',
          dni: '',
          date: '',
          time: '',
          roomType: '',
          nights: 1,
          peopleCount: 2,
          specialRequests: '',
        });
      }, 2000);
} catch {
  setErrorMessage('Error al procesar la reserva. Intenta de nuevo.');
} finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  // Obtener horarios disponibles (ejemplo)
  const availableTimes = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">
                {type === 'accommodation' ? 'Reservar alojamiento' : 'Reservar mesa'}
              </h2>
              <p className="text-zinc-400 text-sm mt-1">{itemTitle}</p>
              <p className="text-zinc-500 text-xs mt-1 flex items-center gap-1">
                <MapPin size={12} /> {itemLocation}
              </p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all">
              <X size={24} />
            </button>
          </div>
        </div>

        {success ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">¡Reserva confirmada!</h3>
            <p className="text-zinc-400">
              Hemos enviado los detalles de tu reserva a tu correo electrónico.
              {type === 'accommodation' ? '¡Esperamos tu llegada!' : '¡Te esperamos!'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            {errorMessage && (
              <div className="bg-red-600/20 border border-red-600/30 rounded-xl p-4 flex items-center gap-3">
                <AlertCircle className="text-red-400" />
                <span className="text-red-400 text-sm">{errorMessage}</span>
              </div>
            )}

            {/* Datos personales */}
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User size={18} /> Datos personales
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Nombre completo *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full bg-zinc-800/50 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all`}
                    placeholder="Juan Pérez"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">DNI *</label>
                  <input
                    type="text"
                    value={formData.dni}
                    onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                    className={`w-full bg-zinc-800/50 border ${errors.dni ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all`}
                    placeholder="12345678"
                  />
                  {errors.dni && <p className="text-red-400 text-xs mt-1">{errors.dni}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Correo electrónico *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full bg-zinc-800/50 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all`}
                    placeholder="contacto@ejemplo.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Teléfono *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full bg-zinc-800/50 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all`}
                    placeholder="+51 987654321"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Fecha y hora */}
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar size={18} /> Fecha y hora
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Fecha *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full bg-zinc-800/50 border ${errors.date ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all`}
                  />
                  {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Hora *</label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className={`w-full bg-zinc-800/50 border ${errors.time ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all`}
                  >
                    <option value="">Seleccionar hora</option>
                    {availableTimes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time}</p>}
                </div>
              </div>
            </div>

            {/* Campos específicos para alojamiento */}
            {type === 'accommodation' && (
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Clock size={18} /> Detalles de la estadía
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Tipo de habitación *</label>
                    <select
                      value={formData.roomType}
                      onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                      className={`w-full bg-zinc-800/50 border ${errors.roomType ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all`}
                    >
                      <option value="">Seleccionar habitación</option>
                      {roomTypes.map(room => (
                        <option key={room.id} value={room.name}>
                          {room.name} - ${room.price}/noche
                        </option>
                      ))}
                    </select>
                    {errors.roomType && <p className="text-red-400 text-xs mt-1">{errors.roomType}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Número de noches</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={formData.nights}
                      onChange={(e) => setFormData({ ...formData, nights: parseInt(e.target.value) })}
                      className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Campos específicos para restaurante */}
            {type === 'restaurant' && (
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Users size={18} /> Detalles de la reserva
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Número de personas *</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={formData.peopleCount}
                    onChange={(e) => setFormData({ ...formData, peopleCount: parseInt(e.target.value) })}
                    className={`w-full bg-zinc-800/50 border ${errors.peopleCount ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all`}
                  />
                  {errors.peopleCount && <p className="text-red-400 text-xs mt-1">{errors.peopleCount}</p>}
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Peticiones especiales (opcional)</label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    rows={3}
                    className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-all resize-none"
                    placeholder="Alergias, preferencias, ocasión especial..."
                  />
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-white/10 border border-white/20 py-3 rounded-xl font-medium hover:bg-white/20 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Procesando...' : 'Confirmar reserva'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}