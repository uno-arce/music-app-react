import instance from './instance'

const userAuth = {
	login: (email, password) => {
		return instance.post('users/login', {
			email: email,
			password: password
		}).then(response => {
			return response
		}).catch(error => {
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
			return response
		})
		.catch(error => {
			return error.response.data.error
		})
	},

	logout: () => {
		return instance.post('users/logout')
		.then(response => {
			return response
		})
		.catch(error => {
			return error.response.data.error
		})
	},

	checkEmailAvailability: (email) => {
		return instance.post('users/check-email-availability', {
			email: email
		})
		.then(response => {
			return response
		})
		.catch(error => {
			return error.response.data.error
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