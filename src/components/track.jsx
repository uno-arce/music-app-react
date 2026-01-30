import React from 'react'
import useTrack from '../hooks/trackHooks'

import { trackStyle  } from '../styles/style'

export default function Track({ trackName, artistName, structure }) {
	const { trackRef, trackPreviewDetails, trackDuration, trackCurrentTime, isTrackPlaying, isTrackMuted, isTrackButtonDisabled, handleTrackDuration, handleTrackCurrentTime, handleTrackTime, handleTimeSeek, togglePlayPause, toggleVolumeOnOff, handleReplay, handleVolumeChange, handleTrackEnd } = useTrack()

	const { trackControlGroup, trackInfoGroup, trackInfoName, trackInfoArtist, trackVolumeGroup } = trackStyle()

	const playButton = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
	const pauseButton = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M360-320h80v-320h-80v320Zm160 0h80v-320h-80v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
	const replayButton = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440h80q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l62 62-56 58-160-160 160-160 56 58-62 62h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Z"/></svg>
	const volumeUpButton = <svg onClick={toggleVolumeOnOff} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/></svg>
	const volumeOffButton = <svg onClick={toggleVolumeOnOff} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z"/></svg>

	return(
		<div className={structure}>
			<audio
				ref={trackRef}
				src={trackPreviewDetails?.previewUrl}
				type='audio/mpeg'
				onEnded={handleTrackEnd}
				onTimeUpdate={handleTrackCurrentTime}
				onLoadedMetadata={handleTrackDuration}
				preload='metadata'
			/>

			<div className={trackControlGroup}>
				<button
					className='button button-tertiary'
					onClick={togglePlayPause}
					disabled={isTrackButtonDisabled}
				>
					{isTrackPlaying ? pauseButton : playButton}
				</button>
				<button
					className='button button-tertiary'
					onClick={handleReplay}
				>
					{replayButton}
				</button>
			</div>

			<div className={trackInfoGroup}>
				<p className={trackInfoName}>{trackName}</p>
				<p className={trackInfoArtist}>{artistName}</p>
				<div className='flex gap-4'>
					<p>{handleTrackTime(trackCurrentTime)}</p>
					<input
						type='range'
						min='0'
						max={trackDuration || 0}
						step='0.01'
						value={trackCurrentTime || 0}
						onChange={handleTimeSeek}
						className='accent-base-light hover:accent-accent-light'
					/>
					<p>{trackPreviewDetails ? handleTrackTime(trackDuration) : ''}</p>
				</div>
			</div>

			<div className='max-sm:hidden flex gap-1 group'>
				<button
					className='button button-tertiary group-hover:text-accent-light'
				>
					{isTrackMuted ? volumeOffButton : volumeUpButton}
				</button>
				<input
					type='range'
					min='0'
					max='1'
					step='0.01'
					defaultValue='1'
					onChange={handleVolumeChange}
					className='accent-base-light group-hover:accent-accent-light'
				/>
			</div>

		</div>
	)
}