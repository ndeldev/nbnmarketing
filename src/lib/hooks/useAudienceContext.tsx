"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AudienceContextType = {
  selectedAudience: string;
  setSelectedAudience: (audience: string) => void;
};

const AudienceContext = createContext<AudienceContextType | undefined>(undefined);

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [selectedAudience, setSelectedAudience] = useState("startups");

  return (
    <AudienceContext.Provider value={{ selectedAudience, setSelectedAudience }}>
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience() {
  const context = useContext(AudienceContext);
  if (!context) {
    throw new Error("useAudience must be used within AudienceProvider");
  }
  return context;
}
