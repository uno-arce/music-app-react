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
			const isDuplicate = seenIds.has(item.id)
			seenIds.add(item.id)
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
				getUniqueItems(recentlyPlayedResponse.data, spotifyStore.setRecentlyPlayedTracks)
				spotifyStore.setSavedTracks(savedTracksResponse.data)
				spotifyStore.setUserPlaylists(userPlaylistsResponse.data)
				spotifyStore.setMostlyPlayed(mostlyPlayedResponse.data)
				spotifyStore.setMostlyListened(mostlyListenedResponse.data)
			}).catch(error => {
				console.error('Error fetching spotify data', error)
			}).finally(() => {
				spotifyStore.setIsLoading(false)
			}) 
		}
	}, [isAuthorized, spotifyAuthStore.setIsAuthorized])

	const getTrackPreviewDetails = (trackItem) => {
		spotifyApi.getTrackPreviewDetails(trackItem)
		.then(response => {
			if(response.status !== 200) {
				return
			}
			componentStore.setTrackPreviewDetails(response.data)
		}).catch(error => {
			console.log(error)
			return
		})
	}

	const rateTrack = (ratedSong) => {
		spotifyApi.rateTrack(ratedSong)
		.then(response => {
			if(response.status !== 200)  {
				componentStore.setIsAlertOpen(true)
				componentStore.setAlertStatus('failed')
				return
			}

			componentStore.setIsAlertOpen(true)
			componentStore.setAlertStatus('success')
			componentStore.setAlertMessage(response.data.message)
		}).catch(error => {
			componentStore.setIsAlertOpen(true)
			componentStore.setAlertStatus('failed')
			console.log(error)
		})
	}

	const spotifyCollectionItemConfig = {
		recentlyPlayed: {
			items: spotifyStore.recentlyPlayedTracks || []
		},
		mostlyListened: {
			items: spotifyStore.mostlyListened || []
		},
		mostlyPlayed: {
			items: spotifyStore.mostlyPlayed || []
		},
		likedTracks: {
			items: spotifyStore.savedTracks || []
		},
		ratedTracks: {
			items: spotifyStore.savedTracks || []
		},
		playlists: {
			items: spotifyStore.userPlaylists || []
		}
	}

	const collectionItems = spotifyCollectionItemConfig[componentStore.selectedMenuCategory].items

	return {
		isLoading: spotifyStore.isLoading,
        recentlyPlayedTracks: spotifyStore.recentlyPlayedTracks,
        spotifyCollectionItems: collectionItems,
        selectedSpotifyItem: collectionItems[componentStore.collectionSelectedIndex],
        getTrackPreviewDetails,
        rateTrack
	}
}

export default useSpotifyApi