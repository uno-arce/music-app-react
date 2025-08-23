import { create } from 'zustand'

const useTracksStore = create((set) => ({
	ratedSongs: [],
	rating: 0,

	setRatedSongs: (ratedSong) => ({ ratedSongs: ratedSongs.push({ratedSong}) }),
	setRating: (rating) =>  set({ rating: rating }),
}))

export default useTracksStore