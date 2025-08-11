import instance from './instance'

const spotifyApi = {
	saveSpotifyTokens: (accessToken, refreshToken, expiresIn) => {
		return instance.post('auth/spotify/save-tokens', {
			accessToken: accessToken,
			refreshToken: refreshToken,
			expiresIn: expiresIn
		}).then(response => {
			return response
		}).catch(error => {
			console.log(error.response.data.error)
			return error.response.data.error
		})
	},
	getSavedTracks: () => {
		return instance.get('/saved-tracks')
		.then(response => {
			return response
		})
		.catch(error => {
			console.log(error.response.data.error)
			return error.response.data.error
		})
	},

	getUserPlaylists: () => {
		return instance.get('/playlists')
		.then(response => {
			return response
		})
		.catch(error => {
			console.log(error.response.data.error)
			return error.response.data.error
		})
	},

	getRecentlyPlayed: () => {
		return instance.get('/recently-played')
		.then(response => {
			return response
		})
		.catch(error => {
			console.log(error.response.data.error)
			return error.response.data.error
		})
	},

	getMostlyPlayed: () => {
		return instance.get('/mostly-played')
		.then(response => {
			return response
		})
		.catch(error => {
			console.log(error.response.data.error)
			return error.response.data.error
		})
	},

	getMostlyListened: () => {
		return instance.get('/mostly-listened')
		.then(response => {
			return response
		})
		.catch(error => {
			console.log(error.response.data.error)
			return error.response.data.error
		})
	}
}

export default spotifyApi