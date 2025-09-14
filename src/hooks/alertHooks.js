import { useEffect } from 'react'
import useComponentStore from '../stores/componentStore'

const useAlert = () => {
	const componentStore = useComponentStore()

	useEffect(() => {
		let timer

		if(componentStore.isAlertOpen) {
			timer = setTimeout(() => {
				componentStore.setIsAlertOpen(false)
				componentStore.setAlertStatus(null)
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
		componentStore.setAlertStatus(null)
	}

	const handleAlertPath = (paths) => {
		return paths[componentStore.alertStatus]
	}

	return {
		closeAlert,
		handleAlertPath,
		isAlertOpen: componentStore.isAlertOpen,
		alertStatus: componentStore.alertStatus
	}
}

export default useAlert