import instance from './instance'

const spotifyAuth = {
	requestAuthorization: () => {
		instance.get('auth/spotify/')
		.then(response => {
			return response
		})
		.catch(error) {
			console.log(error)
			return error
		}
	},

	getAccessToken: () => {
		instance.get('auth/spotify/callback')
		.then(response  => {
			return response
		})
		.catch(error) {
			console.log(error)
			return error
		}
	},

	getRefreshToken: () => {
		instance.get('auth/spotify/refresh-token')
		.then(response => {
			return response
		})
		.catch(error) {
			console.log(error)
			return error
		}
	}
}