import axios from "axios";
import { create } from "zustand";

const URL_USUARIO = import.meta.env.VITE_API_USUARIO;

const usePacienteStore = create((set) => ({
  pacientes: [],
  paciente: null,
  loading: false,
  error: null,

  obtenerPacientes: async () => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get(URL_USUARIO);
      if (Array.isArray(resp.data)) {
        const pacientes = resp.data.filter((user) => user.rol === "Paciente");
        set({ pacientes, loading: false });
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

  obtenerPacientePorId: async (id) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get(`${URL_USUARIO}/${id}`);
      set({ paciente: resp.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default usePacienteStore;
