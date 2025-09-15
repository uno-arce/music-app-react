import { create } from 'zustand'

const useUserAuthStore = create((set) => ({
	username: '',
	email: '',
	password: '',

	isAuthenticated: false,
	isFormDisabled: false,
	isLoading: true,

	setUsername: (username) => set({ username: username }),
	setEmail: (email) => set({ email: email }),
	setPassword: (password) => set({ password: password }),
	setIsFormDisabled: (form) => set({ isFormDisabled: form }),
	setIsAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
	setIsLoading: (loading) => set({ isLoading: loading }),

	resetUserAuthState: () => {
		set({
			username: '',
			email: '',
			password: '',
			isFormDisabled: false
		})
	}
}))

export default useUserAuthStore