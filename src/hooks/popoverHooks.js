import useComponentStore from '../stores/componentStore'

const usePopover = () => {
	const componentStore = useComponentStore()

	const handleOpenPopoverView = (item, isSelectable) => {
		if(!isSelectable)  {
			return
		}

		componentStore.setPopoverItem(item)
		componentStore.setIsPopoverOpen(true)
	}

	const handleClosePopoverView = (resetChildrenState) => {
		componentStore.setPopoverItem(null)
		componentStore.setIsPopoverOpen(false)

		resetChildrenState()
	}

	return {
		handleOpenPopoverView,
		handleClosePopoverView,
		popoverItem: componentStore.popoverItem,
		isPopoverOpen: componentStore.isPopoverOpen
	}
}

export default usePopover