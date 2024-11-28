"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { AcknowledgmentModal } from "./acknowledgment-modal";

interface AcknowledgmentContextType {
  showAcknowledgmentModal: boolean;
  setShowAcknowledgmentModal: (show: boolean) => void;
  hasAgreed: boolean;
  setHasAgreed: (agreed: boolean) => void;
  handleAcknowledge: () => void;
}

const AcknowledgmentContext = createContext<AcknowledgmentContextType>({
  showAcknowledgmentModal: false,
  setShowAcknowledgmentModal: () => {},
  hasAgreed: false,
  setHasAgreed: () => {},
  handleAcknowledge: () => {},
});

export const useAcknowledgment = () => useContext(AcknowledgmentContext);

export function AcknowledgmentModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showAcknowledgmentModal, setShowAcknowledgmentModal] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);

  useEffect(() => {
    const checkAgreement = () => {
      const agreed = localStorage.getItem("userAgreed");
      if (agreed === "true") {
        setHasAgreed(true);
      }
    };

    checkAgreement();
    window.addEventListener("storage", checkAgreement);

    return () => {
      window.removeEventListener("storage", checkAgreement);
    };
  }, []);

  const handleAcknowledge = () => {
    setHasAgreed(true);
    localStorage.setItem("userAgreed", "true");
    setShowAcknowledgmentModal(false);
  };

  return (
    <AcknowledgmentContext.Provider
      value={{
        showAcknowledgmentModal,
        setShowAcknowledgmentModal,
        hasAgreed,
        setHasAgreed,
        handleAcknowledge,
      }}
    >
      {children}
      <AcknowledgmentModal
        isOpen={showAcknowledgmentModal}
        onClose={() => setShowAcknowledgmentModal(false)}
        onAgree={handleAcknowledge}
      />
    </AcknowledgmentContext.Provider>
  );
}
