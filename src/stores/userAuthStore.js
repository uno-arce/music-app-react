import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useUserAuthStore = create((set) => ({
	username: '',
	email: '',
	password: '',

	isAuthenticated: false,
	isFormDisabled: false,
	isUserAuthLoading: true,

	isUsernameLengthCorrect: false,
	isUsernameCharactersCorrect: false,
	isEmailFormatCorrect: false,
	isEmailAvailable: false,
	isPasswordCharactersCorrect: false,
	isPasswordTextCaseCorrect: false,
	isPasswordLengthCorrect: false,
	isPasswordVisible: false,

	actions: {
		setUsername: (username) => set({ username: username }),
		setEmail: (email) => set({ email: email }),
		setPassword: (password) => set({ password: password }),
		setIsFormDisabled: (form) => set({ isFormDisabled: form }),
		setIsAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
		setIsUserAuthLoading: (loading) => set({ isUserAuthLoading: loading }),

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
		},

		resetUserRegistrationState: () => {
			set({
				username: '',
				email: '',
				password: '',
				isFormDisabled: false,
				isUsernameLengthCorrect: false,
				isUsernameCharactersCorrect: false,
				isEmailFormatCorrect: false,
				isEmailAvailable: false,
				isPasswordCharactersCorrect: false,
				isPasswordTextCaseCorrect: false,
				isPasswordLengthCorrect: false,
				isPasswordVisible: false,
			})
		}
	}
}))

export const useUserAuthData = () => useUserAuthStore(useShallow((state) => {
	const isUsernameIncorrect = !state.isUsernameLengthCorrect || !state.isUsernameCharactersCorrect

	const isEmailIncorrect = !state.isEmailFormatCorrect || !state.isEmailAvailable

	const isPasswordIncorrect = !state.isPasswordCharactersCorrect || !state.isPasswordTextCaseCorrect && !state.isPasswordLengthCorrect
	const isLoginButtonDisabled = !state.email || !state.password
	const isRegisterButtonDisabled = state.isUsernameIncorrect || state.isEmailIncorrect || state.isPasswordIncorrect || !state.username || !state.email || !state.password
	return {
		username: state.username,
		email: state.email,
		password: state.password,
		isAuthenticated: state.isAuthenticated,
		isFormDisabled: state.isFormDisabled,
		isUserAuthLoading: state.isUserAuthLoading,
		isUsernameLengthCorrect: state.isUsernameLengthCorrect,
		isUsernameCharactersCorrect: state.isUsernameCharactersCorrect,
		isEmailFormatCorrect: state.isEmailFormatCorrect,
		isEmailAvailable: state.isEmailAvailable,
		isPasswordCharactersCorrect: state.isPasswordCharactersCorrect,
		isPasswordTextCaseCorrect: state.isPasswordTextCaseCorrect,
		isPasswordLengthCorrect: state.isPasswordLengthCorrect,
		isPasswordVisible: state.isPasswordVisible,
		isUsernameIncorrect,
		isEmailIncorrect,
		isPasswordIncorrect,
		isLoginButtonDisabled,
		isRegisterButtonDisabled
	}
}))

export const useUserAuthActions = () => useUserAuthStore((state) => state.actions)

export default useUserAuthStore