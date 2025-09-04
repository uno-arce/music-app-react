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
	setHoveredIndex: (hoveredIndex) => set({ hoveredIndex: hoveredIndex }),
	setClickedIndex: (clickedIndex) => set({ clickedIndex: clickedIndex })
}))

export default useComponentStore