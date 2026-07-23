import apiClient from './apiClient';

export async function registerAPI(fullname, email, password, contact, isSeller) {
  try {
    const response = await apiClient.post('/auth/register', {
      fullname,
      email,
      password,
      contact,
      isSeller,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Registration failed';
  }
}

export async function loginAPI(email, password) {
  try {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
}

export async function getCurrentUserAPI(token) {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await apiClient.get('/auth/me', { headers });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch user profile';
  }
}

const authService = {
  registerAPI,
  loginAPI,
  getCurrentUserAPI,
};

export default authService;
