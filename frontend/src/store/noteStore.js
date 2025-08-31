import { create } from "zustand";

const API_URL = 'http://localhost:3000/api/notes';

export const useNoteStore = create((set) => ({
    notes: [],
    isLoading: false,
    error: null,

    getNotes: async () => {
        set({ isLoading: true, error: null});
        try {
            const response = await fetch(`${API_URL}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await response.json();
            set({isLoading: false, notes: data.notes || [] });
        } catch (error) {
            set({isLoading: false, error: error.message})
            console.log(error);
        }
    },

    getNoteById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await response.json();
            return data.note;
        } catch (error) {
            set({ isLoading: false, error: error.message });
            console.log(error);
            throw error;
        }
    },

    createNote: async (title, body) => {
        try {
            const response = await fetch(`${API_URL}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ title, body }),
            });
            const data = await response.json();
            set((state) => ({
                notes: [...state.notes, data.note],
            }));
        } catch (error) {
            set({ error: error.message });
            console.log(error);
        }
    },

    searchNotes: async (input) => {
        try {
            const response = await fetch(`${API_URL}/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ searchTerm: input }),
            });
            const data = await response.json();
            set({ notes: data.searchResults });
        } catch (error) {
            set ({ error: error.message});
        }
    },

    searchNotes: async (input) => {
        try {
            const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(input)}`, {
                method: "GET",
                
                credentials: "include",
            });
            const data = await response.json();
            set({ notes: data.notes || [] });
        } catch (error) {
            set ({ error: error.message});
            console.log(error);
        }
    },

    updateNote: async (id, title, body) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ title, body }),
            });
            const data = await response.json();
            set((state) => ({
                notes: state.notes.map((note) =>
                    note._id === id ? data.note : note
                ),
            }));
        } catch (error) {
            set ({ error: error.message});
        }
    },

    deleteNote: async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            set((state) => ({
                notes: state.notes.filter((note) => note._id !== id),
            }));
        } catch (error) {
            set ({ error: error.message});
        }
    },
}));
