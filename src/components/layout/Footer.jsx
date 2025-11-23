/**
 * Footer Component
 * Application footer with attribution
 */

export default function Footer() {
  return (
    <footer className="mt-12 pt-6 border-t border-gray-200">
      <div className="text-center text-sm text-gray-600">
        <p>
          Based on Tom Schwartz (Tinman) methodology and Lange & Pöhlitz zone
          system
        </p>
        <p className="mt-2">
          <a
            href="https://github.com/mimocha/vcr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            View on GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
