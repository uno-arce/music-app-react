import { useEffect } from 'react'
import spotifyApi from '../services/spotifyApi'
import useSpotifyAuth from '../hooks/spotifyAuthHooks'
import useSpotifyStore from '../stores/spotifyStore'
import useSpotifyAuthStore from '../stores/spotifyAuthStore'
import useComponentStore from '../stores/componentStore'

const useSpotifyApi = () => {
	const spotifyStore = useSpotifyStore()
	const spotifyAuthStore = useSpotifyAuthStore()
	const componentStore = useComponentStore()
	const { isAuthorized } = useSpotifyAuth()

	// Get unique items and populate respective store
	const getUniqueItems = (items, populateStore) => {
		const seenIds = new Set()
		const uniqueItems = items.filter(item => {
			const isDuplicate = seenIds.has(item.track.id)
			seenIds.add(item.track.id)
			return !isDuplicate
		})

		return populateStore(uniqueItems)
	}

	useEffect(() => {
		if(isAuthorized) {
			spotifyStore.setIsLoading(true)

			Promise.all([
				spotifyApi.getRecentlyPlayed(),
				spotifyApi.getSavedTracks(),
				spotifyApi.getUserPlaylists(),
				spotifyApi.getMostlyPlayed(),
				spotifyApi.getMostlyListened()
			]).then(([
				recentlyPlayedResponse,
				savedTracksResponse,
				userPlaylistsResponse,
				mostlyPlayedResponse,
				mostlyListenedResponse
			]) => {
				getUniqueItems(recentlyPlayedResponse.data.items, spotifyStore.setRecentlyPlayedTracks)
				spotifyStore.setSavedTracks(savedTracksResponse.data.items)
				spotifyStore.setUserPlaylists(userPlaylistsResponse.data.items)
				spotifyStore.setMostlyPlayed(mostlyPlayedResponse.data.items)
				spotifyStore.setMostlyListened(mostlyListenedResponse.data.items)
			}).catch(error => {
				console.error('Error fetching spotify data', error)
			}).finally(() => {
				spotifyStore.setIsLoading(false)
			}) 
		}
	}, [isAuthorized, spotifyAuthStore.setIsAuthorized])

	console.log(spotifyStore.recentlyPlayedTracks)
	console.log(spotifyStore.savedTracks)
	console.log(spotifyStore.userPlaylists)
	console.log(spotifyStore.mostlyPlayed)
	console.log(spotifyStore.mostlyListened)

	const rateTrack = () => {
		spotifyApi.rateTrack(componentStore.popoverItem)
		.then(response => {
			if(response.status !== 200)  {
				return
			}

			componentStore.setPopoverItem(null)
		}).catch(error => {
			console.log(error)
		})
	}

	return {
		isLoading: spotifyStore.isLoading,
        recentlyPlayedTracks: spotifyStore.recentlyPlayedTracks,
        rateTrack
	}
}

export default useSpotifyApi