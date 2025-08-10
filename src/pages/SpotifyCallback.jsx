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
		const error = params.get('error')

		if(accessToken && refreshToken) {
			saveSpotifyTokens(accessToken, refreshToken)
			navigate('/homeprofile')
		} 

		if(error) {
			console.log('Spotify authorization error', error)
			navigate('/homeprofile')
		}

	}, [navigate, saveSpotifyTokens])

	return <div>Loading, please wait ...</div>
}