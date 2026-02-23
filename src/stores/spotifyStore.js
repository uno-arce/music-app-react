import { create } from 'zustand' 
import { useShallow } from 'zustand/react/shallow'

const useSpotifyStore = create((set) => ({
	recentlyPlayedTracks: null,
	savedTracks: null,
	userPlaylists: null,
	mostlyPlayed: null,
	mostlyListened: null,
	ratedTracks: null,

	isLoading: true,

	actions: {
		setRecentlyPlayedTracks: (recent) => set({ recentlyPlayedTracks: recent }),
		setSavedTracks: (saved) => set({ savedTracks: saved }),
		setUserPlaylists: (playlist) => set({ userPlaylists: playlist }),
		setMostlyPlayed: (played) => set({ mostlyPlayed: played }),
		setMostlyListened: (listened) => set({ mostlyListened: listened }),
		setRatedTracks: (rated) => set({ ratedTracks: rated }),
		setIsLoading: (isLoading) => set({ isLoading: isLoading })
	}
}))

export default useSpotifyStore

export const useSpotifyData = () => useSpotifyStore(useShallow((state) => {
	return {
		recentlyPlayedTracks: state.recentlyPlayedTracks,
		savedTracks: state.savedTracks,
		userPlaylists: state.userPlaylists,
		mostlyPlayed: state.mostlyPlayed,
		mostlyListened: state.mostlyListened,
		ratedTracks: state.ratedTracks
	}
}))

export const useSpotifyActions = () => useSpotifyStore((state) => state.actions)