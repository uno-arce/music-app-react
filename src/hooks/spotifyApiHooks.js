import { useEffect } from 'react'
import spotifyApi from '../services/spotifyApi'
import useSpotifyStore from '../stores/spotifyStore'
import useSpotifyAuthStore from '../store/spotifyAuthStore'

const useSpotifyApi = () => {
	const spotifyStore = useSpotifyStore()
	const spotifyAuthStore = useSpotifyAuthStore()

	useEffect(() => {
		if(spotifyAuthStore.isAuthorized) {
			spotifyStore.setIsLoading(true)

			Promise.all([
				spotifyApi.getRecentlyPlayed()
			]).then(([
				recentlyPlayedResponse
			]) => {
				spotifyStore.setRecentlyPlayedTracks(recentlyPlayedResponse.data.items)
			}).catch(error => {
				console.error('Error fetching spotify data', error)
			}).finally(() => {
				spotifyStore.setIsLoading(false)
			}) 
		}
	}, [spotifyAuthStore.isAuthorized, spotifyStore])

	console.log(spotifyStore.recentlyPlayedTracks)

	return {
		isLoading: spotifyStore.isLoading
	}
}