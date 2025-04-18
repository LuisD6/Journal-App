export const fileUpload = async (file) => {
    if (!file) throw new Error('No hay ningún archivo para subir');
  
    const cloudUrl = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  
    const formData = new FormData();
    formData.append('upload_preset', uploadPreset);
    formData.append('file', file);
  
    try {
      const resp = await fetch(cloudUrl, {
        method: 'POST',
        body: formData,
      });
  
      if (!resp.ok) throw new Error('No se pudo subir la imagen');
  
      const cloudResp = await resp.json();
      return cloudResp.secure_url;
    } catch (error) {
      console.error('Error al subir imagen a Cloudinary:', error.message);
      throw new Error(error.message);
    }
  };
  