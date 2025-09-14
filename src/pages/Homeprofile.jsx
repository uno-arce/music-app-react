import React from 'react'
import useTracksStore from '../stores/tracksStore'

import useAuth from '../hooks/authHooks'
import useSpotifyAuth from '../hooks/spotifyAuthHooks'
import useSpotifyApi from '../hooks/spotifyApiHooks'
import usePopover from '../hooks/popoverHooks'
import useRating from '../hooks/ratingHooks'
import useAlert from '../hooks/alertHooks'

import Form from '../components/form'
import Button from '../components/button'
import Placeholder from '../components/Placeholder'
import Collection from '../components/collection'
import Popover from '../components/popover'
import Rating from '../components/rating'
import Alert from '../components/alert'

import { containerStyle, popoverStyle, ratingStyle, alertStyle, imageStyle, textStyle } from '../styles/style'

export default function Homeprofile() {
	const { logout } = useAuth()
	const { authenticate, isAuthorized, isAuthLoading } = useSpotifyAuth()
	const { isLoading, recentlyPlayedTracks, rateTrack } = useSpotifyApi()
	const { handleOpenPopoverView, handleClosePopoverView, isPopoverOpen, popoverItem } = usePopover()
	const { handleCloseRating } = useRating()
	const { alertStatus, handleAlertPath } = useAlert()

	const { flex, flexColumn } = containerStyle()
	const imageClasses = imageStyle()
	const textClasses = textStyle()
	const { popoverBackground, popoverDefault, popoverButton } = popoverStyle()
	const { ratingDefault, ratingGroup, ratingTitle, ratingSubtitle } = ratingStyle()
	const { alertPosition, alertGroup, alertIcon, alertDescription } = alertStyle(alertStatus)

	const renderRecentlyPlayedTracksView = (item, index) => (
		<div className={flex} >
			<img className={imageClasses} src={item.track.album.images[0].url}/>
			<div>
				<p className={textClasses}>{item.track.name}</p>
				<p className={textClasses}>{item.track.artists[0].name}</p>
			</div>
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

	const renderRatingAlertView = () => {
		const alertPath = {
			success: 'M720-120H320v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h218q32 0 56 24t24 56v80q0 7-1.5 15t-4.5 15L794-168q-9 20-30 34t-44 14ZM240-640v520H80v-520h160Z',
			failed: 'M240-840h400v520L360-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 1.5-15t4.5-15l120-282q9-20 30-34t44-14Zm480 520v-520h160v520H720Z'
		}

		return(
			<div className={alertPosition}>
				<div className={alertGroup}>
					<svg 
						className={alertIcon}
						xmlns="http://www.w3.org/2000/svg" 
						height="24px" 
						viewBox="0 -960 960 960" 
						width="24px" 
						fill="currentColor">
						<path d={handleAlertPath(alertPath)}/>
					</svg>
					<p className={alertDescription}>{alertStatus === 'success' ? 'Song and rating updated in your favorites' : 'Something went wrong. Try again.'}</p>
				</div>
			</div>
		)
	}

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
					openCollection={handleOpenPopoverView}
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
					<Alert renderAlert={renderRatingAlertView}/>
				</Collection>
			</Placeholder>

		</div>
	)
}