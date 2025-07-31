import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LogoutButton.css';

export default function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
}
