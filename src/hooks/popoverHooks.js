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

	const handleClosePopoverView = () => {
		componentStore.setPopoverItem(null)
		componentStore.setIsPopoverOpen(false)
	}

	return {
		handleOpenPopoverView,
		handleClosePopoverView,
		popoverItem: componentStore.popoverItem,
		isPopoverOpen: componentStore.isPopoverOpen
	}
}

export default usePopover