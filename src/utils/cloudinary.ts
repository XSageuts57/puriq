// Configuración de Cloudinary
// ¡CAMBIAR! Reemplaza con tu Cloud Name de Cloudinary
const CLOUD_NAME = "dxp5lyx6u"; // Ej: "dabc12345"
const UPLOAD_PRESET = "puriq_uploads";

// Función para subir imágenes directamente a Cloudinary
export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error Cloudinary:", errorData);
      throw new Error(errorData.error?.message || "Error al subir imagen");
    }
    
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error en uploadToCloudinary:", error);
    throw error;
  }
};

// Función para subir múltiples imágenes
export const uploadMultipleToCloudinary = async (files: File[]): Promise<string[]> => {
  const uploadPromises = files.map(file => uploadToCloudinary(file));
  return await Promise.all(uploadPromises);
};