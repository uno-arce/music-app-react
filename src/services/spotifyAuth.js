import instance from './instance'

const spotifyAuth = {
	requestAuthorization: () => {
		instance.get('/')
		.then(response => {
			return response
		})
		.catch(error) {
			console.log(error)
			return error
		}
	},

	getAccessToken: () => {
		instance.get('/callback')
		.then(response  => {
			return response
		})
		.catch(error) {
			console.log(error)
			return error
		}
	},

	getRefreshToken: () => {
		instance.get('/refresh-token')
		.then(response => {
			return response
		})
		.catch(error) {
			console.log(error)
			return error
		}
	}
}