import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useUserAuthStore } from '../stores/userAuthStore'
import { userAuth } from '../services/userAuth.js'

const useAuth = () => {
	const navigate = useNavigate()
	const userAuthStore = useUserAuthStore()


	const login = () => {
		userAuthStore.setIsFormDisable(true)

		userAuth.login(userAuthStore.email, userAuthStore.password)
		.then(response => {
			if(response.status !== 200) {
        		return response.body.error
        	} 

        	userAuthStore.setEmail(null)
        	userAuthStore.setPassword(null)
        	userAuthStore.setIsFormDisabled(false)
        	navigate('/' { replace: true })
		})
	}

	return {
		login
	}
}