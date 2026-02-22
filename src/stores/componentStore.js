import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useComponentStore = create((set) => ({
	// Alert
	alertMessage: false,
	alertMessage: null,
	alertMessage: null,
	actionsAlert: {
		setIsAlertOpen: (isOpen) => set({ isAlertOpen: isOpen }),
		setAlertStatus: (status) => set({ alertStatus: status }),
		setAlertMessage: (alertMessage) => set({ alertMessage: alertMessage }),
	},

	// Collection
	collectionItem: null,
	collectionSelectedGroup: 1,
	collectionSelectedIndex: 0,
	isCollectionOpen: false,
	actionsCollection: {
		setCollectionItem: (collectionItem) => set({ collectionItem: collectionItem }),
		setCollectionSelectedGroup: (selectedGroup) => set({collectionSelectedGroup: selectedGroup}),
		setCollectionSelectedIndex: (selectedIndex) => set({ collectionSelectedIndex: selectedIndex}),
		setIsCollectionOpen: (isOpen) => set({ isCollectionOpen: isOpen }),
	},

	// Form
	currentFormStep: 'Username',
	actionsForm: {
		setCurrentFormStep: (currentFormStep) => set({ currentFormStep: currentFormStep }),
	},

	// Menu
	selectedMenuCategory: 'recentlyPlayed',
	selectedMenuLabel: 'Recently Played',
	actionsMenu: {
		setSelectedMenuCategory: (category) => set({ selectedMenuCategory: category }),
		setSelectedMenuLabel: (label) => set({  selectedMenuLabel: label }),
	},

	// Popover
	popoverItem: null,
	isPopoverOpen: false,
	actionsPopover: {
		setPopoverItem: (popoverItem) => set({ popoverItem: popoverItem }),
		setIsPopoverOpen: (isOpen) => set({ isPopoverOpen: isOpen }),
	},

	//Rating
	hoveredIndex: 0,
	clickedIndex: 0,
	lastClickedIndex: 0,
	actionsRating: {
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
	},

	// Sidebar
	isSidebarOpen: false,
	actionsSidebar: {
		setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
	},

	// ThemeToggle
	isDarkMode: localStorage.getItem('theme') === 'dark',
	actionsThemeToggle: {
		setIsDarkMode: (mode) => set({ isDarkMode: mode }),
	},

	// Track
	trackPreviewDetails: null,
	trackCurrentTime: 0,
	trackDuration: null,
	isTrackOpen: false,
	isTrackPlaying: false,
	isTrackPaused: false,
	isTrackMuted: false,
	actionsTrack: {
		setTrackPreviewDetails: (preview) => set({ trackPreviewDetails: preview }),
		setTrackCurrentTime: (currentTime) => set({ trackCurrentTime: currentTime }),
		setTrackDuration: (duration) => set({ trackDuration: duration }),
		setIsTrackOpen: (isOpen) => set({ isTrackOpen: isOpen }),
		setIsTrackPlaying: (isTrackPlaying) => set({ isTrackPlaying: isTrackPlaying }),
		setIsTrackPaused: (isPaused) => set({ isTrackPaused: isPaused }),
		setIsTrackMuted: (isMuted) => set({ isTrackMuted: isMuted }),
		resetTrackState: () => {
			set({
				trackPreviewDetails: null,
				trackCurrentTime: 0,
				trackDuration: null,
				isTrackPlaying: false,
				isTrackPaused: false,
				isTrackEnded: false,
				isTrackMuted: false
			})
		}
	}
}))

export default useComponentStore


// Custom Hooks utilizing useShallow to prevent unnecessary re-renders

// Alert
export const useAlertData = () => useComponentStore(useShallow((state) => {
	return {
		isAlertOpen: state.isAlertOpen,
		alertStatus: state.alertStatus,
		alertMessage: state.alertMessage
	}
}))
export const useAlertActions = () => useComponentStore((state) => state.actionsAlert)

// Collection
export const useCollectionData = () => useComponentStore(useShallow((state) => {
	return {
		collectionItem: state.collectionItem,
		collectionSelectedGroup: state.collectionSelectedGroup,
		collectionSelectedIndex: state.collectionSelectedIndex,
		isCollectionOpen: state.isCollectionOpen
	}
}))
export const useCollectionActions = () => useComponentStore((state) => state.actionsCollection)

// Form
export const useFormData = () => useComponentStore(useShallow((state) => {
	return {
		currentFormStep: state.currentFormStep
	}
}))
export const useFormActions = () => useComponentStore((state) => state.actionsForm)

// Menu 
export const useMenuData = () => useComponentStore(useShallow((state) => {
	return {
		selectedMenuCategory: state.selectedMenuCategory,
		selectedMenuLabel: state.selectedMenuLabel
	}
}))
export const useMenuActions = () => useComponentStore((state) => state.actionsMenu)

// Popover
export const usePopoverData = () => useComponentStore(useShallow((state) => {
	return {
		popoverItem: state.popoverItem,
		isPopoverOpen: state.isPopoverOpen
	}
}))
export const usePopoverActions = () => useComponentStore((state) => state.actionsPopover)

// Rating
export const useRatingData = () => useComponentStore(useShallow((state) => {
	return {
		hoveredIndex: state.hoveredIndex,
		clickedIndex: state.clickedIndex,
		lastClickedIndex: state.lastClickedIndex
	}
}))
export const useRatingActions = () => useComponentStore((state) => state.actionsRating)

// Sidebar 
export const useSidebarData = () => useComponentStore(useShallow((state) => {
	return {
		isSidebarOpen: state.isSidebarOpen
	}
}))
export const useSidebarActions = () => useComponentStore((state) => state.actionsSidebar)

// ThemeToggle
export const useThemeToggleData = () => useComponentStore(useShallow((state) => {
	return {
		isDarkMode: state.isDarkMode
	}
}))
export const useThemeToggleActions = () => useComponentStore((state) => state.actionsThemeToggle)

// Track
export const useTrackData = () => useComponentStore(useShallow((state) => {
	return {
		trackPreviewDetails: state.trackPreviewDetails,
		trackCurrentTime: state.trackCurrentTime,
		trackDuration: state.trackDuration,
		isTrackOpen: state.isTrackOpen,
		isTrackPlaying: state.isTrackPlaying,
		isTrackPaused: state.isTrackPaused,
		isTrackMuted: state.isTrackMuted
	}
}))
export const useTrackActions = () => useComponentStore((state) => state.actionsTrack)