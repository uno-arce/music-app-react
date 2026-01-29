import useComponentStore from '../stores/componentStore'

const useSidebar = () => {
	const componentStore = useComponentStore()

	const handleOpenSidebarView = () => {
		componentStore.setIsSidebarOpen(true)
	}

	const handleCloseSidebarView = () => {
		componentStore.setIsSidebarOpen(false)
	}

	return {
		handleOpenSidebarView,
		handleCloseSidebarView,
		isSidebarOpen: componentStore.isSidebarOpen
	}
}

export default useSidebar