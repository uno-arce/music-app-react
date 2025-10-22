import { create } from 'zustand' 

const useSpotifyStore = create((set) => ({
	recentlyPlayedTracks: null,
	savedTracks: null,
	userPlaylists: null,
	mostlyPlayed: null,
	mostlyListened: null,
	ratedTracks: null,

	isLoading: true,

	setRecentlyPlayedTracks: (recent) => set({ recentlyPlayedTracks: recent }),
	setSavedTracks: (saved) => set({ savedTracks: saved }),
	setUserPlaylists: (playlist) => set({ userPlaylists: playlist }),
	setMostlyPlayed: (played) => set({ mostlyPlayed: played }),
	setMostlyListened: (listened) => set({ mostlyListened: listened }),
	setRatedTracks: (rated) => set((state) => {
		if(state.ratedTracks === null) {
			return { ratedTracks: rated }
		} else {
			return { ratedTracks: [...state.ratedTracks, rated] }
		}
	}),
	setIsLoading: (isLoading) => set({ isLoading: isLoading })
}))

export default useSpotifyStore