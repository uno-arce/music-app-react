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
		}
	}

	const pauseTrack = () => {
		if(trackRef.current) {
			trackRef.current.pause()
			componentStore.setIsTrackPlaying(false)
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
		}
	}

	const handleVolumeChange = (event) => {
		if(trackRef.current) {
			trackRef.current.volume = event.target.volume
		}
	}

	useEffect(() => {
		if(componentStore.trackPreviewDetails && !componentStore.isTrackPlaying) {

			playTrack()
		}

		if(componentStore.collectionSelectedIndex && componentStore.isTrackPlaying) {
			pauseTrack()
		}
	}, [componentStore.trackPreviewDetails, componentStore.collectionSelectedIndex])

	return {
		trackRef,
		togglePlayPause,
		handleOpenTrackView,
		handleReplay,
		handleVolumeChange,
		trackPreviewDetails: componentStore.trackPreviewDetails,
		isTrackOpen: componentStore.isTrackOpen,
		isTrackPlaying: componentStore.isTrackPlaying
	}
}

export default useTrack