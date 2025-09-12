import React from 'react'
import useAlert from '../hooks/alertHooks'

export default function Alert({ renderAlert }) {
	const { isAlertOpen } = useAlert()

	return(
		<>
			{isAlertOpen && renderAlert()}
		</>
	)
}