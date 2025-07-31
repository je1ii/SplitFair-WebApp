import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoutButton from './LogoutButton';

import './Navbar.css'
import logo from '../assets/SplitFair.png';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-link">
          <img src={logo} alt="SplitFair Logo" className="navbar-logo-img" />
          SplitFair
        </Link>
      </div>

      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/expenses" className="navbar-link">Expenses</Link>
            <span className="navbar-user">{user.email}</span>
            <LogoutButton />
          </>
        ) : (
          <Link to="/login" className="navbar-link">Login</Link>
        )}
      </div>
    </nav>
  );
}

