import react from 'react'
import useUserAuthStore from '../stores/userAuthStore'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
	const userAuthStore = useUserAuthStore()

	if(userAuthStore.isLoading) {
		return <div>Loading, please wait...</div>
	}

	if(!userAuthStore.isAuthenticated) {
		return <Navigate to='login' replace />
	}

	return children
}

export default ProtectedRoute