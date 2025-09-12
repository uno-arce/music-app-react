import { create } from 'zustand'

const useComponentStore = create((set) => ({
	// Popover
	popoverItem: null,
	isPopoverOpen: false,
	setPopoverItem: (popoverItem) => set({ popoverItem: popoverItem }),
	setIsPopoverOpen: (isOpen) => set({ isPopoverOpen: isOpen }),

	//Rating
	hoveredIndex: 0,
	clickedIndex: 0,
	lastClickedIndex: 0,
	setHoveredIndex: (hoveredIndex) => set({ hoveredIndex: hoveredIndex }),
	setClickedIndex: (clickedIndex) => set({ clickedIndex: clickedIndex }),
	setLastClickedIndex: (lastClickedIndex) => set({ lastClickedIndex: lastClickedIndex }),
	resetRatingState: () => {
		set({
			hoveredIndex: -1,
			clickedIndex: -1,
			lastClickedIndex: -1
		})
	},

	// Alert
	isAlertOpen: false,
	setIsAlertOpen: (isOpen) => set({ isAlertOpen: isOpen })
}))

export default useComponentStore