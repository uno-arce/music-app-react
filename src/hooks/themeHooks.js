import { useEffect } from 'react'
import useComponentStore from '../stores/componentStore'

const useTheme = () => {
	const componentStore = useComponentStore()

	useEffect(() => {
		const root = window.document.documentElement

		if(componentStore.isDarkMode) {
			root.classList.add('dark')
		} else {
			root.classList.remove('dark')
		}
	}, [componentStore.isDarkMode])

	const handleLightTheme = () => {
		componentStore.setIsDarkMode(false)
		localStorage.setItem('theme', 'light')
	}

	const handleDarkTheme = () => {
		componentStore.setIsDarkMode(true)
		localStorage.setItem('theme', 'dark')
	}

	return {
		isDarkMode: componentStore.isDarkMode,
		handleLightTheme,
		handleDarkTheme
	}
}

export default useTheme