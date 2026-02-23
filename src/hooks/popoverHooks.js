import { usePopoverData, usePopoverActions } from '../stores/componentStore'

const usePopover = () => {
	const popoverData = usePopoverData()
	const actionsPopover = usePopoverActions()

	const handleOpenPopoverView = (item, isSelectable) => {
		if(!isSelectable)  {
			return
		}

		actionsPopover.setPopoverItem(item)
		actionsPopover.setIsPopoverOpen(true)
	}

	const handleClosePopoverView = (resetChildrenState) => {
		actionsPopover.setPopoverItem(null)
		actionsPopover.setIsPopoverOpen(false)

		resetChildrenState()
	}

	return {
		handleOpenPopoverView,
		handleClosePopoverView,
		popoverItem: popoverData.popoverItem,
		isPopoverOpen: popoverData.isPopoverOpen
	}
}

export default usePopover