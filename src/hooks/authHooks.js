import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import useUserAuthStore from '../stores/userAuthStore'
import userAuth from '../services/userAuth'
import useForm from '../hooks/formHooks'

const useAuth = () => {
	const navigate = useNavigate()
	const userAuthStore = useUserAuthStore()
	const { validateTextLength, validateTextCase, validateMixedCharacters, validateEmailFormat, validatePassword, validateUniqueness } = useForm()

	useEffect(() => {
		if(userAuthStore.isLoading) {
			userAuth.verify()
			.then(response => {
				if(response.status !== 200) {
					userAuthStore.setIsLoading(false)
					return
				}
				userAuthStore.setIsLoading(false)
				userAuthStore.setIsAuthenticated(true)
			}).catch(error => {
				userAuthStore.setIsLoading(false)
				userAuthStore.setIsAuthenticated(false)
			})
		}
	}, [userAuthStore.isLoading])

	const loginInputs = [
		{
			name: 'Email',
			value: userAuthStore.email,
			updateState: (value) => {
				userAuthStore.setEmail(value)
			} 
		},
		{
			name: 'Password',
			value: userAuthStore.password,
			type: 'password',
			updateState: (value) => {
				userAuthStore.setPassword(value)
			}
		}
	]

	const isLoginButtonDisabled = !userAuthStore.email || !userAuthStore.password

	const login = () => {
		userAuthStore.setIsFormDisabled(true)

		userAuth.login(userAuthStore.email, userAuthStore.password)
		.then(response => {
			if(response.status !== 200) {
				userAuthStore.resetUserAuthState()
        		return
        	} 

        	userAuthStore.setIsAuthenticated(true)
        	userAuthStore.resetUserAuthState()
        	navigate('/homeprofile', { replace: true })
		}).catch(error => {
			console.log(error)
			userAuthStore.resetUserAuthState()
		})
	}

	const isRegisterButtonDisabled = !userAuthStore.username || !userAuthStore.email || !userAuthStore.password

	const register = () => {
		userAuthStore.setIsFormDisabled(true)

		userAuth.register(userAuthStore.username, userAuthStore.email, userAuthStore.password)
		.then(response => {
			if(response.status !== 200) {
				return
			}

			userAuthStore.resetUserAuthState()
			navigate('/login')
		}).catch(error => {
			console.log(error)
			return
		})
	}

	const checkEmailAvailability = (email) => {
		userAuth.checkEmailAvailability(email)
		.then(response => {
			if (response.status !== 200) {
				userAuthStore.setIsEmailAvailable(false)
				return
			}

			userAuthStore.setIsEmailAvailable(true)
		}).catch(error => {
			console.log(error)
			userAuthStore.setIsEmailAvailable(false)
			return
		})
	}

	const registerInputs = [
		{
			name: 'Username',
			value: userAuthStore.username,
			updateState: (value) => {
				userAuthStore.setUsername(value.toLowerCase())
				console.log(value)
				console.log(value.length)
			},
			validateState: (value) => {
				const isUsernameLengthCorrect = validateTextLength(value, 6, 20)
				const isUsernameCharactersCorrect = validateMixedCharacters(value)

				userAuthStore.setIsUsernameLengthCorrect(isUsernameLengthCorrect)
				userAuthStore.setIsUsernameCharactersCorrect(isUsernameCharactersCorrect)
				console.log(isUsernameLengthCorrect)
				console.log(isUsernameCharactersCorrect)
			}
		},
		{
			name: 'Email',
			value: userAuthStore.email,
			updateState: (value) => {
				userAuthStore.setEmail(value)
			},
			validateState: (value) => {
				const isEmailFormatCorrect = validateEmailFormat(value)
				const isEmailUnique = isEmailFormatCorrect ? validateUniqueness(value, checkEmailAvailability) : userAuthStore.setIsEmailAvailable(false)

				userAuthStore.setIsEmailFormatCorrect(isEmailFormatCorrect)
				console.log('Is email format correct:', isEmailFormatCorrect)
			}
		},
		{
			name: 'Password',
			value: userAuthStore.password,
			type: userAuthStore.isPasswordVisible ? 'text' : 'password',
			updateState: (value) => {
				userAuthStore.setPassword(value)
			},
			validateState: (value) => {
				const isPasswordCharactersCorrect = validatePassword(value)
				const isPasswordTextCaseCorrect = validateTextCase(value)
				const isPasswordLengthCorrect = validateTextLength(value, 6, 20)

				userAuthStore.setIsPasswordCharactersCorrect(isPasswordCharactersCorrect)
				userAuthStore.setIsPasswordTextCaseCorrect(isPasswordTextCaseCorrect)
				userAuthStore.setIsPasswordLengthCorrect(isPasswordLengthCorrect)
			}
		}
	]

	const logout = () => {
		userAuth.logout()
		.then(response => {
			if(response.status !== 200) {
				return
			}

			userAuthStore.setIsAuthenticated(false)
		}).catch(error => {
			console.log(error)
			return
		})
	}

	const toggleShowPassword = () => {
		const isPasswordVisible = userAuthStore.isPasswordVisible
		userAuthStore.setIsPasswordVisible(!isPasswordVisible)
	}

	return {
		loginInputs,
		registerInputs,
		isLoginButtonDisabled,
		isRegisterButtonDisabled,
		login,
		register,
		logout,
		toggleShowPassword,
		isLoading: userAuthStore.isLoading,
		isAuthenticated: userAuthStore.isAuthenticated,
		isFormDisabled: userAuthStore.isFormDisabled,
		isUsernameLengthCorrect: userAuthStore.isUsernameLengthCorrect,
		isUsernameCharactersCorrect: userAuthStore.isUsernameCharactersCorrect,
		isEmailFormatCorrect: userAuthStore.isEmailFormatCorrect,
		isEmailAvailable: userAuthStore.isEmailAvailable,
		isPasswordCharactersCorrect: userAuthStore.isPasswordCharactersCorrect,
		isPasswordTextCaseCorrect: userAuthStore.isPasswordTextCaseCorrect,
		isPasswordTextLengthCorrect: userAuthStore.isPasswordTextLengthCorrect,
		isPasswordVisible: userAuthStore.isPasswordVisible
	}
}

export default useAuth