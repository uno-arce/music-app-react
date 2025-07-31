import instance from './instance'

const userAuth = {
	login: (email, password) => {
		return instance.post('users/login', {
			email: email,
			password: password
		}).then(response => {
			return response
		}).catch(error => {
			console.log('Login call error: ' + error)
			return error
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
			console.log('Register call error: ' + error)
			return error
		})
	},

	verify: () => {
		return instance.get('/verify')
		.then(response => {
			return response
		})
		.catch(error => {
			console.error(error)
		})
	},

	addSongRatings: (ratedSongs) => {
		return instance.post('users/rate-songs', {
			ratedSongs: ratedSongs
		}).then(response => {
			return response
		}).catch(error => {
			console.log(error)
			return error
		})
	}
}

export default userAuth