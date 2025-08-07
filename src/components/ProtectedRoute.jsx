import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/authHooks'

const ProtectedRoute = ({ children }) => {
	const {isLoading, isAuthenticated} = useAuth()

	if(isLoading) {
		return <div>Loading, please wait...</div>
	}

	if(!isAuthenticated) {
		return
	}

	return children
}

export default ProtectedRoute