import instance from './instance'

const userAuth = {
	login: (email, password) => {
		instance.post('/login', {
			email: email,
			password: password
		}).then(response => {
			// save token and user data to user zustand store
		}).catch(error => {
			console.log('Login call error: ' + error)
		})
	},

	register: (username, email, password) => {
		instance.post('/register', {
			username: username,
			email: email,
			password: password
		}).then(response => {
			return response.status
		}).catch(error => {
			console.log('Register call error: ' + error)
		})
	}
}

export default userAuth