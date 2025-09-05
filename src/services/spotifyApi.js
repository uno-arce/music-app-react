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

	rateTrack: (track) => {
		return instance.put('auth/spotify/rate-track', {
			track: track
		}).then(response => {
			return response
		}).catch(error => {
			console.log(error.response.data.error)
			return error.response.data.error
		})
	},
	
	verifyAuthorization: () => {
		return instance.get('auth/spotify/verify-authorization')
		.then(response => {
			console.log(response.data.message)
			return response
		}).catch(error => {
			console.log(error.response.data.error)
			return error.response.data.error
		})
	},

	getSavedTracks: () => {
		return instance.get('auth/spotify/saved-tracks')
		.then(response => {
			return response
		})
		.catch(error => {
			console.log(error.response.data.error)
			return error.response.data.error
		})
	},

	getUserPlaylists: () => {
		return instance.get('auth/spotify/playlists')
		.then(response => {
			return response
		})
		.catch(error => {
			console.log(error.response.data.error)
			return error.response.data.error
		})
	},

	getRecentlyPlayed: () => {
		return instance.get('auth/spotify/recently-played')
		.then(response => {
			return response
		})
		.catch(error => {
			console.log(error.response.data.error)
			return error.response.data.error
		})
	},

	getMostlyPlayed: () => {
		return instance.get('auth/spotify/mostly-played')
		.then(response => {
			return response
		})
		.catch(error => {
			console.log(error.response.data.error)
			return error.response.data.error
		})
	},

	getMostlyListened: () => {
		return instance.get('auth/spotify/mostly-listened')
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