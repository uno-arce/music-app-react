import { useEffect } from 'react'
import spotifyAuth from '../services/spotifyAuth'
import useSpotifyAuthStore from '../stores/spotifyAuthStore'

const useSpotifyAuth = () => {
	const spotifyAuthStore = useSpotifyAuthStore()

	const authenticate = () => {
		return
	}

	return{
		authenticate
	}
}