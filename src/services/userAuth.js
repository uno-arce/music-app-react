import instance from './instance'

const userAuth = {
	login: (email, password) => {
		return instance.post('users/login', {
			email: email,
			password: password
		}).then(response => {
			return response
		}).catch(error => {
			console.error(error)
			return error.response.data.error
		})
	},

	register: (username, email, password) => {
		return instance.post('users/register', {
			username: username,
			email: email,
			password: password
		}).then(response => {
			return response
		}).catch(error => {
			return error.response.data.error
		})
	},

	verify: () => {
		return instance.get('users/verify')
		.then(response => {
			console.log(response.data.message)
			return response
		})
		.catch(error => {
			console.log(error)
			return error
		})
	},

	logout: () => {
		return instance.post('users/logout')
		.then(response => {
			console.log(response)
			return response
		})
		.catch(error => {
			console.log(error)
			return error
		})
	},

	addSongRatings: (ratedSongs) => {
		return instance.post('users/rate-songs', {
			ratedSongs: ratedSongs
		}).then(response => {
			return response
		}).catch(error => {
			return error.response.data.error
		})
	}
}

export default userAuth