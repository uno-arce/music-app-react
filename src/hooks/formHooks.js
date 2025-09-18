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
	
	const validateMixedCharacters = (input) => {
		const hasLetter =  /[a-zA-Z]/.test(input)
		const hasNumber = /[0-9]/.test(input)
		const hasSymbol = /[^a-zA-Z0-9]/.test(input)
		const isNotOnlyNumbers = !/^[0-9]+$/.test(input)
		const isNotOnlySymbols = !/^[^a-zA-Z0-9]+$/.test(input)

		return (hasLetter || hasNumber || hasSymbol) && isNotOnlyNumbers &&  isNotOnlySymbols
	}

	const validateEmailFormat = (input) => {
		const isEmailLikeFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)

		return isEmailLikeFormat
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
		validateMixedCharacters,
		validateEmailFormat,
		handleFormSubmit
	}
}

export default useForm