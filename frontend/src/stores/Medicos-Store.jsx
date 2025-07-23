import axios from "axios";
import { create } from "zustand";

const URL_USUARIO = import.meta.env.VITE_API_USUARIO;

const useMedicoStore = create((set) => ({
  medicos: [],
  medico: {},
  loading: false,
  error: null,

  obtenerMedicos: async () => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get(URL_USUARIO);
      if (Array.isArray(resp.data)) {
        const medicos = resp.data.filter((user) => user.rol === "Medico");
        set({ medicos, loading: false });
      } else {
        set({
          error:
            "La propiedad 'usuarios' no está definida en la respuesta de la API",
          loading: false,
        });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  obtenerMedico: async (id) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get(`${URL_USUARIO}/${id}`);
      const usuario = resp.data;

      if (usuario && usuario.rol === "Medico") {
        set({ medico: usuario, loading: false });
      } else {
        set({
          error: "El usuario no es un medico o no existe.",
          loading: false,
        });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useMedicoStore;
