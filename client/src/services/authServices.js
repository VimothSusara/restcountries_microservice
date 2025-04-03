import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_SERVER_HOST;

export const register = async (
  username,
  first_name,
  last_name,
  email,
  phone_number,
  password
) => {
  return await axios.post(
    `${API_BASE_URL}/api/auth/register`,
    {
      username,
      first_name,
      last_name,
      email,
      phone_number,
      password,
    },
    {
      withCredentials: true,
    }
  );
};

export const login = async (username, password) => {
  return await axios.post(
    `${API_BASE_URL}/api/auth/login`,
    {
      username,
      password,
    },
    {
      withCredentials: true,
    }
  );
};

export const checkAuth = async () => {
  return await axios.get(`${API_BASE_URL}/api/auth/checkAuth`, {
    withCredentials: true,
  });
};

export const logout = async () => {
  return await axios.post(
    `${API_BASE_URL}/api/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );
};
