import { create } from 'zustand'

const useUserAuthStore = create((set) => ({
	username: '',
	email: '',
	password: '',

	isAuthenticated: false,
	isFormDisabled: false,
	isLoading: true,

	isUsernameLengthCorrect: false,
	isUsernameCharactersCorrect: false,
	isEmailFormatCorrect: false,
	isEmailAvailable: false,
	isPasswordCharactersCorrect: false,
	isPasswordTextCaseCorrect: false,
	isPasswordLengthCorrect: false,
	isPasswordVisible: true,

	setUsername: (username) => set({ username: username }),
	setEmail: (email) => set({ email: email }),
	setPassword: (password) => set({ password: password }),
	setIsFormDisabled: (form) => set({ isFormDisabled: form }),
	setIsAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
	setIsLoading: (loading) => set({ isLoading: loading }),

	setIsUsernameLengthCorrect: (isLengthCorrect) => set({ isUsernameLengthCorrect: isLengthCorrect }),
	setIsUsernameCharactersCorrect: (isCharactersCorrect) => set({ isUsernameCharactersCorrect: isCharactersCorrect }),
	setIsEmailFormatCorrect: (isEmailFormatCorrect) => set({ isEmailFormatCorrect: isEmailFormatCorrect }),
	setIsEmailAvailable: (isEmailAvailable) => set({ isEmailAvailable: isEmailAvailable }),
	setIsPasswordCharactersCorrect: (isCharactersCorrect) => set({ isPasswordCharactersCorrect: isCharactersCorrect }),
	setIsPasswordTextCaseCorrect: (isTextCaseCorrect) => set({ isPasswordTextCaseCorrect: isTextCaseCorrect }),
	setIsPasswordLengthCorrect: (isLengthCorrect) => set({ isPasswordLengthCorrect: isLengthCorrect }),
	setIsPasswordVisible: (isVisible) => set({ isPasswordVisible: isVisible }),


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