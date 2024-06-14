import React, { createContext, ReactNode, useContext, useState } from "react";

interface CloudinaryImageContext {
  imageUrl: string | null;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

interface ImageProviderProps {
  children: ReactNode;
}

const CloudinaryImageContext = createContext<CloudinaryImageContext>({
  imageUrl: null,
  setImageUrl: () => {},
});

export const useCloudinaryImage = () => useContext(CloudinaryImageContext);

export const CloudinaryImageProvider: React.FC<ImageProviderProps> = ({
  children,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <CloudinaryImageContext.Provider value={{ imageUrl, setImageUrl }}>
      {children}
    </CloudinaryImageContext.Provider>
  );
};
