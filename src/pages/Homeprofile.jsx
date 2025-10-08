import React from 'react'

import useAuth from '../hooks/authHooks'
import useSpotifyAuth from '../hooks/spotifyAuthHooks'
import useSpotifyApi from '../hooks/spotifyApiHooks'
import usePopover from '../hooks/popoverHooks'
import useRating from '../hooks/ratingHooks'
import useCollection from '../hooks/collectionHooks'
import useTrack from '../hooks/trackHooks'
import useAlert from '../hooks/alertHooks'

import Form from '../components/form'
import Button from '../components/button'
import Placeholder from '../components/Placeholder'
import Collection from '../components/collection'
import Popover from '../components/popover'
import Rating from '../components/rating'
import Track from '../components/track'
import Alert from '../components/alert'

import { containerStyle, popoverStyle, ratingStyle, alertStyle, imageStyle, textStyle } from '../styles/style'

export default function Homeprofile() {
	const { logout } = useAuth()
	const { authenticate, isAuthorized, isAuthLoading } = useSpotifyAuth()
	const { isLoading, recentlyPlayedTracks, rateTrack, getTrackPreviewDetails } = useSpotifyApi()
	const { collectionItem, collectionSelectedIndex, isCollectionOpen, handleOpenCollectionView } = useCollection()
	const { handleOpenPopoverView, handleClosePopoverView, isPopoverOpen, popoverItem } = usePopover()
	const { trackPreviewDetails, isTrackOpen, handleOpenTrackView } = useTrack()
	const { handleCloseRating } = useRating()
	const { alertStatus } = useAlert()

	const { flex, flexColumn } = containerStyle()
	const imageClasses = imageStyle()
	const textClasses = textStyle()
	const { popoverBackground, popoverDefault, popoverButton } = popoverStyle()
	const { ratingDefault, ratingGroup, ratingTitle, ratingSubtitle } = ratingStyle()
	
	const renderRecentlyPlayedTracksView = (item, index) => (
		<div className={flex}>
			<img className={imageClasses} src={item.track.album.images[0].url}/>
			{index === collectionSelectedIndex ? 
				<div>
					<p className={textClasses}>{item.track.name}</p>
					<p className={textClasses}>{item.track.artists[0].name}</p>
					<Button
						name={'Give a rating'}
						call={() => handleOpenPopoverView(item, true)}
					/>
					<Button
						name={'Play track preview'}
						call={() => handleOpenTrackView(item, getTrackPreviewDetails)}
					/>
				</div>
			: null
			}
		</div>
	)

	const renderPopoverRatingView = (children) => (
		<div className={popoverBackground}>
			<div className={flexColumn}>
				<svg
					className={popoverButton}
					xmlns="http://www.w3.org/2000/svg" 
					height="32px" 
					viewBox="0 -960 960 960" 
					width="32px" 
					fill="currentColor"
					onClick={() => handleClosePopoverView(handleCloseRating)}
				>
					<path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/>
				</svg>
				<div className={popoverDefault}>
					{children}
				</div>
			</div>
		</div>
	)

	const renderRatingView = (item, ratingButton) => (
		<div className={flex}>
			<img className={imageClasses} src={item.track.album.images[0].url}/>
			<div className={ratingGroup}>
				<p className={ratingTitle}>Your rating to {item.track.name} by {item.track.artists[0].name}</p>
				<div className={ratingDefault}>
					{ratingButton}
				</div>
				<p className={ratingSubtitle}>Rated tracks will be saved in your favorites</p>
			</div>
		</div>
	) 

	return(
		<div>
			<Button
				name={isAuthorized ? "Connected to Spotify" : "Connect to spotify"}
				call={authenticate}
				isDisabled={isAuthorized}
			/>	
			<Button
				name={"Logout"}
				call={logout}
			/>

			<Placeholder isLoading={isLoading}>
				<Collection 
					items={recentlyPlayedTracks}
					isSelectable={true}
					openCollection={handleOpenCollectionView}
					isOpen={isPopoverOpen}
					renderItem={renderRecentlyPlayedTracksView}
				>
					<Popover 
						renderPopover={renderPopoverRatingView}
					>
						<Rating 
							item={popoverItem}
							call={rateTrack}
							renderRating={renderRatingView}
						/>
					</Popover>
					<Alert/>
				</Collection>
			</Placeholder>

			{ isTrackOpen && trackPreviewDetails ? <Track/> : null }

		</div>
	)
}