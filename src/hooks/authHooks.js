import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useShallow } from 'zustand/react/shallow'
import { useUserAuthData, useUserAuthActions } from '../stores/userAuthStore'
import { useFormActions } from '../stores/componentStore'
import userAuth from '../services/userAuth'
import useForm from '../hooks/formHooks'

const useAuth = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const userAuthData = useUserAuthData()
	const actionsUserAuth = useUserAuthActions()
	const actionsForm = useFormActions()

	const { validateTextLength, validateTextCase, validateMixedCharacters, validateEmailFormat, validatePassword, validateUniqueness } = useForm()

	useEffect(() => {
		if(userAuthData.isLoading) {
			userAuth.verify()
			.then(response => {
				if(response.status !== 200) {
					actionsUserAuth.setIsLoading(false)
					return
				}
				actionsUserAuth.setIsLoading(false)
				actionsUserAuth.setIsAuthenticated(true)
			}).catch(error => {
				actionsUserAuth.setIsLoading(false)
				actionsUserAuth.setIsAuthenticated(false)
			})
		}
	}, [userAuthData.isLoading])

	const loginInputs = [
		{
			name: 'Email',
			value: userAuthData.email,
			updateState: (value) => {
				actionsUserAuth.setEmail(value)
			} 
		},
		{
			name: 'Password',
			value: userAuthData.password,
			type: 'password',
			updateState: (value) => {
				actionsUserAuth.setPassword(value)
			}
		}
	]

	
	const login = () => {
		actionsUserAuth.setIsFormDisabled(true)

		userAuth.login(userAuthData.email, userAuthData.password)
		.then(response => {
			if(response.status !== 200) {
				actionsUserAuth.resetUserAuthState()
        		return
        	} 

        	actionsUserAuth.setIsLoading(true)
        	actionsUserAuth.resetUserAuthState()
        	navigate('/homeprofile', { replace: true })
		}).catch(error => {
			console.log(error)
			actionsUserAuth.resetUserAuthState()
		})
	}

	const register = () => {
		actionsUserAuth.setIsFormDisabled(true)

		userAuth.register(userAuthData.username, userAuthData.email, userAuthData.password)
		.then(response => {
			if(response.status !== 200) {
				return
			}

			actionsUserAuth.resetUserRegistrationState()
			actionsForm.setCurrentFormStep('Username')
			navigate('/login', { replace: true })
		}).catch(error => {
			console.log(error)
			return
		})
	}

	const checkEmailAvailability = (email) => {
		userAuth.checkEmailAvailability(email)
		.then(response => {
			if (response.status !== 200) {
				actionsUserAuth.setIsEmailAvailable(false)
				return
			}

			actionsUserAuth.setIsEmailAvailable(true)
		}).catch(error => {
			console.log(error)
			actionsUserAuth.setIsEmailAvailable(false)
			return
		})
	}

	const registerInputs = [
		{
			name: 'Username',
			value: userAuthData.username,
			updateState: (value) => {
				actionsUserAuth.setUsername(value.toLowerCase())
			},
			validateState: (value) => {
				const isUsernameLengthCorrect = validateTextLength(value, 6, 20)
				const isUsernameCharactersCorrect = validateMixedCharacters(value)

				actionsUserAuth.setIsUsernameLengthCorrect(isUsernameLengthCorrect)
				actionsUserAuth.setIsUsernameCharactersCorrect(isUsernameCharactersCorrect)
			}
		},
		{
			name: 'Email',
			value: userAuthData.email,
			updateState: (value) => {
				actionsUserAuth.setEmail(value)
			},
			validateState: (value) => {
				const isEmailFormatCorrect = validateEmailFormat(value)
				const isEmailUnique = isEmailFormatCorrect ? validateUniqueness(value, checkEmailAvailability) : actionsUserAuth.setIsEmailAvailable(false)

				actionsUserAuth.setIsEmailFormatCorrect(isEmailFormatCorrect)
			}
		},
		{
			name: 'Password',
			value: userAuthData.password,
			type: userAuthData.isPasswordVisible ? 'text' : 'password',
			updateState: (value) => {
				actionsUserAuth.setPassword(value)
			},
			validateState: (value) => {
				const isPasswordCharactersCorrect = validatePassword(value)
				const isPasswordTextCaseCorrect = validateTextCase(value)
				const isPasswordLengthCorrect = validateTextLength(value, 6, 20)

				actionsUserAuth.setIsPasswordCharactersCorrect(isPasswordCharactersCorrect)
				actionsUserAuth.setIsPasswordTextCaseCorrect(isPasswordTextCaseCorrect)
				actionsUserAuth.setIsPasswordLengthCorrect(isPasswordLengthCorrect)
			}
		}
	]

	const logout = () => {
		userAuth.logout()
		.then(response => {
			if(response.status !== 200) {
				return
			}

			actionsUserAuth.setIsAuthenticated(false)
		}).catch(error => {
			console.log(error)
			return
		})
	}

	const toggleShowPassword = () => {
		const isPasswordVisible = userAuthData.isPasswordVisible
		actionsUserAuth.setIsPasswordVisible(!isPasswordVisible)
	}

	useEffect(() => {
		const pathname = location.pathname
		return () => {
			if(pathname === '/login') {
				actionsUserAuth.resetUserAuthState()
			} else if (pathname === '/register') {
				actionsUserAuth.resetUserRegistrationState()
				actionsForm.setCurrentFormStep('Username')
			}
		}
	}, [location.pathname, actionsUserAuth.resetUserAuthState, actionsUserAuth.resetUserRegistrationState,actionsForm.setCurrentFormStep])

	return {
		loginInputs,
		registerInputs,
		login,
		register,
		logout,
		toggleShowPassword,
		username: userAuthData.username,
		email: userAuthData.email,
		isLoading: userAuthData.isLoading,
		isAuthenticated: userAuthData.isAuthenticated,
		isFormDisabled: userAuthData.isFormDisabled,
		isUsernameLengthCorrect: userAuthData.isUsernameLengthCorrect,
		isUsernameCharactersCorrect: userAuthData.isUsernameCharactersCorrect,
		isEmailFormatCorrect: userAuthData.isEmailFormatCorrect,
		isEmailAvailable: userAuthData.isEmailAvailable,
		isPasswordCharactersCorrect: userAuthData.isPasswordCharactersCorrect,
		isPasswordTextCaseCorrect: userAuthData.isPasswordTextCaseCorrect,
		isPasswordLengthCorrect: userAuthData.isPasswordLengthCorrect,
		isPasswordVisible: userAuthData.isPasswordVisible,
		isLoginButtonDisabled: userAuthData.isLoginButtonDisabled,
		isRegisterButtonDisabled: userAuthData.isRegisterButtonDisabled,
		isUsernameIncorrect: userAuthData.isUsernameIncorrect,
		isEmailIncorrect: userAuthData.isEmailIncorrect,
		isPasswordIncorrect: userAuthData.isPasswordIncorrect
	}
}

export default useAuth