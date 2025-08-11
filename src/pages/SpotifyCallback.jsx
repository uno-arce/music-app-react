import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useSpotifyAuth from '../hooks/spotifyAuthHooks'

export default function SpotifyCallback() {
	const navigate = useNavigate()
	const { saveSpotifyTokens } = useSpotifyAuth()

	useEffect(() => {
		const params = new URLSearchParams(window.location.hash.slice(1))
		const accessToken = params.get('access_token')
		const refreshToken = params.get('refresh_token')
		const expiresIn = params.get('expires_in')
		const error = params.get('error')

		const handleTokens = async () => {
			if(accessToken && refreshToken && expiresIn) {
				await saveSpotifyTokens(accessToken, refreshToken, expiresIn)
				navigate('/homeprofile')
			}
		}

		if(accessToken && refreshToken && expiresIn) {
			handleTokens()
		} 

		if(error) {
			console.log('Spotify authorization error', error)
			navigate('/homeprofile')
		}

	}, [navigate, saveSpotifyTokens])

	return <div>Loading, please wait ...</div>
}