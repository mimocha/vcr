/**
 * Card Component
 * Container component with consistent styling
 */

export default function Card({ children, title, className = "", ...props }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 ${className}`}
      {...props}
    >
      {title && (
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      )}
      {children}
    </div>
  );
}
