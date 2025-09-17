import { useEffect } from 'react'


const useForm = () => {

	const validateTextLength = (input, min, max) => {
		if(input.length >= min && input.length <= max) {
			return true
		}

		return false
	}

	const validateTextCase = (input) => {

		return
	}
	
	const validateTextCharacters = (input) => {
		
		return
	}

	const validateUniqueness = async (input, call) => {

		return
	}

	const handleFormSubmit = async (event, call) => {
		event.preventDefault()

		await call()
	}

	return {
		validateTextLength,
		handleFormSubmit
	}
}

export default useForm