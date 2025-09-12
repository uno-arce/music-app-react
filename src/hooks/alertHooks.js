import { useEffect } from 'react'
import useComponentStore from '../stores/componentStore'

const useAlert = () => {
	const componentStore = useComponentStore()

	useEffect(() => {
		let timer

		if(componentStore.isAlertOpen) {
			timer = setTimeout(() => {
				componentStore.setIsAlertOpen(false)
			}, 5000)
		}

		return () => {
			if(timer) {
				clearTimeout(timer)
			}
		}
	}, [componentStore.isAlertOpen, componentStore.setIsAlertOpen])

	const closeAlert = () => {
		componentStore.setIsAlertOpen(false)
	}

	return {
		closeAlert,
		isAlertOpen: componentStore.isAlertOpen
	}
}

export default useAlert