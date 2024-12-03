import axios from "axios";
import { create } from "zustand";

const URL_USUARIO = import.meta.env.VITE_API_USUARIO;

const useAuth = create((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (data) => {
    set({ loading: true, error: null });
    try {
      const { email, password } = data;

      // Cambiar a POST para el inicio de sesión
      const resp = await axios.post(`${URL_USUARIO}/login`, {
        email,
        password,
      });

      // Manejar la respuesta adecuada
      const { usuario, token } = resp.data;

      // Guardar el usuario y el token en el estado
      set({
        user: usuario,
        loading: false,
      });

      // Almacenar el usuario y token en sessionStorage
      sessionStorage.setItem("usuario", JSON.stringify(usuario));
      sessionStorage.setItem("token", token);

      return usuario;
    } catch (error) {
      set({
        error: error.response?.data?.error || error.message,
        loading: false,
      });
      throw error;
    }
  },

  logout: () => {
    set({ user: null });
    sessionStorage.removeItem("usuario");
  },

  checkAuth: () => {
    const user = JSON.parse(sessionStorage.getItem("usuario"));
    set({ user });
    return user;
  },
}));

export default useAuth;
