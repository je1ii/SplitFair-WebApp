import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to SplitFair</h1>
      {user ? (
        <>
          <p className="mb-2">You are logged in as <strong>{user.email}</strong></p>
          <Link to="/expenses" className="text-blue-600 underline">Go to Expenses</Link>
          <LogoutButton />
        </>
      ) : (
        <>
          <p>Please <Link to="/login" className="text-blue-600 underline">log in</Link> to start tracking expenses.</p>
        </>
      )}
    </div>
  );
}
