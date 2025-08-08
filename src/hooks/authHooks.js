import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import useUserAuthStore from '../stores/userAuthStore'
import userAuth from '../services/userAuth.js'

const useAuth = () => {
	const navigate = useNavigate()
	const userAuthStore = useUserAuthStore()

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

	const isButtonDisabled = !userAuthStore.email || !userAuthStore.password

	const login = () => {
		userAuthStore.setIsFormDisabled(true)

		userAuth.login(userAuthStore.email, userAuthStore.password)
		.then(response => {
			if(response.status !== 200) {
				userAuthStore.resetLoginState()
        		return
        	} 

        	userAuthStore.setIsAuthenticated(true)
        	userAuthStore.resetLoginState()
        	navigate('/homeprofile', { replace: true })
		}).catch(error => {
			console.log(error)
			userAuthStore.resetLoginState()
		})
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
		isButtonDisabled,
		login,
		logout,
		isLoading: userAuthStore.isLoading,
		isAuthenticated: userAuthStore.isAuthenticated
	}
}

export default useAuth