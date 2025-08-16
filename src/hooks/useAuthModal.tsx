
import React, { createContext, useContext, useState } from 'react';

const ModalCtx = createContext<{ 
  open: boolean; 
  setOpen: (v: boolean) => void 
} | undefined>(undefined);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <ModalCtx.Provider value={{ open, setOpen }}>
      {children}
    </ModalCtx.Provider>
  );
}

export function useAuthModal() {
  const v = useContext(ModalCtx);
  if (!v) throw new Error('useAuthModal must be used within AuthModalProvider');
  return v;
}
