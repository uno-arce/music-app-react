import instance from './instance'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'
import useUserAuthStore from '../stores/userAuthStore'

let navigate = useNavigate()
const userAuthStore = useUserAuthStore()

const userAuth = {
	login: (email, password) => {
		instance.post('/login', {
			email: email,
			password: password
		}).then(response => {
			if(!response.status) {
				return response.body.message
			} else {
				userAuthStore.setEmail(null)
				userAuthStore.setPassword(null)
				useNavigate('/')
			}
		}).catch(error => {
			console.log('Login call error: ' + error)
			return error
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
			return error
		})
	},

	addSongRatings: (ratedSongs) => {
		instance.post('/rate-songs', {
			ratedSongs: ratedSongs
		}).then(response => {
			return response.status
		}).catch(error => {
			console.log(error)
			return error
		})
	}
}

export default userAuth