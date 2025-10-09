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
		componentStore.setTrackPreviewDetails(null)
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
		}
	}

	const handleVolumeChange = (event) => {
		if(trackRef.current) {
			const newVolume = parseFloat(event.target.value)
			!isNaN(newVolume) ? trackRef.current.volume = newVolume : null
		}

		console.log(trackRef.current.volume)
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
		}
	}

	useEffect(() => {
		if(componentStore.trackPreviewDetails && !componentStore.isTrackPlaying) {
			// componentStore.collectionSelectedIndex ? removeTrackSource() : null
			playTrack() 
		}

		if(componentStore.collectionSelectedIndex && componentStore.isTrackPlaying) {
			pauseTrack()
			removeTrackSource()
		}
	}, [componentStore.trackPreviewDetails, componentStore.collectionSelectedIndex])

	return {
		trackRef,
		togglePlayPause,
		toggleVolumeOnOff,
		handleOpenTrackView,
		handleReplay,
		handleVolumeChange,
		handleTrackEnd,
		trackPreviewDetails: componentStore.trackPreviewDetails,
		isTrackOpen: componentStore.isTrackOpen,
		isTrackPlaying: componentStore.isTrackPlaying,
		isTrackMuted: componentStore.isTrackMuted
	}
}

export default useTrack