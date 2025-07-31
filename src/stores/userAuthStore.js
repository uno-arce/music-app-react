import { create } from 'zustand'

const useUserAuthStore = create((set) => ({
	username: null,
	email: null,
	password: null,

	isFormDisabled: false,

	setUsername: (username) => set({ username: username }),
	setEmail: (email) => set({ email: email }),
	setPassword: (password) => set({ password: password }),
	setIsFormDisabled: (form) => set({ isFormDisabled: form })
}))

export default useUserAuthStore