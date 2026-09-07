import { useDispatch } from 'react-redux';
import { setError, setLoading, setUser } from '@/features/auth/store/authSlice';
import authApi from '@/features/auth/services/auth.api';

export function useAuth() {
  const dispatch = useDispatch();

  const handleRegister = async (name, email, password, contact, isSeller = false) => {
    try {
      dispatch(setLoading(true));
      const data = await authApi.registerAPI(name, email, password, contact, isSeller);
      dispatch(setUser(data.user));
      return data;
    } catch (error) {
      dispatch(setError(error ?? 'Registration failed'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogin = async (email, password) => {
    try {
      dispatch(setError(null));
      dispatch(setLoading(true));
      const data = await authApi.loginAPI(email, password);
      dispatch(setUser(data.user));
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      dispatch(setError(error ?? 'Login failed'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleAuthSuccess = async (token) => {
    try {
      dispatch(setLoading(true));
      localStorage.setItem('token', token);
      const data = await authApi.getCurrentUserAPI(token);
      dispatch(setUser(data.user));
      return data;
    } catch (error) {
      dispatch(setError('Google login failed. Please try again.'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { handleRegister, handleLogin, handleGoogleAuthSuccess };
}

export default useAuth;
