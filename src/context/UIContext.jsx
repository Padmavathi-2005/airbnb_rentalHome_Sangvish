import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  const openLangModal = () => setIsLangModalOpen(true);
  const closeLangModal = () => setIsLangModalOpen(false);

  return (
    <UIContext.Provider value={{ isLangModalOpen, openLangModal, closeLangModal }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
