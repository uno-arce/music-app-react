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

	return {
		handleOpenPopoverView,
		popoverItem: componentStore.popoverItem,
		isPopoverOpen: componentStore.isPopoverOpen
	}
}

export default usePopover