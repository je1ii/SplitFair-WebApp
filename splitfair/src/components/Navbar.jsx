import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoutButton from './LogoutButton';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 shadow-md flex justify-between items-center">
      <div className="text-lg font-semibold">
        <Link to="/" className="hover:text-blue-400">SplitFair</Link>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link to="/expenses" className="hover:text-blue-400">Expenses</Link>
            <span className="text-sm text-gray-300">{user.email}</span>
            <LogoutButton />
          </>
        ) : (
          <Link to="/login" className="hover:text-blue-400">Login</Link>
        )}
      </div>
    </nav>
  );
}
