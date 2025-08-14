import { useEffect } from 'react'
import useSpotifyAuthStore from '../stores/spotifyAuthStore'
import spotifyApi from '../services/spotifyApi'

const useSpotifyAuth = () => {
	const spotifyAuthStore = useSpotifyAuthStore()

	useEffect(() => {
		if(!spotifyAuthStore.isAuthorized) {
			spotifyApi.verifyAuthorization()
			.then(response => {
				if(response.status !== 200) {
					return
				}

				spotifyAuthStore.setIsAuthorized(true)
			}).catch(error => {
				console.log(error)
				return error
			})
		}
	}, [spotifyAuthStore.isAuthorized, spotifyAuthStore])

	console.log(spotifyAuthStore.isAuthorized)

	const authenticate = () => {
		window.location.href = 'http://127.0.0.1:4000/auth/spotify/';
	}

	const saveSpotifyTokens = (accessToken, refreshToken, expiresIn) => {
		spotifyApi.saveSpotifyTokens(accessToken, refreshToken, expiresIn)
		.then(response => {
			if(response.status !== 200) {
				return
			}

			spotifyAuthStore.setIsAuthorized(true)
		}).catch(error => {
			console.log(error)
			return error
		})
	}

	return{
		authenticate,
		saveSpotifyTokens,
		isAuthorized: spotifyAuthStore.isAuthorized
	}
}

export default useSpotifyAuth