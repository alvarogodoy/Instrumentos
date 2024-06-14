import { Button } from "@mui/material";
import { useCallback, useEffect } from "react";
import { CloudinaryError, CloudinaryResult } from "../types/CloudinaryTypes";
import { useCloudinaryImage } from "../context/CloudinaryImageProvider";

const loadCloudinaryWidget = () => {
  const script = document.createElement("script");
  script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
  script.type = "text/javascript";
  script.async = true;
  document.body.appendChild(script);
};

const UploadWidget: React.FC = () => {
  const { setImageUrl } = useCloudinaryImage();

  useEffect(() => {
    loadCloudinaryWidget();
  }, []);

  const handleUpload = useCallback(() => {
    const cloudName = "dwqc7jf2q"; // Reemplaza con tu cloud name
    const uploadPreset = "mlbplk0k"; // Reemplaza con tu upload preset

    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
      },
      (error: CloudinaryError, result: CloudinaryResult) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setImageUrl(result.info.secure_url);
        }
      }
    );

    widget.open();
  }, []);

  return <Button onClick={handleUpload}>Subir Imagen de Instrumento</Button>;
};

export default UploadWidget;
