import { useRef, useEffect } from 'react'
import { useTrackData, useTrackActions, useCollectionData, useMenuData } from '../stores/componentStore'

const useTrack = () => {
	const trackRef = useRef(null)
	const trackData = useTrackData()
	const actionsTrack = useTrackActions()
	const collectionData = useCollectionData()
	const menuData = useMenuData()

	const handleOpenTrackView = async (item, call) => {
		const trackDetails= {
			name: item.track,
			artist: item.artist
		}

		actionsTrack.setIsTrackOpen(true)

		await call(trackDetails)
	}

	const playTrack = async () => {
		if(trackRef.current) {
			await trackRef.current.play()
			actionsTrack.setIsTrackPlaying(true)
			actionsTrack.setIsTrackPaused(false)
		}
	}

	const pauseTrack = () => {
		if(trackRef.current) {
			trackRef.current.pause()
			actionsTrack.setIsTrackPlaying(false)
			actionsTrack.setIsTrackPaused(true)
		}
	}

	const removeTrackSource = () => {
		if(trackRef.current) {
			trackRef.current.pause()
			trackRef.current.currentTime = 0
			trackRef.current.src = ''
			trackRef.current.load()
			actionsTrack.resetTrackState()
		}
	}

	const togglePlayPause = () => {
		if(trackData.isTrackPlaying) {
			pauseTrack()
		} else {
			playTrack()
		}
	}

	const handleReplay = async () => {
		if(trackRef.current) {
			trackRef.current.currentTime = 0
			await trackRef.current.play()
			actionsTrack.setIsTrackPlaying(true)
			actionsTrack.setIsTrackPaused(false)
		}
	}

	const handleTrackCurrentTime = () => {
		if(trackRef.current) {
			actionsTrack.setTrackCurrentTime(trackRef.current.currentTime)
		}
	}

	const handleTrackDuration = () => {
		if(trackRef.current) {
			actionsTrack.setTrackDuration(trackRef.current.duration)
		}
	}

	const handleTrackTime = (timeInSeconds) => {
		if(trackData.trackPreviewDetails) {
			const minutes = Math.floor(timeInSeconds / 60)
			const seconds = Math.floor(timeInSeconds % 60)

			const timeFormat = `${minutes}:${seconds < 10  ? '0' : ''}${seconds}`

			return timeFormat
		}
	}

	const handleTimeSeek = (event) => {
		if(trackRef.current) {
			const newTime = parseFloat(event.target.value)
			if(!isNaN(newTime)) {
				const wasPlaying = trackData.isTrackPlaying

				pauseTrack()

				trackRef.current.currentTime = newTime
				actionsTrack.setTrackCurrentTime(newTime)

				wasPlaying ? playTrack() : null
			}
		}
	}

	const handleVolumeChange = (event) => {
		if(trackRef.current) {
			const newVolume = parseFloat(event.target.value)
			!isNaN(newVolume) ? trackRef.current.volume = newVolume : null
		}
	}

	const volumeOn = () => {
		if(trackRef.current) {
			actionsTrack.setIsTrackMuted(false)
			
		}

		trackRef.current.muted = false
	}

	const volumeOff = () => {
		if(trackRef.current) {
			actionsTrack.setIsTrackMuted(true)
			
		}

		trackRef.current.muted = true
	}

	const toggleVolumeOnOff = () => {
		if(trackData.isTrackMuted) {
			volumeOn()
		} else {
			volumeOff()
		}
	}

	const handleTrackEnd = () => {
		if(trackRef.current) {
			trackRef.current.currentTime = 0
			trackRef.current.pause()
			actionsTrack.setTrackCurrentTime(0)
		}
	}

	const isTrackButtonDisabled = !trackData.trackPreviewDetails ? true : false

	useEffect(() => {
		if(menuData.selectedMenuCategory && trackData.isTrackPlaying || trackData.isTrackPaused) {
			removeTrackSource()
		}

		if(collectionData.collectionSelectedIndex && trackData.isTrackPlaying) {
			pauseTrack()
			removeTrackSource()
		}

		if(trackData.trackPreviewDetails && !trackData.isTrackPlaying && !trackData.isTrackPaused) {
			playTrack() 
		}

		if(collectionData.collectionSelectedIndex && trackData.isTrackPaused && !trackData.isTrackPlaying) {
			removeTrackSource()
		}

	}, [trackData.trackPreviewDetails, collectionData.collectionSelectedIndex, menuData.selectedMenuCategory])

	useEffect(() => {
		if(trackRef.current) {
			trackRef.current.addEventListener('timeupdate', handleTrackCurrentTime)
			trackRef.current.addEventListener('loadedmetadata', handleTrackDuration)
		}

		return () => {
			if(trackRef.current) {
				trackRef.current.removeEventListener('timeupdate', handleTrackCurrentTime)
				trackRef.current.removeEventListener('loadedmetadata', handleTrackDuration)
			}
		}
	}, [])

	return {
		trackRef,
		togglePlayPause,
		toggleVolumeOnOff,
		handleOpenTrackView,
		handleReplay,
		handleTrackTime,
		handleTimeSeek,
		handleVolumeChange,
		handleTrackEnd,
		isTrackButtonDisabled,
		trackPreviewDetails: trackData.trackPreviewDetails,
		isTrackOpen: trackData.isTrackOpen,
		isTrackPlaying: trackData.isTrackPlaying,
		isTrackMuted: trackData.isTrackMuted,
		trackDuration: trackData.trackDuration,
		trackCurrentTime: trackData.trackCurrentTime
	}
}

export default useTrack