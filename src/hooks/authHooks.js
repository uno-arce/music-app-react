import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import useUserAuthStore from '../stores/userAuthStore'
import userAuth from '../services/userAuth'
import useForm from '../hooks/formHooks'

const useAuth = () => {
	const navigate = useNavigate()
	const userAuthStore = useUserAuthStore()
	const { validateTextLength, validateMixedCharacters, validateEmailFormat } = useForm()

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
				console.log(error)
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

				userAuthStore.setIsEmailFormatCorrect(isEmailFormatCorrect)
				console.log(isEmailFormatCorrect)
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

	const checkEmailAvailability = () => {
		
	}

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

	return {
		loginInputs,
		registerInputs,
		isLoginButtonDisabled,
		isRegisterButtonDisabled,
		login,
		register,
		logout,
		isLoading: userAuthStore.isLoading,
		isAuthenticated: userAuthStore.isAuthenticated,
		isFormDisabled: userAuthStore.isFormDisabled,
		isUsernameLengthCorrect: userAuthStore.isUsernameLengthCorrect,
		isUsernameCharactersCorrect: userAuthStore.isUsernameCharactersCorrect,
		isEmailFormatCorrect: userAuthStore.isEmailFormatCorrect
	}
}

export default useAuth