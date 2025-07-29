import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="mb-4">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-blue-600 underline">Return to Home</Link>
    </div>
  );
}
