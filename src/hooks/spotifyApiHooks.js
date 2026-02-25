import { useEffect } from 'react'
import spotifyApi from '../services/spotifyApi'
import { useSpotifyData, useSpotifyActions } from '../stores/spotifyStore'
import { useSpotifyAuthData, useSpotifyAuthActions } from '../stores/spotifyAuthStore'
import { useMenuData, useCollectionData, useAlertData, useTrackActions, useAlertActions } from '../stores/componentStore'

const useSpotifyApi = () => {
	const spotifyData = useSpotifyData()
	const actionsSpotify = useSpotifyActions()
	const spotifyAuthData = useSpotifyAuthData()
	const actionsSpotifyAuth = useSpotifyAuthActions()
	const actionsTrack = useTrackActions()
	const actionsAlert = useAlertActions()
	const menuData = useMenuData()
	const collectionData = useCollectionData()
	const alertData = useAlertData()

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
		if(spotifyAuthData.isAuthorized) {
			actionsSpotify.setIsLoading(true)

			Promise.all([
				spotifyApi.getRecentlyPlayed(),
				spotifyApi.getSavedTracks(),
				spotifyApi.getUserPlaylists(),
				spotifyApi.getMostlyPlayed(),
				spotifyApi.getMostlyListened(),
				spotifyApi.getRatedTracks()
			]).then(([
				recentlyPlayedResponse,
				savedTracksResponse,
				userPlaylistsResponse,
				mostlyPlayedResponse,
				mostlyListenedResponse,
				ratedTracksResponse
			]) => {
				getUniqueItems(recentlyPlayedResponse.data, actionsSpotify.setRecentlyPlayedTracks)
				actionsSpotify.setSavedTracks(savedTracksResponse.data)
				actionsSpotify.setUserPlaylists(userPlaylistsResponse.data)
				actionsSpotify.setMostlyPlayed(mostlyPlayedResponse.data)
				actionsSpotify.setMostlyListened(mostlyListenedResponse.data)
				actionsSpotify.setRatedTracks(ratedTracksResponse.data)
			}).catch(error => {
				console.error('Error fetching spotify data', error)
			}).finally(() => {
				actionsSpotify.setIsLoading(false)
			}) 
		}
	}, [spotifyAuthData.isAuthorized, actionsSpotifyAuth.setIsAuthorized])

	const getTrackPreviewDetails = (trackItem) => {
		spotifyApi.getTrackPreviewDetails(trackItem)
		.then(response => {
			if(response.status !== 200) {
				return
			}
			actionsTrack.setTrackPreviewDetails(response.data)
		}).catch(error => {
			console.log(error)
			return
		})
	}

	const rateTrack = (ratedSong) => {
		actionsAlert.setIsAlertOpen(true)
		actionsAlert.setAlertStatus('loading')
		actionsAlert.setAlertMessage('Saving to Database')

		spotifyApi.rateTrack(ratedSong)
		.then(response => {
			actionsAlert.setIsAlertOpen(false)

			if(response.status !== 200)  {
				actionsAlert.setIsAlertOpen(true)
				actionsAlert.setAlertStatus('failed')
				return
			} else {
				actionsAlert.setIsAlertOpen(true)
				actionsAlert.setAlertStatus('success')
				actionsAlert.setAlertMessage(response.data.message)

				actionsSpotify.setRatedTracks(response.data.updatedRatedTracks)
			}
		}).catch(error => {
			actionsAlert.setIsAlertOpen(true)
			actionsAlert.setAlertStatus('failed')
			console.log(error)
		})
	}

	const spotifyCollectionItemConfig = {
		recentlyPlayed: {
			items: spotifyData.recentlyPlayedTracks || []
		},
		mostlyListened: {
			items: spotifyData.mostlyListened || []
		},
		mostlyPlayed: {
			items: spotifyData.mostlyPlayed || []
		},
		likedTracks: {
			items: spotifyData.savedTracks?.[collectionData.collectionSelectedGroup] || []
		},
		ratedTracks: {
			items: spotifyData.ratedTracks?.[collectionData.collectionSelectedGroup] || []
		},
		playlists: {
			items: spotifyData.userPlaylists || []
		}
	}

	const collectionItems = spotifyCollectionItemConfig[menuData.selectedMenuCategory].items

	return {
		isLoading: spotifyData.isLoading,
		likedTracks: spotifyData.savedTracks,
        ratedTracks: spotifyData.ratedTracks,
        spotifyCollectionItems: collectionItems,
        selectedSpotifyItem: collectionItems[collectionData.collectionSelectedIndex],
        getTrackPreviewDetails,
        rateTrack
	}
}

export default useSpotifyApi