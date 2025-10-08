import { create } from 'zustand'

const useComponentStore = create((set) => ({
	// Collection
	collectionItem: null,
	collectionSelectedIndex: 0,
	isCollectionOpen: false,
	setCollectionItem: (collectionItem) => set({ collectionItem: collectionItem }),
	setCollectionSelectedIndex: (selectedIndex) => set({ collectionSelectedIndex: selectedIndex}),
	setIsCollectionOpen: (isOpen) => set({ isCollectionOpen: isOpen }),

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
	alertStatus: null,
	alertMessage: null,
	setIsAlertOpen: (isOpen) => set({ isAlertOpen: isOpen }),
	setAlertStatus: (status) => set({ alertStatus: status }),
	setAlertMessage: (alertMessage) => set({ alertMessage: alertMessage }),

	// Form
	currentFormStep: 'Username',
	setCurrentFormStep: (currentFormStep) => set({ currentFormStep: currentFormStep }),

	// Track
	trackPreviewDetails: null,
	isTrackOpen: false,
	isTrackPlaying: false,
	setTrackPreviewDetails: (preview) => set({ trackPreviewDetails: preview }),
	setIsTrackOpen: (isOpen) => set({ isTrackOpen: isOpen }),
	setIsTrackPlaying: (isTrackPlaying) => set({ isTrackPlaying: isTrackPlaying })
}))

export default useComponentStore