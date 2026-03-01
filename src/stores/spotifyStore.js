import { create } from 'zustand' 
import { useShallow } from 'zustand/react/shallow'

const useSpotifyStore = create((set) => ({
	recentlyPlayedTracks: null,
	savedTracks: null,
	mostlyPlayed: null,
	ratedTracks: null,

	isLoading: true,

	actions: {
		setRecentlyPlayedTracks: (recent) => set({ recentlyPlayedTracks: recent }),
		setSavedTracks: (saved) => set({ savedTracks: saved }),
		setMostlyPlayed: (played) => set({ mostlyPlayed: played }),
		setRatedTracks: (rated) => set({ ratedTracks: rated }),
		setIsLoading: (isLoading) => set({ isLoading: isLoading })
	}
}))

export default useSpotifyStore

export const useSpotifyData = () => useSpotifyStore(useShallow((state) => {
	return {
		recentlyPlayedTracks: state.recentlyPlayedTracks,
		savedTracks: state.savedTracks,
		mostlyPlayed: state.mostlyPlayed,
		ratedTracks: state.ratedTracks,

		isLoading: state.isLoading
	}
}))

export const useSpotifyActions = () => useSpotifyStore((state) => state.actions)