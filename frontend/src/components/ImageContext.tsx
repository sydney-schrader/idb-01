import React, { createContext, useContext, useState } from "react";

type ImageContextType = {
  images: Record<string, string>;
  setImage: (name: string, url: string) => void;
};

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const useImages = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImages must be used within an ImageProvider");
  }
  return context;
};

type ImageProviderProps = {
  children: React.ReactNode;
};

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [images, setImages] = useState<Record<string, string>>({});

  const setImage = (name: string, url: string) => {
    setImages(prev => ({ ...prev, [name]: url }));
  };

  return (
    <ImageContext.Provider value={{ images, setImage }}>
      {children}
    </ImageContext.Provider>
  );
};
