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
			return error.response.data.error
		})
	},

	rateTrack: (ratedSong) => {
		return instance.put('users/rate-song', {
			ratedSong: ratedSong
		}).then(response => {
			return response
		}).catch(error => {
			return error.response.data.error
		})
	},
	
	verifyAuthorization: () => {
		return instance.get('auth/spotify/verify-authorization')
		.then(response => {
			return response
		}).catch(error => {
			return error.response.data.error
		})
	},

	getSavedTracks: () => {
		return instance.get('auth/spotify/saved-tracks')
		.then(response => {
			return response
		})
		.catch(error => {
			return error.response.data.error
		})
	},

	getUserPlaylists: () => {
		return instance.get('auth/spotify/playlists')
		.then(response => {
			return response
		})
		.catch(error => {
			return error.response.data.error
		})
	},

	getRecentlyPlayed: () => {
		return instance.get('auth/spotify/recently-played')
		.then(response => {
			return response
		})
		.catch(error => {
			return error.response.data.error
		})
	},

	getMostlyPlayed: () => {
		return instance.get('auth/spotify/mostly-played')
		.then(response => {
			return response
		})
		.catch(error => {
			return error.response.data.error
		})
	},

	getMostlyListened: () => {
		return instance.get('auth/spotify/mostly-listened')
		.then(response => {
			return response
		})
		.catch(error => {
			return error.response.data.error
		})
	},

	getRatedTracks: () => {
		return instance.get('users/get-rated-songs')
		.then(response => {
			return response
		}).catch(error => {
			return error.response.data.error
		})
	},

	getTrackPreviewDetails: (trackDetails) => {
		return instance.post('auth/spotify/track-preview-details', {
			trackDetails: trackDetails
		}).then(response => {
			return response
		})
		.catch(error => {
			return error.response.data.error
		})

	}
}

export default spotifyApi