import { useEffect } from 'react'
import useUserAuthStore from '../stores/userAuthStore'


const useForm = () => {
	
	const validate = (inputs) => {
		// inputs.map(field => {
		// 	return field
		// })
		return
	}

	const handleFormSubmit = async (event, call) => {
		event.preventDefault()

		await call()
	}

	return {
		validate,
		handleFormSubmit
	}
}

export default useForm