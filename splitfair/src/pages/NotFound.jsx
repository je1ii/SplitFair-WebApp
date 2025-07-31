import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-text">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="not-found-link">Return to Home</Link>
    </div>
  );
}