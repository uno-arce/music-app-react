import { create } from 'zustand'

const useUserAuthStore = create((set) => ({
	username: '',
	email: '',
	password: '',

	isFormDisabled: false,

	setUsername: (username) => set({ username: username }),
	setEmail: (email) => set({ email: email }),
	setPassword: (password) => set({ password: password }),
	setIsFormDisabled: (form) => set({ isFormDisabled: form }),

	resetLoginState: () => {
		set({
			email: '',
			password: '',
			isFormDisabled: false
		})
	}
}))

export default useUserAuthStore