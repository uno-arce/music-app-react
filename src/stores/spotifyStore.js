import { create } from 'zustand' 

const useSpotifyStore = create((set) => ({
	selectedItems: [],
	recentlyPlayedTracks: null,
	isLoading: true,

	setSelectedItems: (item) => set({ selectedItems: selectedItems.push(item) }),
	setRecentlyPlayedTracks: (recents) => set({ recentlyPlayedTracks: recents }),
	setIsLoading: (isLoading) => set({ isLoading: isLoading })
}))

export default useSpotifyStore