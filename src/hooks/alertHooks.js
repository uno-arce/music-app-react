import { useEffect } from 'react'
import { useAlertData, useAlertActions } from '../stores/componentStore'

const useAlert = () => {
	const alertData = useAlertData()
	const actionsAlert = useAlertActions()

	useEffect(() => {
		let timer

		if(alertData.isAlertOpen) {
			timer = setTimeout(() => {
				actionsAlert.setIsAlertOpen(false)
				actionsAlert.setAlertStatus(null)
			}, 5000)
		}

		return () => {
			if(timer) {
				clearTimeout(timer)
			}
		}
	}, [alertData.isAlertOpen, actionsAlert.setIsAlertOpen])

	const closeAlert = () => {
		actionsAlert.setIsAlertOpen(false)
		actionsAlert.setAlertStatus(null)
	}

	const handleAlertPath = () => {
		const alertPath = {
			success: 'M720-120H320v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h218q32 0 56 24t24 56v80q0 7-1.5 15t-4.5 15L794-168q-9 20-30 34t-44 14ZM240-640v520H80v-520h160Z',
			failed: 'M240-840h400v520L360-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 1.5-15t4.5-15l120-282q9-20 30-34t44-14Zm480 520v-520h160v520H720Z'
		}

		return alertPath[alertData.alertStatus]
	}

	return {
		closeAlert,
		handleAlertPath,
		isAlertOpen: alertData.isAlertOpen,
		alertStatus: alertData.alertStatus,
		alertMessage: alertData.alertMessage
	}
}

export default useAlert