import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useShallow } from 'zustand/react/shallow'
import { useUserAuthData, useUserAuthActions } from '../stores/userAuthStore'
import { useAlertData, useFormActions, useAlertActions } from '../stores/componentStore'
import userAuth from '../services/userAuth'
import useForm from '../hooks/formHooks'

const useAuth = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const userAuthData = useUserAuthData()
	const alertData = useAlertData()
	const actionsUserAuth = useUserAuthActions()
	const actionsForm = useFormActions()
	const actionsAlert = useAlertActions()

	const { validateTextLength, validateTextCase, validateMixedCharacters, validateEmailFormat, validatePassword, validateUniqueness } = useForm()

	useEffect(() => {
		if(userAuthData.isUserAuthLoading) {
			userAuth.verify()
			.then(response => {
				if(response.status !== 200) {
					actionsUserAuth.setIsUserAuthLoading(false)
					return
				}
				actionsUserAuth.setIsUserAuthLoading(false)
				actionsUserAuth.setIsAuthenticated(true)
			}).catch(error => {
				actionsUserAuth.setIsUserAuthLoading(false)
				actionsUserAuth.setIsAuthenticated(false)
			})
		}
	}, [userAuthData.isUserAuthLoading])

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
		actionsAlert.setIsAlertOpen(true)
		actionsAlert.setAlertStatus('loading')
		actionsAlert.setAlertMessage('Logging In')

		userAuth.login(userAuthData.email, userAuthData.password)
		.then(response => {
			actionsAlert.setIsAlertOpen(false)

			if(response.status !== 200) {
				actionsUserAuth.resetUserAuthState()
				actionsAlert.setIsAlertOpen(true)
				actionsAlert.setAlertStatus('failed')
				actionsAlert.setAlertMessage(response.data.error)
        		return
        	} 

        	actionsUserAuth.setIsUserAuthLoading(true)
        	actionsUserAuth.resetUserAuthState()

        	navigate('/homeprofile', { replace: true })
		}).catch(error => {
			actionsUserAuth.resetUserAuthState()
		})
	}

	const register = () => {
		actionsUserAuth.setIsFormDisabled(true)
		actionsAlert.setIsAlertOpen(true)
		actionsAlert.setAlertStatus('loading')
		actionsAlert.setAlertMessage('Saving to Database')

		userAuth.register(userAuthData.username, userAuthData.email, userAuthData.password)
		.then(response => {
			actionsAlert.setIsAlertOpen(false)

			if(response.status !== 200) {
				actionsAlert.setIsAlertOpen(true)
				actionsAlert.setAlertStatus('failed')
				actionsAlert.setAlertMessage(response.data.error)
				return
			}

			actionsUserAuth.resetUserRegistrationState()
			actionsForm.setCurrentFormStep('Username')
			
			if(alertData.isAlertOpen === false) {
				navigate('/login', { replace: true })
			}
		}).catch(error => {
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
			return
		}).finally(() => {
			actionsUserAuth.setIsAuthenticated(false)
		})
	}

	const toggleShowPassword = () => {
		const isPasswordVisible = userAuthData.isPasswordVisible
		actionsUserAuth.setIsPasswordVisible(!isPasswordVisible)
	}

	useEffect(() => {
		const pathname = location.pathname
		return () => {
			if(pathname === '/login' || pathname === '/') {
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
		isUserAuthLoading: userAuthData.isUserAuthLoading,
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