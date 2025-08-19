import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/authHooks'

const PublicRoute = ({ children }) => {
	const {isLoading, isAuthenticated} = useAuth()

	if(isLoading) {
		return <div className='flex animate-pulse'></div>
	}

	if(isAuthenticated) {
		return <Navigate to='/homeprofile' replace/>
	}

	return children
}

export default PublicRoute