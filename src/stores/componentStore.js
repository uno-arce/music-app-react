import { create } from 'zustand'

const useComponentStore = create((set) => ({
	// Popover
	popoverItem: null,
	isPopoverOpen: false,
	setPopoverItem: (popoverItem) => set({ popoverItem: popoverItem }),
	setIsPopoverOpen: (isOpen) => set({ isPopOverOpen: isOpen })
}))

export default useComponentStore