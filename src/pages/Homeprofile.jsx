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

import { containerStyle, popoverStyle, ratingStyle, collectionTrackStyle, alertStyle, imageStyle, textStyle } from '../styles/style'

export default function Homeprofile() {
	const { logout } = useAuth()
	const { authenticate, isAuthorized, isAuthLoading } = useSpotifyAuth()
	const { isLoading, likedTracks, ratedTracks, spotifyCollectionItems, selectedSpotifyItem, rateTrack, getTrackPreviewDetails } = useSpotifyApi()
	const { collectionItem, collectionSelectedIndex, isCollectionOpen, handleOpenCollectionView, handlePreviousCollectionGroup, handleNextCollectionGroup } = useCollection()
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
	const { trackGroup, trackSubtitleGroup, trackSubtitle, trackSubtitleInfo, trackButtonGroup, trackSubtitleButtonGroup } = collectionTrackStyle()

	const renderMenu = (category, index) => (
		<Button name={category.label}/>
	)
	
	const renderTracks = (item, index) => {
	    return (
	        <img 
	            className={imageClasses} 
	            src={item.image} 
	        />
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
		const next = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
		const back = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>

		return(
		<div>
			<div className='h-32'>
				{selectedSpotifyItem && (
					selectedMenuCategory === 'mostlyListened' ? (
						<h1>{collectionSelectedIndex + 1} {selectedSpotifyItem.artist}</h1>
					) : selectedMenuCategory === 'playlists' ? (
						<h1>{collectionSelectedIndex + 1} {selectedSpotifyItem.playlist}</h1>
					) : (
						<h1>{collectionSelectedIndex + 1} {selectedSpotifyItem.track}</h1>
					)
				)}
			</div>

			<div className={`${['ratedTracks', 'likedTracks'].includes(selectedMenuCategory) ? 'mb-2' : 'mb-12'} h-[337px] border-b border-solid border-accent-light rounded-xs`}>
				<Collection 
					items={spotifyCollectionItems}
					isSelectable={true}
					openCollection={handleOpenCollectionView}
					isOpen={isPopoverOpen}
					renderItem={renderTracks}
					structure={'grid grid-cols-5'}
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

			{selectedMenuCategory === 'likedTracks' ? (
				<div className={trackButtonGroup}>
					<Button call={() => handlePreviousCollectionGroup()}>{back}</Button>
					<Button call={() => handleNextCollectionGroup(likedTracks)}>{next}</Button>
				</div>
			) : selectedMenuCategory === 'ratedTracks' ? (
				<div className={trackButtonGroup}>
					<Button call={() => handlePreviousCollectionGroup()}>{back}</Button>
					<Button call={() => handleNextCollectionGroup(ratedTracks)}>{next}</Button>
				</div>
			) : null }

			<div className=''>
				{selectedSpotifyItem && (
					selectedMenuCategory === 'recentlyPlayed' ? (
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
						<div className={trackSubtitleButtonGroup}>
							<Button
								name={'Give a Rating'}
								call={() => handleOpenPopoverView(selectedSpotifyItem, true)}
							/>
							<Button
								name={'Play Track Preview'}
								call={() => handleOpenTrackView(selectedSpotifyItem, getTrackPreviewDetails)}
							/>
							<span>Play <a href= {selectedSpotifyItem.reference} target='_blank'>{selectedSpotifyItem.track}</a> On Spotify</span>
						</div>
						</>
					) : selectedMenuCategory === 'likedTracks' ? (
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
						<div>
							<Button
								name={'Give a Rating'}
								call={() => handleOpenPopoverView(selectedSpotifyItem, true)}
							/>
							<Button
								name={'Play Track Preview'}
								call={() => handleOpenTrackView(selectedSpotifyItem, getTrackPreviewDetails)}
							/>
							<span>Play </span>
							<a href={selectedSpotifyItem.reference} target='_blank'>{selectedSpotifyItem.track} </a>
							<span>On Spotify</span>
						</div>
						</>
					) : selectedMenuCategory === 'mostlyListened' ? (
						<>
						<div className={trackSubtitleGroup}>
							<p className={trackSubtitle}>Followers</p>
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
						<div>
							<Button
								name={'Give a Rating'}
								call={() => handleOpenPopoverView(selectedSpotifyItem, true)}
							/>
							<Button
								name={'Play Track Preview'}
								call={() => handleOpenTrackView(selectedSpotifyItem, getTrackPreviewDetails)}
							/>
							<span>Play </span>
							<a href={selectedSpotifyItem.reference} target='_blank'>{selectedSpotifyItem.track} </a>
							<span>On Spotify</span>
						</div>
						</>
					) : selectedMenuCategory === 'ratedTracks' ? (
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
							<p className={trackSubtitle}>Rating</p>
							<p className={trackSubtitleInfo}>{selectedSpotifyItem.rating}</p>
						</div>
						<div>
							<Button
								name={'Give a Rating'}
								call={() => handleOpenPopoverView(selectedSpotifyItem, true)}
							/>
							<Button
								name={'Play Track Preview'}
								call={() => handleOpenTrackView(selectedSpotifyItem, getTrackPreviewDetails)}
							/>
							<span>Play </span>
							<a href={selectedSpotifyItem.reference} target='_blank'>{selectedSpotifyItem.track} </a>
							<span>On Spotify</span>
						</div>
						</>
					) : selectedMenuCategory === 'playlists' ? (
						<div>
							<span>Visit </span>
							<a href={selectedSpotifyItem.reference} target='_blank'>{selectedSpotifyItem.playlist} </a>
							<span>On Spotify</span>
						</div>
					) : null
				)}
			</div>
		</div>
		)
	}

	return(
		<div>
{/*			<Track
			trackName={selectedSpotifyItem?.track}
			artistName={selectedSpotifyItem?.artist}
			/>*/}
			<Button
				name={isAuthorized ? "Connected to Spotify" : "Connect to spotify"}
				call={authenticate}
				isDisabled={isAuthorized}
			/>	

			<div className='grid grid-cols-2'>
				{renderTracksView()}
				<Menu 
					menuList={trackMenuList}
					renderMenu={renderMenu}
				/>
			</div>

			<Button
				name={"Logout"}
				call={logout}
			/>

		</div>
	)
}