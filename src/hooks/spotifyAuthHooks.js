import { useEffect } from 'react'
import useSpotifyAuthStore from '../stores/spotifyAuthStore'
import spotifyApi from '../services/spotifyApi'

const useSpotifyAuth = () => {
	const spotifyAuthStore = useSpotifyAuthStore()

	const authenticate = () => {
		window.location.href = 'http://127.0.0.1:4000/auth/spotify/';
	}

	const saveSpotifyTokens = () => {
		spotifyApi.saveSpotifyTokens(accessToken, refreshToken)
		.then(response => {
			if(response.status !== 200) {
				return
			}

			spotifyAuthStore.setIsAuthenticated(true)
		}).catch(error => {
			console.log(error)
			return error
		})
	}

	return{
		authenticate
	}
}

export default useSpotifyAuth