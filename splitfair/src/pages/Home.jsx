import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import './Home.css';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to SplitFair</h1>
        {user ? (
          <>
            <p className="home-text">
              You are logged in as <span className="home-email">{user.email}</span>
            </p>
            <Link to="/expenses" className="home-link">
              Go to Expenses
              <br></br>
              <br></br>
            </Link>
            <LogoutButton />
          </>
        ) : (
          <p className="home-text">
            Please <Link to="/login" className="home-link">log in</Link> to start tracking expenses.
          </p>
        )}
      </div>
    </div>
  );
}
