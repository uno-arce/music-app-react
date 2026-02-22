import { useEffect } from 'react'
import { useSpotifyAuthData, useSpotifyAuthActions } from '../stores/spotifyAuthStore'
import { useUserAuthData } from '../stores/userAuthStore'
import spotifyApi from '../services/spotifyApi'

const useSpotifyAuth = () => {
	const spotifyAuthData = useSpotifyAuthData()
	const actionsSpotifyAuth = useSpotifyAuthActions()
	const userAuthData = useUserAuthData()

	const authenticate = () => {
		window.location.href = 'http://127.0.0.1:4000/auth/spotify/';
	}

	useEffect(() => {
		if(!spotifyAuthData.isAuthorized && userAuthData.isAuthenticated) {
			spotifyApi.verifyAuthorization()
			.then(response => {
				if(response.status !== 200) {
					return
				}

				authenticate()
				actionsSpotifyAuth.setIsAuthorized(true)
				actionsSpotifyAuth.setIsAuthLoading(false)
			}).catch(error => {
				console.log(error)
				return error
			})
		}
	}, [spotifyAuthData.isAuthorized, spotifyAuthData, userAuthData.isAuthenticated, userAuthData])

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