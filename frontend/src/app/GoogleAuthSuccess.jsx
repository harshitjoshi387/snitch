import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { setUser, setLoading, setError } from '@/features/products/states/auth.slice';
import axios from 'axios';

const GoogleAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // Store the token
      localStorage.setItem('token', token);

      // Fetch user profile with the token
      const fetchUser = async () => {
        try {
          dispatch(setLoading(true));
          const response = await axios.get('http://localhost:3000/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          dispatch(setUser(response.data.user));
          navigate('/');
        } catch (error) {
          dispatch(setError('Google login failed. Please try again.'));
          navigate('/login');
        } finally {
          dispatch(setLoading(false));
        }
      };

      fetchUser();
    } else {
      dispatch(setError('Google login failed. No token received.'));
      navigate('/login');
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a0a',
      color: '#fff',
      fontFamily: "'Outfit', sans-serif"
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 40,
          height: 40,
          border: '3px solid #333',
          borderTopColor: '#fff',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          margin: '0 auto 20px'
        }} />
        <p>Completing sign in...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
};

export default GoogleAuthSuccess;
