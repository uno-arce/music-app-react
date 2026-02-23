import { useEffect } from 'react'
import { useSpotifyAuthData, useSpotifyAuthActions } from '../stores/spotifyAuthStore'
import spotifyApi from '../services/spotifyApi'

const useSpotifyAuth = () => {
	const spotifyAuthData = useSpotifyAuthData()
	const actionsSpotifyAuth = useSpotifyAuthActions()

	const authenticate = () => {
		window.location.href = 'http://127.0.0.1:4000/auth/spotify/';
	}

	useEffect(() => {
		if(!spotifyAuthData.isAuthorized) {
			spotifyApi.verifyAuthorization()
			.then(response => {
				if(response.status !== 200) {
					authenticate()
				}

				actionsSpotifyAuth.setIsAuthorized(true)
			}).catch(error => {
				console.log(error)
				return error
			})
		}
	}, [spotifyAuthData.isAuthorized, actionsSpotifyAuth.setIsAuthorized])

	const saveSpotifyTokens = (accessToken, refreshToken, expiresIn) => {
		spotifyApi.saveSpotifyTokens(accessToken, refreshToken, expiresIn)
		.then(response => {
			if(response.status !== 200) {
				return
			}

			actionsSpotifyAuth.setIsAuthorized(true)
		}).catch(error => {
			console.log(error)
			return error
		})
	}

	return{
		authenticate,
		saveSpotifyTokens,
		isAuthorized: spotifyAuthData.isAuthorized,
		isAuthLoading: spotifyAuthData.isAuthLoading
	}
}

export default useSpotifyAuth