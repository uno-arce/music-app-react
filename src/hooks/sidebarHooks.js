import { useSidebarData, useSidebarActions } from '../stores/componentStore'

const useSidebar = () => {
	const sidebarData = useSidebarData()
	const actionsSidebar = useSidebarActions()

	const handleOpenSidebarView = () => {
		actionsSidebar.setIsSidebarOpen(true)
	}

	const handleCloseSidebarView = () => {
		actionsSidebar.setIsSidebarOpen(false)
	}

	return {
		handleOpenSidebarView,
		handleCloseSidebarView,
		isSidebarOpen: sidebarData.isSidebarOpen
	}
}

export default useSidebar