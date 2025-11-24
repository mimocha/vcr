/**
 * Modal Component
 * Full-screen overlay modal with glassmorphic background
 */

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../../contexts/ThemeContext";

export default function Modal({ isOpen, onClose, children, ...props }) {
  const { isDark } = useTheme();

  // Handle ESC key press
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      {...props}
    >
      {/* Glassmorphic backdrop */}
      <div
        className={`absolute inset-0 transition-all ${
          isDark
            ? "bg-black/60 backdrop-blur-md"
            : "bg-white/40 backdrop-blur-md"
        }`}
        style={{
          backdropFilter: "blur(8px) saturate(150%)",
          WebkitBackdropFilter: "blur(8px) saturate(150%)",
        }}
      />

      {/* Modal content */}
      <div
        className="relative z-10 w-full max-w-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
