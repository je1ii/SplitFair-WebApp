import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      navigate('/expenses');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-semibold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full border px-3 py-2 rounded"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="w-full border px-3 py-2 rounded"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded" type="submit">
          {isLogin ? 'Login' : 'Create Account'}
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="text-sm mt-3 text-blue-600 underline"
      >
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
      </button>
    </div>
  );
}
