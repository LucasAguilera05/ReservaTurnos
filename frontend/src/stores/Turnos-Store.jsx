import axios from "axios";
import { create } from "zustand";

const URL_TURNO = import.meta.env.VITE_API_TURNO;

const useTurnosStore = create((set) => ({
  turnos: [],
  turno: null,
  loading: false,
  error: null,

  obtenerTurnos: async () => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get(URL_TURNO);
      set({ turnos: resp.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  obtenerTurnoPorId: async (id) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get(`${URL_TURNO}/${id}`);
      set({ turno: resp.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  verificarTurnoExistente: async (fecha, horario) => {
    try {
      const resp = await axios.get(URL_TURNO);
      const turnoExistente = resp.data.find((turno) => {
        const coincideHorario = horario
          ? turno.horario.toLowerCase() === horario.toLowerCase()
          : true;
        return (
          turno.fecha === fecha && coincideHorario
        );
      });
      return !!turnoExistente;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  crearTurno: async (nuevoTurno) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.post(URL_TURNO, nuevoTurno);
      set((state) => ({
        turnos: [...state.turnos, resp.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  actualizarTurno: async (id, turnoActualizado) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.put(`${URL_TURNO}/${id}`, turnoActualizado);
      set((state) => ({
        turnos: state.turnos.map((turno) =>
          turno.id === id ? resp.data : turno
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  borrarTurno: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${URL_TURNO}/${id}`);
      set((state) => ({
        turnos: state.turnos.filter((turno) => turno.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useTurnosStore;
