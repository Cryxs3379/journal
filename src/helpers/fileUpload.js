export const fileUpload = async(file) => {
    if (!file) throw new Error('No tenemos archivo para subir'); // Verifica si hay un archivo

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dnxvlxfqd/upload?';
    const formData = new FormData();

    formData.append('upload_preset', 'react-journal'); // Configuración de Cloudinary
    formData.append('file', file); // Archivo a subir

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if (!resp.ok) throw new Error('No se pudo subir la imagen');

        const cloudResp = await resp.json(); // Respuesta de Cloudinary
        return cloudResp.secure_url; // URL segura de la imagen subida
    } catch (error) {
        throw new Error(error.message); // Manejo de errores
    }
};
