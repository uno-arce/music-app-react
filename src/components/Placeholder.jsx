import React from 'react'

export default function Placeholder({ isLoading, children }) {

	if(isLoading) {
		return <div className='flex animate-pulse'></div>
	}

	return children
}