import { create } from 'zustand'

const tracksStore = create((set) => ({
	ratedSongs: [],

	setRatedSongs: (ratedSong) => ({ ratedSongs: ratedSongs.push({ratedSong}) })
}))