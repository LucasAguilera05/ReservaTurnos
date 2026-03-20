import axios from "axios";
import { create } from "zustand";

const URL_USUARIO = import.meta.env.VITE_API_USUARIO;

// Usuarios de demostración para pruebas sin backend
const DEMO_USERS = [
  {
    id: 1,
    nombre: "Admin",
    apellido: "Sistema",
    email: "admin@demo.com",
    password: "admin123",
    rol: "Administrador",
    dni: "12345678",
    telefono: "1234567890",
    direccion: "Calle Admin 123",
    fechaNacimiento: "1990-01-01",
    especialidad: null
  },
  {
    id: 2,
    nombre: "Juan",
    apellido: "Perez",
    email: "medico@demo.com",
    password: "medico123",
    rol: "Medico",
    dni: "87654321",
    telefono: "0987654321",
    direccion: "Calle Medico 456",
    fechaNacimiento: "1985-05-15",
    especialidad: "Cardiologia"
  },
  {
    id: 3,
    nombre: "Maria",
    apellido: "Garcia",
    email: "paciente@demo.com",
    password: "paciente123",
    rol: "Paciente",
    dni: "11223344",
    telefono: "1122334455",
    direccion: "Calle Paciente 789",
    fechaNacimiento: "1995-10-20",
    especialidad: null
  }
];

const useAuth = create((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (data) => {
    set({ loading: true, error: null });
    try {
      const { email, password } = data;

      // Primero intentar login con usuarios demo
      const demoUser = DEMO_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (demoUser) {
        const { password: _, ...userWithoutPassword } = demoUser;
        set({
          user: userWithoutPassword,
          loading: false,
        });
        sessionStorage.setItem("usuario", JSON.stringify(userWithoutPassword));
        sessionStorage.setItem("token", "demo-token");
        return userWithoutPassword;
      }

      // Si no es usuario demo, intentar con el backend real
      const resp = await axios.post(`${URL_USUARIO}/login`, {
        email,
        password,
      });

      const { usuario, token } = resp.data;

      set({
        user: usuario,
        loading: false,
      });

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
