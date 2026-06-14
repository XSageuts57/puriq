import { useState, useRef } from 'react';
import { X, CheckCircle, AlertCircle, Plus, Trash2, Upload, Image, Loader2, Send } from 'lucide-react';
import { auth } from '../firebase';
import { uploadToCloudinary, uploadMultipleToCloudinary } from '../utils/cloudinary';

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'accommodation' | 'restaurant' | 'tour';
  onSuccess: () => void;
}

export default function AddContentModal({ isOpen, onClose, type, onSuccess }: AddContentModalProps) {
  const [selectedSection, setSelectedSection] = useState<'accommodation' | 'restaurant' | 'tour'>(type);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [formData, setFormData] = useState({
    // Información básica
    title: '',
    location: '',
    address: '',
    district: '',
    province: '',
    description: '',
    longDescription: '',
    price: '',
    imageUrl: '',
    imageFile: null as File | null,
    galleryUrls: [] as string[],
    galleryFiles: [] as File[],
    
    // Contacto del dueño
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    ownerDni: '',
    
    // Campos específicos para alojamientos
    accommodationType: 'hotel',
    amenities: [] as string[],
    schedule: '',
    rooms: '',
    paymentMethod: '',
    
    // Campos específicos para restaurantes
    cuisine: [] as string[],
    priceRange: '💰💰',
    restaurantSchedule: '',
    maxPeople: '',
    
    // Campos específicos para tours
    duration: '',
    difficulty: 'Fácil',
    groupSize: '',
    departureTime: '',
    bestSeason: '',
    languages: [] as string[],
    
    // Qué incluye / No incluye
    includes: [] as string[],
    notIncludes: [] as string[],
  });
  
  // Estados para listas dinámicas
  const [newAmenity, setNewAmenity] = useState('');
  const [newCuisine, setNewCuisine] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newInclude, setNewInclude] = useState('');
  const [newNotInclude, setNewNotInclude] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validaciones básicas
    if (!formData.title.trim() || formData.title.length < 3) {
      newErrors.title = 'El título debe tener al menos 3 caracteres';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }
    if (!formData.district.trim()) {
      newErrors.district = 'El distrito es requerido';
    }
    if (!formData.province.trim()) {
      newErrors.province = 'La provincia es requerida';
    }
    if (!formData.description.trim() || formData.description.length < 20) {
      newErrors.description = 'La descripción debe tener al menos 20 caracteres';
    }
    if (!formData.longDescription.trim() || formData.longDescription.length < 50) {
      newErrors.longDescription = 'La descripción larga debe tener al menos 50 caracteres';
    }
    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }
    if (!formData.imageUrl && !formData.imageFile) {
      newErrors.imageUrl = 'Debes seleccionar una imagen principal';
    }
    
    // Validaciones del dueño
    if (!formData.ownerName.trim() || formData.ownerName.length < 3) {
      newErrors.ownerName = 'Ingresa tu nombre completo';
    }
    if (!formData.ownerEmail || !formData.ownerEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.ownerEmail = 'Ingresa un email válido';
    }
    if (!formData.ownerPhone || formData.ownerPhone.length < 9) {
      newErrors.ownerPhone = 'Ingresa un teléfono válido';
    }
    if (!formData.ownerDni || formData.ownerDni.length < 8) {
      newErrors.ownerDni = 'Ingresa un DNI válido (8 dígitos)';
    }
    
    // Validaciones específicas
    if (selectedSection === 'accommodation') {
      if (!formData.schedule) newErrors.schedule = 'El horario es requerido';
      if (!formData.rooms) newErrors.rooms = 'El número de cuartos es requerido';
      if (!formData.paymentMethod) newErrors.paymentMethod = 'El método de pago es requerido';
    }
    
    if (selectedSection === 'restaurant') {
      if (!formData.restaurantSchedule) newErrors.restaurantSchedule = 'El horario es requerido';
      if (!formData.maxPeople) newErrors.maxPeople = 'El número de personas es requerido';
    }
    
    if (selectedSection === 'tour' && !formData.duration) {
      newErrors.duration = 'La duración es requerida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('La imagen no puede superar los 10MB');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    
    const previewUrl = URL.createObjectURL(file);
    setFormData({ ...formData, imageUrl: previewUrl, imageFile: file });
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (formData.galleryFiles.length + files.length > 8) {
      setErrorMessage('Máximo 8 imágenes en la galería');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    
    const newPreviews: string[] = [];
    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage(`La imagen ${file.name} supera los 10MB`);
        continue;
      }
      const previewUrl = URL.createObjectURL(file);
      newPreviews.push(previewUrl);
    }
    
    setFormData({
      ...formData,
      galleryUrls: [...formData.galleryUrls, ...newPreviews],
      galleryFiles: [...formData.galleryFiles, ...files]
    });
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      galleryUrls: formData.galleryUrls.filter((_, i) => i !== index),
      galleryFiles: formData.galleryFiles.filter((_, i) => i !== index)
    });
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim()) {
      setFormData({ ...formData, amenities: [...formData.amenities, newAmenity.trim()] });
      setNewAmenity('');
    }
  };

  const handleRemoveAmenity = (index: number) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.filter((_, i) => i !== index)
    });
  };

  const handleAddCuisine = () => {
    if (newCuisine.trim()) {
      setFormData({ ...formData, cuisine: [...formData.cuisine, newCuisine.trim()] });
      setNewCuisine('');
    }
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      setFormData({ ...formData, languages: [...formData.languages, newLanguage.trim()] });
      setNewLanguage('');
    }
  };

  const handleAddInclude = () => {
    if (newInclude.trim()) {
      setFormData({ ...formData, includes: [...formData.includes, newInclude.trim()] });
      setNewInclude('');
    }
  };

  const handleRemoveInclude = (index: number) => {
    setFormData({
      ...formData,
      includes: formData.includes.filter((_, i) => i !== index)
    });
  };

  const handleAddNotInclude = () => {
    if (newNotInclude.trim()) {
      setFormData({ ...formData, notIncludes: [...formData.notIncludes, newNotInclude.trim()] });
      setNewNotInclude('');
    }
  };

  const handleRemoveNotInclude = (index: number) => {
    setFormData({
      ...formData,
      notIncludes: formData.notIncludes.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    if (!validateForm()) {
      setErrorMessage('Por favor, completa todos los campos obligatorios');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    
    if (!auth.currentUser) {
      setErrorMessage('Debes iniciar sesión para agregar contenido');
      return;
    }
    
    setIsSubmitting(true);
    setIsUploading(true);
    
    try {
      let mainImageUrl = formData.imageUrl;
      if (formData.imageFile) {
        setUploadProgress(10);
        mainImageUrl = await uploadToCloudinary(formData.imageFile);
        setUploadProgress(30);
      }
      
      let galleryUrls: string[] = [];
      if (formData.galleryFiles.length > 0) {
        galleryUrls = await uploadMultipleToCloudinary(formData.galleryFiles);
        setUploadProgress(60);
      }
      
      setUploadProgress(80);
      
      // Crear la solicitud de verificación
      const verificationRequest = {
        id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: selectedSection,
        title: formData.title,
        status: 'pending',
        submittedAt: new Date().toISOString(),
        submittedBy: {
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
          name: formData.ownerName,
          phone: formData.ownerPhone,
          dni: formData.ownerDni
        },
        content: {
          ...formData,
          image: mainImageUrl,
          gallery: galleryUrls,
        }
      };
      
      // Guardar en solicitudes pendientes
      const pendingRequests = JSON.parse(localStorage.getItem('pending_verifications') || '[]');
      pendingRequests.push(verificationRequest);
      localStorage.setItem('pending_verifications', JSON.stringify(pendingRequests));
      
      // Simular envío al correo (en producción usar EmailJS)
      console.log('Solicitud enviada al administrador:', verificationRequest);
      
      setUploadProgress(100);
      setSuccessMessage('✅ ¡Solicitud enviada! Tu emprendimiento está siendo validado. Estaremos atentos a tu correo electrónico.');
      
      setTimeout(() => {
        onSuccess();
        onClose();
        setSuccessMessage('');
        setUploadProgress(0);
        // Resetear formulario
        setFormData({
          title: '',
          location: '',
          address: '',
          district: '',
          province: '',
          description: '',
          longDescription: '',
          price: '',
          imageUrl: '',
          imageFile: null,
          galleryUrls: [],
          galleryFiles: [],
          ownerName: '',
          ownerEmail: '',
          ownerPhone: '',
          ownerDni: '',
          accommodationType: 'hotel',
          amenities: [],
          schedule: '',
          rooms: '',
          paymentMethod: '',
          cuisine: [],
          priceRange: '💰💰',
          restaurantSchedule: '',
          maxPeople: '',
          duration: '',
          difficulty: 'Fácil',
          groupSize: '',
          departureTime: '',
          bestSeason: '',
          languages: [],
          includes: [],
          notIncludes: [],
        });
      }, 2000);
    } catch (err) {
      console.error('Error detallado:', err);
      setErrorMessage(`Error al enviar: ${err instanceof Error ? err.message : 'Intenta de nuevo'}`);
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold">Registrar emprendimiento</h2>
              <p className="text-zinc-400 text-sm mt-1">Completa tus datos para validar tu negocio</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all">
              <X size={24} />
            </button>
          </div>
          
          <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-xl p-3 mb-4">
            <p className="text-yellow-400 text-sm flex items-center gap-2">
              <AlertCircle size={16} />
              Tu solicitud será revisada por nuestro equipo. Recibirás un correo de confirmación.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setSelectedSection('accommodation')}
              className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                selectedSection === 'accommodation'
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-600/30'
                  : 'bg-white/10 text-zinc-300 hover:bg-white/20'
              }`}
            >
              🛏️ Alojamiento
            </button>
            <button
              type="button"
              onClick={() => setSelectedSection('restaurant')}
              className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                selectedSection === 'restaurant'
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-600/30'
                  : 'bg-white/10 text-zinc-300 hover:bg-white/20'
              }`}
            >
              🍽️ Restaurante
            </button>
            <button
              type="button"
              onClick={() => setSelectedSection('tour')}
              className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                selectedSection === 'tour'
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-600/30'
                  : 'bg-white/10 text-zinc-300 hover:bg-white/20'
              }`}
            >
              🏔️ Tour
            </button>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {isUploading && (
            <div className="mb-4">
              <div className="flex justify-between text-sm text-zinc-400 mb-1">
                <span>Subiendo imágenes...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-zinc-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-600/20 border border-red-600/30 rounded-xl p-4 flex items-center gap-3">
              <AlertCircle className="text-red-400" />
              <span className="text-red-400 text-sm">{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-600/20 border border-green-600/30 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle className="text-green-400" />
              <span className="text-green-400 text-sm">{successMessage}</span>
            </div>
          )}

          {/* DATOS DEL NEGOCIO */}
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-semibold mb-4">🏢 Datos del negocio</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Nombre del negocio *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`w-full bg-zinc-800/50 border ${errors.title ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all`}
                placeholder="Ej: Hotel Ejemplo / Restaurante Ejemplo"
              />
              {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-2">Dirección *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full bg-zinc-800/50 border ${errors.address ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all`}
                  placeholder="Av. Ejemplo 123"
                />
                {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Distrito *</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className={`w-full bg-zinc-800/50 border ${errors.district ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all`}
                  placeholder="Miraflores"
                />
                {errors.district && <p className="text-red-400 text-xs mt-1">{errors.district}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Provincia *</label>
                <input
                  type="text"
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className={`w-full bg-zinc-800/50 border ${errors.province ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all`}
                  placeholder="Lima"
                />
                {errors.province && <p className="text-red-400 text-xs mt-1">{errors.province}</p>}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Descripción corta *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                className={`w-full bg-zinc-800/50 border ${errors.description ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all resize-none`}
                placeholder="Breve descripción (20-100 caracteres)"
              />
              {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Descripción detallada *</label>
              <textarea
                value={formData.longDescription}
                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                rows={4}
                className={`w-full bg-zinc-800/50 border ${errors.longDescription ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all resize-none`}
                placeholder="Descripción detallada (mínimo 50 caracteres)"
              />
              {errors.longDescription && <p className="text-red-400 text-xs mt-1">{errors.longDescription}</p>}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Precio *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className={`w-full bg-zinc-800/50 border ${errors.price ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all`}
                placeholder="Ej: 100"
                min="1"
                step="1"
              />
              {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price}</p>}
            </div>
          </div>

          {/* DATOS DEL DUEÑO */}
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-semibold mb-4">👤 Datos del dueño / responsable</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre completo *</label>
                <input
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  className={`w-full bg-zinc-800/50 border ${errors.ownerName ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all`}
                  placeholder="Juan Pérez"
                />
                {errors.ownerName && <p className="text-red-400 text-xs mt-1">{errors.ownerName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">DNI *</label>
                <input
                  type="text"
                  value={formData.ownerDni}
                  onChange={(e) => setFormData({ ...formData, ownerDni: e.target.value })}
                  className={`w-full bg-zinc-800/50 border ${errors.ownerDni ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all`}
                  placeholder="12345678"
                />
                {errors.ownerDni && <p className="text-red-400 text-xs mt-1">{errors.ownerDni}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Correo electrónico *</label>
                <input
                  type="email"
                  value={formData.ownerEmail}
                  onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                  className={`w-full bg-zinc-800/50 border ${errors.ownerEmail ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all`}
                  placeholder="contacto@ejemplo.com"
                />
                {errors.ownerEmail && <p className="text-red-400 text-xs mt-1">{errors.ownerEmail}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Teléfono / WhatsApp *</label>
                <input
                  type="tel"
                  value={formData.ownerPhone}
                  onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                  className={`w-full bg-zinc-800/50 border ${errors.ownerPhone ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all`}
                  placeholder="+51 987654321"
                />
                {errors.ownerPhone && <p className="text-red-400 text-xs mt-1">{errors.ownerPhone}</p>}
              </div>
            </div>
          </div>

          {/* IMÁGENES */}
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-semibold mb-4">🖼️ Imágenes del negocio</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Imagen principal *</label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => mainImageInputRef.current?.click()}
                  className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl flex items-center gap-2 transition-all"
                  disabled={isUploading}
                >
                  <Upload size={18} />
                  Subir imagen
                </button>
                <input
                  ref={mainImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageUpload}
                  className="hidden"
                />
                {formData.imageUrl && (
                  <span className="text-green-400 text-sm">✓ Imagen seleccionada</span>
                )}
              </div>
              {errors.imageUrl && <p className="text-red-400 text-xs mt-1">{errors.imageUrl}</p>}
              {formData.imageUrl && (
                <div className="mt-3">
                  <img src={formData.imageUrl} alt="Preview" className="h-40 w-full object-cover rounded-lg" />
                </div>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Galería de imágenes (opcional, máx 8)</label>
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="bg-zinc-800 hover:bg-zinc-700 border border-white/10 px-6 py-3 rounded-xl flex items-center gap-2 transition-all"
                disabled={isUploading}
              >
                <Image size={18} />
                Subir múltiples imágenes
              </button>
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryUpload}
                className="hidden"
              />
              <div className="grid grid-cols-4 gap-2 mt-3">
                {formData.galleryUrls.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img src={img} alt={`Galería ${idx + 1}`} className="h-20 w-full object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 bg-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all"
                      disabled={isUploading}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CAMPOS ESPECÍFICOS - ALOJAMIENTO */}
          {selectedSection === 'accommodation' && (
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-lg font-semibold mb-4">🏨 Datos del alojamiento</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tipo de alojamiento</label>
                  <select
                    value={formData.accommodationType}
                    onChange={(e) => setFormData({ ...formData, accommodationType: e.target.value })}
                    className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all"
                  >
                    <option value="hotel">Hotel</option>
                    <option value="resort">Resort</option>
                    <option value="eco-lodge">Eco Lodge</option>
                    <option value="casa">Casa/Hostal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Horario de atención *</label>
                  <input
                    type="text"
                    value={formData.schedule}
                    onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                    className={`w-full bg-zinc-800/50 border ${errors.schedule ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all`}
                    placeholder="Ej: 24/7 o 08:00 - 20:00"
                  />
                  {errors.schedule && <p className="text-red-400 text-xs mt-1">{errors.schedule}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Número de cuartos *</label>
                  <input
                    type="text"
                    value={formData.rooms}
                    onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                    className={`w-full bg-zinc-800/50 border ${errors.rooms ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all`}
                    placeholder="Ej: 15 habitaciones"
                  />
                  {errors.rooms && <p className="text-red-400 text-xs mt-1">{errors.rooms}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Método de pago *</label>
                  <input
                    type="text"
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className={`w-full bg-zinc-800/50 border ${errors.paymentMethod ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all`}
                    placeholder="Ej: Efectivo, Tarjeta, Transferencia"
                  />
                  {errors.paymentMethod && <p className="text-red-400 text-xs mt-1">{errors.paymentMethod}</p>}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Amenidades</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                    className="flex-1 bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-all"
                    placeholder="Ej: WiFi gratis, Piscina, Spa"
                  />
                  <button
                    type="button"
                    onClick={handleAddAmenity}
                    className="bg-red-600 px-4 rounded-xl hover:bg-red-700 transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.amenities.map((item, idx) => (
                    <span key={idx} className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {item}
                      <button type="button" onClick={() => handleRemoveAmenity(idx)} className="hover:text-red-300">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CAMPOS ESPECÍFICOS - RESTAURANTE */}
          {selectedSection === 'restaurant' && (
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-lg font-semibold mb-4">🍽️ Datos del restaurante</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Rango de precio</label>
                  <select
                    value={formData.priceRange}
                    onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                    className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all"
                  >
                    <option value="💰">Económico (💰)</option>
                    <option value="💰💰">Moderado (💰💰)</option>
                    <option value="💰💰💰">Caro (💰💰💰)</option>
                    <option value="💰💰💰💰">Muy caro (💰💰💰💰)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Horario de atención *</label>
                  <input
                    type="text"
                    value={formData.restaurantSchedule}
                    onChange={(e) => setFormData({ ...formData, restaurantSchedule: e.target.value })}
                    className={`w-full bg-zinc-800/50 border ${errors.restaurantSchedule ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all`}
                    placeholder="Ej: Lunes a Domingo: 12:00 - 23:00"
                  />
                  {errors.restaurantSchedule && <p className="text-red-400 text-xs mt-1">{errors.restaurantSchedule}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Capacidad (personas) *</label>
                  <input
                    type="text"
                    value={formData.maxPeople}
                    onChange={(e) => setFormData({ ...formData, maxPeople: e.target.value })}
                    className={`w-full bg-zinc-800/50 border ${errors.maxPeople ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all`}
                    placeholder="Ej: 50 personas"
                  />
                  {errors.maxPeople && <p className="text-red-400 text-xs mt-1">{errors.maxPeople}</p>}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Tipo de cocina</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newCuisine}
                    onChange={(e) => setNewCuisine(e.target.value)}
                    className="flex-1 bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-all"
                    placeholder="Ej: Peruana, Nikkei, Marina"
                  />
                  <button
                    type="button"
                    onClick={handleAddCuisine}
                    className="bg-red-600 px-4 rounded-xl hover:bg-red-700 transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.cuisine.map((item, idx) => (
                    <span key={idx} className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {item}
                      <button type="button" onClick={() => setFormData({ ...formData, cuisine: formData.cuisine.filter((_, i) => i !== idx) })} className="hover:text-red-300">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CAMPOS ESPECÍFICOS - TOUR */}
          {selectedSection === 'tour' && (
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-lg font-semibold mb-4">🏔️ Datos del tour</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Duración *</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className={`w-full bg-zinc-800/50 border ${errors.duration ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all`}
                    placeholder="Ej: 4 días / 3 noches"
                  />
                  {errors.duration && <p className="text-red-400 text-xs mt-1">{errors.duration}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Dificultad</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all"
                  >
                    <option value="Fácil">Fácil</option>
                    <option value="Moderado">Moderado</option>
                    <option value="Difícil">Difícil</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tamaño del grupo</label>
                  <input
                    type="text"
                    value={formData.groupSize}
                    onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                    className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-all"
                    placeholder="Ej: Máximo 15 personas"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Horario de salida</label>
                  <input
                    type="text"
                    value={formData.departureTime}
                    onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                    className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-all"
                    placeholder="Ej: 08:00 AM"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Idiomas disponibles</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    className="flex-1 bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-all"
                    placeholder="Ej: Español, Inglés"
                  />
                  <button
                    type="button"
                    onClick={handleAddLanguage}
                    className="bg-red-600 px-4 rounded-xl hover:bg-red-700 transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.languages.map((item, idx) => (
                    <span key={idx} className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {item}
                      <button type="button" onClick={() => setFormData({ ...formData, languages: formData.languages.filter((_, i) => i !== idx) })} className="hover:text-red-300">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* QUÉ INCLUYE / NO INCLUYE */}
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-semibold mb-4">📋 Servicios</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">✅ ¿Qué incluye? (opcional)</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newInclude}
                  onChange={(e) => setNewInclude(e.target.value)}
                  className="flex-1 bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-all"
                  placeholder="Ej: Transporte, Desayuno, Guía"
                />
                <button
                  type="button"
                  onClick={handleAddInclude}
                  className="bg-red-600 px-4 rounded-xl hover:bg-red-700 transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.includes.map((item, idx) => (
                  <span key={idx} className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {item}
                    <button type="button" onClick={() => handleRemoveInclude(idx)} className="hover:text-green-300">
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">❌ No incluye (opcional)</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newNotInclude}
                  onChange={(e) => setNewNotInclude(e.target.value)}
                  className="flex-1 bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-all"
                  placeholder="Ej: Propinas, Seguro de viaje"
                />
                <button
                  type="button"
                  onClick={handleAddNotInclude}
                  className="bg-red-600 px-4 rounded-xl hover:bg-red-700 transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.notIncludes.map((item, idx) => (
                  <span key={idx} className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {item}
                    <button type="button" onClick={() => handleRemoveNotInclude(idx)} className="hover:text-red-300">
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/10 border border-white/20 py-3 rounded-xl font-medium hover:bg-white/20 transition-all"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Enviando solicitud...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Enviar para validación
                </>
              )}
            </button>
          </div>
          
          <p className="text-center text-xs text-zinc-500 pt-2">
            Al enviar, aceptas que tu información sea verificada por nuestro equipo.
            Recibirás una respuesta a tu correo electrónico.
          </p>
        </form>
      </div>
    </div>
  );
}