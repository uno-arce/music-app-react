import React from 'react'

import useAuth from '../hooks/authHooks'
import useSpotifyAuth from '../hooks/spotifyAuthHooks'
import useSpotifyApi from '../hooks/spotifyApiHooks'
import usePopover from '../hooks/popoverHooks'
import useRating from '../hooks/ratingHooks'
import useCollection from '../hooks/collectionHooks'
import useTrack from '../hooks/trackHooks'
import useMenu from '../hooks/menuHooks'
import useAlert from '../hooks/alertHooks'

import Form from '../components/form'
import Button from '../components/button'
import Placeholder from '../components/Placeholder'
import Collection from '../components/collection'
import Popover from '../components/popover'
import Rating from '../components/rating'
import Track from '../components/track'
import Alert from '../components/alert'
import Menu from '../components/menu'

import { containerStyle, popoverStyle, ratingStyle, collectionTrackStyle, alertStyle, menuStyle, imageStyle, textStyle } from '../styles/style'

export default function Homeprofile() {
	const { logout } = useAuth()
	const { authenticate, isAuthorized, isAuthLoading } = useSpotifyAuth()
	const { isLoading, recentlyPlayedTracks, rateTrack, getTrackPreviewDetails } = useSpotifyApi()
	const { collectionItem, collectionSelectedIndex, isCollectionOpen, handleOpenCollectionView } = useCollection()
	const { handleOpenPopoverView, handleClosePopoverView, isPopoverOpen, popoverItem } = usePopover()
	const { isTrackOpen, handleOpenTrackView } = useTrack()
	const { handleCloseRating } = useRating()
	const { trackMenuList } = useMenu()
	const { alertStatus } = useAlert()

	const { flex, flexColumn } = containerStyle()
	const imageClasses = imageStyle()
	const textClasses = textStyle()
	const { popoverBackground, popoverDefault, popoverButton } = popoverStyle()
	const { ratingDefault, ratingGroup, ratingTitle, ratingSubtitle } = ratingStyle()
	const { menuCategoryName } = menuStyle()
	const { trackGroup } = collectionTrackStyle()

	const renderMenu = (category, index) => (
		<div className={menuCategoryName}>
			{category}
		</div>
	)
	
	const renderRecentlyPlayedTracks = (item, index) => (
		<div>
			<img className={imageClasses} src={item.track.album.images[0].url}/>
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

	const renderRecentlyPlayedTracksView = () => {
		const selectedTrack = recentlyPlayedTracks?.[collectionSelectedIndex] || 0 
		return(
		<>
			{selectedTrack && (
				<div className={flex}>
					<p>{collectionSelectedIndex + 1}</p>
					<p>{selectedTrack.track.name}</p>
				</div>
			)}

			<div className={trackGroup}>
				<Collection 
					items={recentlyPlayedTracks}
					isSelectable={true}
					openCollection={handleOpenCollectionView}
					isOpen={isPopoverOpen}
					renderItem={renderRecentlyPlayedTracks}
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
			</div>

			{selectedTrack && (
				<div>
					<p className={textClasses}>{selectedTrack.track.artists[0].name}</p>
					<Button
						name={'Give a rating'}
						call={() => handleOpenPopoverView(selectedTrack, true)}
					/>
					<Button
						name={'Play track preview'}
						call={() => handleOpenTrackView(selectedTrack, getTrackPreviewDetails)}
					/>
				</div>
			)}
		</>
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

			<Track/>

			<Placeholder isLoading={isLoading}>
				{renderRecentlyPlayedTracksView()}
			</Placeholder>

			<Menu 
				menuList={trackMenuList}
				renderMenu={renderMenu}
			/>

		</div>
	)
}