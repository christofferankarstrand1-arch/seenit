import React, { createContext, useContext, useState, ReactNode } from 'react';

export type MediaItem = {
  id: string;
  title: string;
  type: 'movie' | 'tv' | 'youtube' | 'podcast' | 'discord';
  status: 'seen' | 'wishlist';
  year?: number;
  rating?: number;
  poster?: string;
};

type SeenItContextType = {
  media: MediaItem[];
  addMedia: (item: MediaItem) => void;
  removeMedia: (id: string) => void;
  toggleStatus: (id: string) => void;
};

const SeenItContext = createContext<SeenItContextType | undefined>(undefined);

export const SeenItProvider = ({ children }: { children: ReactNode }) => {
  const [media, setMedia] = useState<MediaItem[]>([]);

  const addMedia = (item: MediaItem) => {
    setMedia((prev) => [...prev, item]);
  };

  const removeMedia = (id: string) => {
    setMedia((prev) => prev.filter((m) => m.id !== id));
  };

  const toggleStatus = (id: string) => {
    setMedia((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === 'seen' ? 'wishlist' : 'seen' }
          : m
      )
    );
  };

  return (
    <SeenItContext.Provider value={{ media, addMedia, removeMedia, toggleStatus }}>
      {children}
    </SeenItContext.Provider>
  );
};

export const useSeenIt = () => {
  const context = useContext(SeenItContext);
  if (!context) {
    throw new Error('useSeenIt must be used within a SeenItProvider');
  }
  return context;
};
