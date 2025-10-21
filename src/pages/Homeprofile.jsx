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
	const { isLoading, spotifyCollectionItems, selectedSpotifyItem, rateTrack, getTrackPreviewDetails } = useSpotifyApi()
	const { collectionItem, collectionSelectedIndex, isCollectionOpen, handleOpenCollectionView } = useCollection()
	const { handleOpenPopoverView, handleClosePopoverView, isPopoverOpen, popoverItem } = usePopover()
	const { isTrackOpen, handleOpenTrackView } = useTrack()
	const { handleCloseRating } = useRating()
	const { trackMenuList, selectedMenuCategory } = useMenu()
	const { alertStatus } = useAlert()

	const { flex, flexColumn } = containerStyle()
	const imageClasses = imageStyle()
	const textClasses = textStyle()
	const { popoverBackground, popoverDefault, popoverButton } = popoverStyle()
	const { ratingDefault, ratingGroup, ratingTitle, ratingSubtitle } = ratingStyle()
	const { menuCategoryName } = menuStyle()
	const { trackGroup, trackSubtitleGroup, trackSubtitle, trackSubtitleInfo } = collectionTrackStyle()

	const renderMenu = (category, index) => (
		<div className={menuCategoryName}>
			{category.label}
		</div>
	)
	
	const renderTracks = (item, index) => {
	    return (
	        <div>
	            <img 
	                className={imageClasses} 
	                src={item.image} 
	            />
	        </div>
	    );
	}

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
			<img className={imageClasses} src={item.image}/>
			<div className={ratingGroup}>
				<p className={ratingTitle}>Your rating to {item.track} by {item.artist}</p>
				<div className={ratingDefault}>
					{ratingButton}
				</div>
				<p className={ratingSubtitle}>Rated tracks will be saved in your favorites</p>
			</div>
		</div>
	) 

	const renderTracksView = () => {
		const track = <Track
			trackName={selectedSpotifyItem?.track}
			artistName={selectedSpotifyItem?.artist}
		/>

		return(
		<>
			{selectedSpotifyItem && (
				selectedMenuCategory === 'mostlyListened' ? (
					<div className={flex}>
						<p>{collectionSelectedIndex + 1}</p>
						<p>{selectedSpotifyItem.artist}</p>
					</div>
				) : selectedMenuCategory === 'playlists' ? (
					<>
					{track}
					<div className={flex}>
						<p>{collectionSelectedIndex + 1}</p>
						<p>{selectedSpotifyItem.playlist}</p>
					</div>
					</>
				) : (
					<>
					{track}
					<div className={flex}>
						<p>{collectionSelectedIndex + 1}</p>
						<p>{selectedSpotifyItem.track}</p>
					</div>
					</>
				)
			)}

			<div className={trackGroup}>
				<Collection 
					items={spotifyCollectionItems}
					isSelectable={true}
					openCollection={handleOpenCollectionView}
					isOpen={isPopoverOpen}
					renderItem={renderTracks}
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

			{selectedSpotifyItem && (
				selectedMenuCategory === 'recentlyPlayed' || selectedMenuCategory === 'likedTracks' ? (
					<>
					<div className={trackSubtitleGroup}>
						<p className={trackSubtitle}>Album</p>
						<p className={trackSubtitleInfo}>{selectedSpotifyItem.album}</p>
					</div>
					<div className={trackSubtitleGroup}>
						<p className={trackSubtitle}>Artist</p>
						<p className={trackSubtitleInfo}>{selectedSpotifyItem.artist}</p>
					</div>
					<div className={trackSubtitleGroup}>
						<p className={trackSubtitle}>Release Date</p>
						<p className={trackSubtitleInfo}>{selectedSpotifyItem.releaseDate}</p>
					</div>
						<Button
							name={'Give a rating'}
							call={() => handleOpenPopoverView(selectedSpotifyItem, true)}
						/>
						<Button
							name={'Play track preview'}
							call={() => handleOpenTrackView(selectedSpotifyItem, getTrackPreviewDetails)}
						/>
						<span>Play </span>
						<a href={selectedSpotifyItem.reference} target='_blank'>{selectedSpotifyItem.track} </a>
						<span>On Spotify</span>
					</>
				) : selectedMenuCategory === 'mostlyListened' ? (
					<>
					<div className={trackSubtitleGroup}>
						<p className={trackSubtitle}>Album</p>
						<p className={trackSubtitleInfo}>{selectedSpotifyItem.followers}</p>
					</div>
					<div className={trackSubtitleGroup}>
						<p className={trackSubtitle}>Popularity</p>
						<p className={trackSubtitleInfo}>{selectedSpotifyItem.popularity}</p>
					</div>
						<span>Visit </span>
						<a href={selectedSpotifyItem.reference} target='_blank'>{selectedSpotifyItem.artist} </a>
						<span>On Spotify</span>
					</>
				) : selectedMenuCategory === 'mostlyPlayed' ? (
					<>
					<div className={trackSubtitleGroup}>
						<p className={trackSubtitle}>Album</p>
						<p className={trackSubtitleInfo}>{selectedSpotifyItem.album}</p>
					</div>
					<div className={trackSubtitleGroup}>
						<p className={trackSubtitle}>Artist</p>
						<p className={trackSubtitleInfo}>{selectedSpotifyItem.artist}</p>
					</div>
					<div className={trackSubtitleGroup}>
						<p className={trackSubtitle}>Popularity</p>
						<p className={trackSubtitleInfo}>{selectedSpotifyItem.popularity}</p>
					</div>
						<Button
							name={'Give a rating'}
							call={() => handleOpenPopoverView(selectedSpotifyItem, true)}
						/>
						<Button
							name={'Play track preview'}
							call={() => handleOpenTrackView(selectedSpotifyItem, getTrackPreviewDetails)}
						/>
						<span>Play </span>
						<a href={selectedSpotifyItem.reference} target='_blank'>{selectedSpotifyItem.track} </a>
						<span>On Spotify</span>
					</>
				) : selectedMenuCategory === 'playlists' ? (
					<div>
						<p className={textClasses}>{selectedSpotifyItem.track}</p>
						<Button
							name={'Give a rating'}
							call={() => handleOpenPopoverView(selectedSpotifyItem, true)}
						/>
						<Button
							name={'Play track preview'}
							call={() => handleOpenTrackView(selectedSpotifyItem, getTrackPreviewDetails)}
						/>
						<span>Visit </span>
						<a href={selectedSpotifyItem.reference} target='_blank'>{selectedSpotifyItem.playlist} </a>
						<span>On Spotify</span>
					</div>
				) : null
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

			<Placeholder isLoading={isLoading}>
				{renderTracksView()}
			</Placeholder>

			<Menu 
				menuList={trackMenuList}
				renderMenu={renderMenu}
			/>

		</div>
	)
}