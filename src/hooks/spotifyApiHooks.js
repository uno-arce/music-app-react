import { useEffect } from 'react'
import spotifyApi from '../services/spotifyApi'
import useSpotifyAuth from '../hooks/spotifyAuthHooks'
import useSpotifyStore from '../stores/spotifyStore'
import useSpotifyAuthStore from '../stores/spotifyAuthStore'

const useSpotifyApi = () => {
	const spotifyStore = useSpotifyStore()
	const spotifyAuthStore = useSpotifyAuthStore()
	const { isAuthorized } = useSpotifyAuth()

	useEffect(() => {
		if(isAuthorized) {
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
	}, [isAuthorized, spotifyAuthStore.setIsAuthorized])

	console.log(spotifyStore.recentlyPlayedTracks)

	return {
		isLoading: spotifyStore.isLoading,
        recentlyPlayedTracks: spotifyStore.recentlyPlayedTracks
	}
}

export default useSpotifyApi