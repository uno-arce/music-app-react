import { create } from 'zustand'

const useTracksStore = create((set) => ({
	ratedSongs: [],

	setRatedSongs: (ratedSong) => ({ ratedSongs: ratedSongs.push({ratedSong}) })
}))

export default useTracksStore