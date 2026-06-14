/* eslint-disable react-hooks/set-state-in-effect */
// src/components/UserContentManager.tsx
import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { Edit2, Trash2, X, Check, Plus } from 'lucide-react';

interface UserItem {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  description: string;
  longDescription?: string;
  rating?: number;
  reviews?: number;
  type?: string;
  amenities?: string[];
  includes?: string[];
  notIncludes?: string[];
  cuisine?: string[];
  duration?: string;
  difficulty?: string;
  userId?: string;
  isUserAdded?: boolean;
  contact?: {
    phone: string;
    email: string;
    website?: string;
  };
  [key: string]: unknown;
}

interface UserContentManagerProps {
  type: 'accommodation' | 'restaurant' | 'tour';
  onUpdate: () => void;
}

export default function UserContentManager({ type, onUpdate }: UserContentManagerProps) {
  const [userItems, setUserItems] = useState<UserItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<UserItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [newInclude, setNewInclude] = useState('');
  const [newNotInclude, setNewNotInclude] = useState('');

  const currentUser = auth.currentUser;

  // Cargar items al montar y cuando cambie type o currentUser
  useEffect(() => {
    const storageKey = `user_${type}s`;
    const items: UserItem[] = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const userSpecificItems = items.filter((item) => item.userId === currentUser?.uid);
    setUserItems(userSpecificItems);
    setLoading(false);
  }, [type, currentUser?.uid]);

  const refreshItems = () => {
    const storageKey = `user_${type}s`;
    const items: UserItem[] = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const userSpecificItems = items.filter((item) => item.userId === currentUser?.uid);
    setUserItems(userSpecificItems);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este elemento? Esta acción no se puede deshacer.')) {
      const storageKey = `user_${type}s`;
      const items: UserItem[] = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const filtered = items.filter((item) => item.id !== id);
      localStorage.setItem(storageKey, JSON.stringify(filtered));
      refreshItems();
      onUpdate();
    }
  };

  const handleEdit = (item: UserItem) => {
    setEditingId(item.id);
    setEditForm({ 
      ...item,
      includes: item.includes || [],
      notIncludes: item.notIncludes || [],
      contact: item.contact || { phone: '', email: '', website: '' }
    });
  };

  const handleAddInclude = () => {
    if (newInclude.trim() && editForm) {
      setEditForm({
        ...editForm,
        includes: [...(editForm.includes || []), newInclude.trim()]
      });
      setNewInclude('');
    }
  };

  const handleRemoveInclude = (index: number) => {
    if (editForm) {
      setEditForm({
        ...editForm,
        includes: (editForm.includes || []).filter((_, i) => i !== index)
      });
    }
  };

  const handleAddNotInclude = () => {
    if (newNotInclude.trim() && editForm) {
      setEditForm({
        ...editForm,
        notIncludes: [...(editForm.notIncludes || []), newNotInclude.trim()]
      });
      setNewNotInclude('');
    }
  };

  const handleRemoveNotInclude = (index: number) => {
    if (editForm) {
      setEditForm({
        ...editForm,
        notIncludes: (editForm.notIncludes || []).filter((_, i) => i !== index)
      });
    }
  };

  const handleSaveEdit = () => {
    if (!editForm) return;
    
    const storageKey = `user_${type}s`;
    const items: UserItem[] = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const updatedItems = items.map((item) => 
      item.id === editingId ? { ...editForm, updatedAt: new Date().toISOString() } : item
    );
    localStorage.setItem(storageKey, JSON.stringify(updatedItems));
    setEditingId(null);
    setEditForm(null);
    refreshItems();
    onUpdate();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
    setNewInclude('');
    setNewNotInclude('');
  };

  if (loading) {
    return (
      <div className="text-center py-8 text-zinc-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
        <p className="mt-2">Cargando...</p>
      </div>
    );
  }

  if (userItems.length === 0) {
    return (
      <div className="text-center py-12 bg-zinc-900/30 rounded-2xl border border-white/10">
        <p className="text-zinc-400">No has agregado ningún {type === 'accommodation' ? 'alojamiento' : type === 'restaurant' ? 'restaurante' : 'tour'} aún.</p>
        <p className="text-zinc-500 text-sm mt-2">Usa el botón + para agregar tu primer contenido.</p>
      </div>
    );
  }

  const getTypeLabel = () => {
    if (type === 'accommodation') return 'Alojamiento';
    if (type === 'restaurant') return 'Restaurante';
    return 'Tour';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4">Mis {getTypeLabel()}s agregados</h3>
      
      {userItems.map((item) => (
        <div key={item.id} className="bg-zinc-900/50 border border-white/10 rounded-2xl p-4">
          {editingId === item.id && editForm ? (
            // Formulario de edición completo
            <div className="space-y-3">
              <input
                type="text"
                value={editForm.title || ''}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-2 text-white"
                placeholder="Título"
              />
              <input
                type="text"
                value={editForm.location || ''}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-2 text-white"
                placeholder="Ubicación"
              />
              <textarea
                value={editForm.description || ''}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows={2}
                className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-2 text-white resize-none"
                placeholder="Descripción corta"
              />
              <textarea
                value={editForm.longDescription || ''}
                onChange={(e) => setEditForm({ ...editForm, longDescription: e.target.value })}
                rows={3}
                className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-2 text-white resize-none"
                placeholder="Descripción detallada"
              />
              <input
                type="number"
                value={editForm.price || 0}
                onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-2 text-white"
                placeholder="Precio"
              />
              
              {/* Amenidades (solo para alojamientos) */}
              {type === 'accommodation' && (
                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">Amenidades</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {(editForm.amenities || []).map((amenity, idx) => (
                      <span key={idx} className="bg-red-600/20 text-red-400 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        {amenity}
                        <button type="button" onClick={() => {
                          const newAmenities = (editForm.amenities || []).filter((_, i) => i !== idx);
                          setEditForm({ ...editForm, amenities: newAmenities });
                        }} className="hover:text-red-300">
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ¿Qué incluye? */}
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">✅ ¿Qué incluye?</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newInclude}
                    onChange={(e) => setNewInclude(e.target.value)}
                    className="flex-1 bg-zinc-800 border border-white/10 rounded-xl px-3 py-1.5 text-sm text-white"
                    placeholder="Ej: Transporte, Desayuno"
                  />
                  <button
                    type="button"
                    onClick={handleAddInclude}
                    className="bg-red-600 px-3 rounded-xl hover:bg-red-700 transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(editForm.includes || []).map((item, idx) => (
                    <span key={idx} className="bg-green-600/20 text-green-400 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                      {item}
                      <button type="button" onClick={() => handleRemoveInclude(idx)} className="hover:text-green-300">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* No incluye */}
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">❌ No incluye</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newNotInclude}
                    onChange={(e) => setNewNotInclude(e.target.value)}
                    className="flex-1 bg-zinc-800 border border-white/10 rounded-xl px-3 py-1.5 text-sm text-white"
                    placeholder="Ej: Propinas, Seguro"
                  />
                  <button
                    type="button"
                    onClick={handleAddNotInclude}
                    className="bg-red-600 px-3 rounded-xl hover:bg-red-700 transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(editForm.notIncludes || []).map((item, idx) => (
                    <span key={idx} className="bg-red-600/20 text-red-400 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                      {item}
                      <button type="button" onClick={() => handleRemoveNotInclude(idx)} className="hover:text-red-300">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Contacto */}
              <div className="border-t border-white/10 pt-3 mt-2">
                <label className="text-sm text-zinc-400 mb-1 block">📞 Contacto</label>
                <input
                  type="email"
                  value={editForm.contact?.email || ''}
                  onChange={(e) => setEditForm({ 
                    ...editForm, 
                    contact: { ...editForm.contact, phone: editForm.contact?.phone || '', email: e.target.value, website: editForm.contact?.website || '' }
                  })}
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl px-3 py-1.5 text-sm text-white mb-2"
                  placeholder="Email"
                />
                <input
                  type="tel"
                  value={editForm.contact?.phone || ''}
                  onChange={(e) => setEditForm({ 
                    ...editForm, 
                    contact: { ...editForm.contact, phone: e.target.value, email: editForm.contact?.email || '', website: editForm.contact?.website || '' }
                  })}
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl px-3 py-1.5 text-sm text-white mb-2"
                  placeholder="Teléfono"
                />
                <input
                  type="url"
                  value={editForm.contact?.website || ''}
                  onChange={(e) => setEditForm({ 
                    ...editForm, 
                    contact: { ...editForm.contact, phone: editForm.contact?.phone || '', email: editForm.contact?.email || '', website: e.target.value }
                  })}
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl px-3 py-1.5 text-sm text-white"
                  placeholder="Sitio web (opcional)"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <Check size={18} /> Guardar cambios
                </button>
                <button
                  onClick={cancelEdit}
                  className="flex-1 bg-zinc-700 hover:bg-zinc-600 py-2 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <X size={18} /> Cancelar
                </button>
              </div>
            </div>
          ) : (
            // Vista normal
            <div className="flex gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-zinc-400">{item.location}</p>
                <p className="text-sm text-red-400 font-bold mt-1">${item.price}</p>
                {item.includes && item.includes.length > 0 && (
                  <p className="text-xs text-green-400 mt-1">✓ {item.includes.length} servicios incluidos</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 bg-blue-600/20 hover:bg-blue-600/40 rounded-xl transition-all"
                  title="Editar"
                >
                  <Edit2 size={18} className="text-blue-400" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-red-600/20 hover:bg-red-600/40 rounded-xl transition-all"
                  title="Eliminar"
                >
                  <Trash2 size={18} className="text-red-400" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}