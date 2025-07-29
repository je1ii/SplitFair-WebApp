import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-500 text-white text-sm px-3 py-1 rounded"
    >
      Logout
    </button>
  );
}
