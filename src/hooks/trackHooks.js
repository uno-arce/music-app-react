import { useRef, useEffect } from 'react'
import useComponentStore from '../stores/componentStore'

const useTrack = () => {
	const trackRef = useRef(null)
	const componentStore = useComponentStore()

	const handleOpenTrackView = async (item, call) => {
		const trackDetails= {
			name: item.track.name,
			artist: item.track.artists[0].name
		}

		componentStore.setIsTrackOpen(true)

		await call(trackDetails)
	}

	const playTrack = async () => {
		if(trackRef.current) {
			await trackRef.current.play()
			componentStore.setIsTrackPlaying(true)
			componentStore.setIsTrackPaused(false)
		}
	}

	const pauseTrack = () => {
		if(trackRef.current) {
			trackRef.current.pause()
			componentStore.setIsTrackPlaying(false)
			componentStore.setIsTrackPaused(true)
		}
	}

	const removeTrackSource = () => {
		if(trackRef.current) {
			trackRef.current.pause()
			trackRef.current.load()
			componentStore.setTrackPreviewDetails(null)
			componentStore.setIsTrackPlaying(false)
			componentStore.setIsTrackPaused(false)
		}
	}

	const togglePlayPause = () => {
		if(componentStore.isTrackPlaying) {
			pauseTrack()
		} else {
			playTrack()
		}
	}

	const handleReplay = async () => {
		if(trackRef.current) {
			trackRef.current.currentTime = 0
			await trackRef.current.play()
			componentStore.setIsTrackPlaying(true)
			componentStore.setIsTrackPaused(false)
		}
	}

	const handleTrackCurrentTime = () => {
		if(trackRef.current) {
			componentStore.setTrackCurrentTime(trackRef.current.currentTime)
		}
	}

	const handleTrackDuration = () => {
		if(trackRef.current) {
			componentStore.setTrackDuration(trackRef.current.duration)
		}
	}

	const handleTrackTime = (timeInSeconds) => {
		if(componentStore.trackPreviewDetails) {
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
				const wasPlaying = componentStore.isTrackPlaying

				pauseTrack()

				trackRef.current.currentTime = newTime
				componentStore.setTrackCurrentTime(newTime)

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
			componentStore.setIsTrackMuted(false)
			
		}

		trackRef.current.muted = false
	}

	const volumeOff = () => {
		if(trackRef.current) {
			componentStore.setIsTrackMuted(true)
			
		}

		trackRef.current.muted = true
	}

	const toggleVolumeOnOff = () => {
		if(componentStore.isTrackMuted) {
			volumeOn()
		} else {
			volumeOff()
		}
	}

	const handleTrackEnd = () => {
		if(trackRef.current) {
			componentStore.setIsTrackPlaying(false)
			componentStore.setIsTrackPaused(false)
		}
	}

	useEffect(() => {
		if(componentStore.collectionSelectedIndex && componentStore.isTrackPaused && !componentStore.isTrackPlaying) {
			removeTrackSource()
		}

		if(componentStore.trackPreviewDetails && !componentStore.isTrackPlaying && !componentStore.isTrackPaused) {
			playTrack() 
		}

		if(componentStore.collectionSelectedIndex && componentStore.isTrackPlaying) {
			pauseTrack()
			removeTrackSource()
		}

		
	}, [componentStore.trackPreviewDetails, componentStore.collectionSelectedIndex])

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
		trackPreviewDetails: componentStore.trackPreviewDetails,
		isTrackOpen: componentStore.isTrackOpen,
		isTrackPlaying: componentStore.isTrackPlaying,
		isTrackMuted: componentStore.isTrackMuted,
		trackDuration: componentStore.trackDuration,
		trackCurrentTime: componentStore.trackCurrentTime
	}
}

export default useTrack