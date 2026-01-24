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
		<>{category.label}</>
	)
	
	const renderTracks = (item, index) => {
	    return (
	        <img 
	        	className='image image-item'
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
		<div className='grid grid-cols-[auto_400px]'>
			<img src={item.image}/>
			<div className={ratingGroup}>
				<p className={ratingTitle}>Your rating to <span>{item.track}</span> by <span>{item.artist}</span> </p>
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
		const next = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
		const back = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
		const outbound = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m356-300 204-204v90h80v-226H414v80h89L300-357l56 57ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>

		return(
		<div className='col-span-1'>
			<div className='relative h-32'>
				<img
					src='/src/assets/star-pink.png'
					className='absolute w-48 left-4 bottom-[-20px] z-0'
				/>
				{selectedSpotifyItem && (
					selectedMenuCategory === 'mostlyListened' ? (
						<h1 className='relative z-1'>{collectionSelectedIndex + 1}. {selectedSpotifyItem.artist}</h1>
					) : selectedMenuCategory === 'playlists' ? (
						<h1 className='relative z-1'>{collectionSelectedIndex + 1}. {selectedSpotifyItem.playlist}</h1>
					) : (
						<h1 className='relative z-1'>{collectionSelectedIndex + 1}. {selectedSpotifyItem.track}</h1>
					)
				)}
			</div>

			<div className={`${['ratedTracks', 'likedTracks'].includes(selectedMenuCategory) ? 'mb-2' : 'mb-12'} h-[324px] border-b border-solid border-accent-light rounded-xs z-1 relative`}>
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
					<Button call={() => handlePreviousCollectionGroup()} variant='button button-tertiary'>{back}</Button>
					<Button call={() => handleNextCollectionGroup(likedTracks)} variant='button button-tertiary'>{next}</Button>
				</div>
			) : selectedMenuCategory === 'ratedTracks' ? (
				<div className={trackButtonGroup}>
					<Button call={() => handlePreviousCollectionGroup()} variant='button button-tertiary'>{back}</Button>
					<Button call={() => handleNextCollectionGroup(ratedTracks)} variant='button button-tertiary'>{next}</Button>
				</div>
			) : null }

			<div>
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
							{outbound}
							<p>Play <a href= {selectedSpotifyItem.reference} target='_blank'>{selectedSpotifyItem.track}</a> On Spotify</p>
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
						<div className={trackSubtitleButtonGroup}>
							{outbound}
							<p>Play <a href= {selectedSpotifyItem.reference} target='_blank'>{selectedSpotifyItem.track}</a> On Spotify</p>
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
						<div className={trackSubtitleButtonGroup}>
							{outbound}
							<p>Visit <a href={selectedSpotifyItem.reference} target='_blank'>{selectedSpotifyItem.artist} </a> On Spotify</p>
						</div>
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
						<div className={trackSubtitleButtonGroup}>
							{outbound}
							<p>Play <a href= {selectedSpotifyItem.reference} target='_blank'>{selectedSpotifyItem.track}</a> On Spotify</p>
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
						<div className={trackSubtitleButtonGroup}>
							{outbound}
							<p>Play <a href= {selectedSpotifyItem.reference} target='_blank'>{selectedSpotifyItem.track}</a> On Spotify</p>
						</div>
						</>
					) : selectedMenuCategory === 'playlists' ? (
						<div className={trackSubtitleButtonGroup}>
							{outbound}
							<p>Visit <a href={selectedSpotifyItem.reference} target='_blank'>{selectedSpotifyItem.playlist} </a> On Spotify</p>
						</div>
					) : null
				)}
			</div>
		</div>
		)
	}

	return(
		<div className='grid grid-cols-[800px_1fr] grid-rows-[auto_1fr_auto] gap-4 h-screen'>
			<div className='col-span-2 row-span-1 h-22 flex justify-between items-center'>
				<Track
				trackName={selectedSpotifyItem?.track}
				artistName={selectedSpotifyItem?.artist}
				structure='grid grid-cols-[1fr_2fr_1fr] grow items-center justify-items-center'
				/>
				<Button
					name={isAuthorized ? "Connected to Spotify" : "Connect to spotify"}
					call={authenticate}
					isDisabled={isAuthorized}
					variant={'button button-primary'}
				/>	
			</div>

			{renderTracksView()}

			<div className='col-span-1 flex flex-col gap-18'>
				<div className='h-10 flex gap-4 justify-end items-center'>
					{!['mostlyListened', 'playlists'].includes(selectedMenuCategory) && (
						<>
						<Button
							name={'Give a Rating'}
							call={() => handleOpenPopoverView(selectedSpotifyItem, true)}
							variant={'button button-secondary'}
						/>
						<Button
							name={'Play Track Preview'}
							call={() => handleOpenTrackView(selectedSpotifyItem, getTrackPreviewDetails)}
							variant={'button button-secondary'}
						/>
						</>
					)}
				</div>

				<Menu 
					menuList={trackMenuList}
					renderMenu={renderMenu}
					structure='flex flex-col gap-8 self-center'
				/>
			</div>

			<div className='col-span-2 h-22 flex gap-4 justify-between items-center'>
				<hr className='border-accent-light grow'/>
				<Button
					name={"Logout"}
					call={logout}
					variant='button'
				/>
			</div>

		</div>
	)
}