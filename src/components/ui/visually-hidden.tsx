// visually-hidden.tsx
import React from "react";

interface VisuallyHiddenProps {
  children: React.ReactNode;
}

const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({ children }) => (
  <span className="sr-only">{children}</span>
);

export default VisuallyHidden;
