import { create } from 'zustand'

const useUserAuthStore = create((set) => ({
	username: null,
	email: null,
	password: null,
	isAuthenticated: false,

	setUsername: (username) => set({ username: username }),
	setEmail: (email) => set({ email: email }),
	setPassword: (password) => set({ password: password }),
	setIsAuthenticated: (status) => set({ isAuthenticated: status })
}))

export default useUserAuthStore