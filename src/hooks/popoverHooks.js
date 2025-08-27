import useComponentStore from '../stores/componentStore'

const usePopover = () => {
	const componentStore = useComponentStore()

	const handleOpenPopoverView = (item) => {
		componentStore.setPopoverItem(item)
		componentStore.setIsPopoverOpen(true)
	}

	return {
		handleOpenPopoverView,
		isPopoverOpen: componentStore.isPopoverOpen
	}
}

export default usePopover