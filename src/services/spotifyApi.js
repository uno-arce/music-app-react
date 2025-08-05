import instance from './instance'

const spotifyAPI = {
	getSavedTracks: () => {
		instance.get('/saved-tracks')
		.then(response => {
			return response
		})
		.catch(error => {
			console.log(error.response.data.error)
			return error.response.data.error
		})
	},

	getUserPlaylists: () => {
		instance.get('/playlists')
		.then(response => {
			return response
		})
		.catch(error => {
			console.log(error.response.data.error)
			return error.response.data.error
		})
	},

	getRecentlyPlayed: () => {
		instance.get('/recently-played')
		.then(response => {
			return response
		})
		.catch(error => {
			console.log(error.response.data.error)
			return error.response.data.error
		})
	},

	getMostlyPlayed: () => {
		instance.get('/mostly-played')
		.then(response => {
			return response
		})
		.catch(error => {
			console.log(error.response.data.error)
			return error.response.data.error
		})
	},

	getMostlyListened: () => {
		instance.get('/mostly-listened')
		.then(response => {
			return response
		})
		.catch(error => {
			console.log(error.response.data.error)
			return error.response.data.error
		})
	}
}