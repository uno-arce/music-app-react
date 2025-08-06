import React from 'react'
import { Navigate } from 'react-router-dom'
import useUserAuthStore from '../stores/userAuthStore'

const PublicRoute = ({ children }) => {
	const userAuthStore = useUserAuthStore()

	if(userAuthStore.isLoading) {
		return <div>Loading, please wait...</div>
	}

	if(userAuthStore.isAuthenticated) {
		return
	}

	return children
}

export default PublicRoute