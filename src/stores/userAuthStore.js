import { create } from 'zustand'

const useUserAuthStore = create((set) => ({
	username: null,
	email: null,
	password: null,

	setUsername: (username) => set({ username: username }),
	setEmail: (email) => set({ email: email }),
	setPassword: (password) => set({ password: password }),
}))

export default useUserAuthStore