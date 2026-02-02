import React from 'react'
import { motion } from 'framer-motion'

import useAuth from '../hooks/authHooks'
import useSpotifyAuth from '../hooks/spotifyAuthHooks'
import useSpotifyApi from '../hooks/spotifyApiHooks'
import usePopover from '../hooks/popoverHooks'
import useRating from '../hooks/ratingHooks'
import useCollection from '../hooks/collectionHooks'
import useTrack from '../hooks/trackHooks'
import useMenu from '../hooks/menuHooks'
import useAlert from '../hooks/alertHooks'
import useSidebar from '../hooks/sidebarHooks'

import Form from '../components/form'
import Button from '../components/button'
import Placeholder from '../components/Placeholder'
import Collection from '../components/collection'
import Popover from '../components/popover'
import Rating from '../components/rating'
import Track from '../components/track'
import Alert from '../components/alert'
import Menu from '../components/menu'
import Sidebar from '../components/sidebar'
import ThemeToggle from '../components/toggleTheme'

import { containerStyle, popoverStyle, ratingStyle, collectionTrackStyle, alertStyle, imageStyle, textStyle } from '../styles/style'
import { staggerContainer, fadeInLeft, fadeInRight, slideInRight } from '../styles/motion'

export default function Homeprofile() {
	const { logout } = useAuth()
	const { authenticate, isAuthorized, isAuthLoading } = useSpotifyAuth()
	const { isLoading, likedTracks, ratedTracks, spotifyCollectionItems, selectedSpotifyItem, rateTrack, getTrackPreviewDetails } = useSpotifyApi()
	const { collectionItem, collectionSelectedIndex, isCollectionOpen, handleOpenCollectionView, handlePreviousCollectionGroup, handleNextCollectionGroup } = useCollection()
	const { handleOpenPopoverView, handleClosePopoverView, isPopoverOpen, popoverItem } = usePopover()
	const { isTrackOpen, handleOpenTrackView } = useTrack()
	const { handleCloseRating } = useRating()
	const { trackMenuList, selectedMenuCategory, selectedMenuLabel } = useMenu()
	const { handleOpenSidebarView} = useSidebar()
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
		<div className='max-md:flex max-md:flex-col grid grid-cols-[auto_400px]'>
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
		const next = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
		const back = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
		const outbound = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m356-300 204-204v90h80v-226H414v80h89L300-357l56 57ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>

		return(
		<div className='max-xl: max-xl:order-3 order-2 col-span-1'>
			<div className='max-sm:h-24 relative h-32'>
				<div className='absolute w-48 left-4 bottom-[-20px] z-0 bg-[image:var(--asset-star)] bg-cover aspect-square'></div>
				{selectedSpotifyItem && (
					selectedMenuCategory === 'mostlyListened' ? (
						<h1 className='max-sm:text-3xl relative z-1'>{collectionSelectedIndex + 1}. {selectedSpotifyItem.artist}</h1>
					) : selectedMenuCategory === 'playlists' ? (
						<h1 className='max-sm:text-3xl relative z-1'>{collectionSelectedIndex + 1}. {selectedSpotifyItem.playlist}</h1>
					) : (
						<h1 className='max-sm:text-3xl relative z-1'>{collectionSelectedIndex + 1}. {selectedSpotifyItem.track}</h1>
					)
				)}
			</div>

			<Collection 
				items={spotifyCollectionItems}
				isSelectable={true}
				openCollection={handleOpenCollectionView}
				isOpen={isPopoverOpen}
				renderItem={renderTracks}
				structure={`${['ratedTracks', 'likedTracks'].includes(selectedMenuCategory) ? 'mb-2' : 'mb-12'} z-1 relative max-xl:h-auto max-lg:grid-cols-4 max-sm:grid-cols-3 grid grid-cols-5 content-start h-[324px] border-b border-solid border-accent-light rounded-xs`}
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
		<div className='max-xl:flex max-xl:flex-col grid grid-cols-[800px_1fr] grid-rows-[auto_1fr_auto] gap-4 min-h-dvh'>
			<div className='order-1 col-span-2 row-span-1 h-22 flex justify-between items-center'>
				<Track
				trackName={selectedSpotifyItem?.track}
				artistName={selectedSpotifyItem?.artist}
				structure='max-sm:grid-cols-[1fr_auto] grid grid-cols-[1fr_2fr_1fr] grow items-center justify-items-center'
				/>
				<Button
					name={isAuthorized ? "Connected to Spotify" : "Connect to spotify"}
					call={authenticate}
					isDisabled={isAuthorized}
					variant={'max-lg:hidden button button-primary'}
				/>	
			</div>

			{renderTracksView()}

			<div 
				className='max-xl:flex-row-reverse max-xl:justify-between max-xl:order-2 max-xl:gap-4 order-3 col-span-1 flex flex-col gap-18'
			>
				<div 
					className='h-10 flex justify-end items-center'>
					{!['mostlyListened', 'playlists'].includes(selectedMenuCategory) && (
						<motion.div
						className='flex gap-1'
						variants={staggerContainer}
						initial='hidden'
						animate='show'>
							<Button
								call={() => handleOpenPopoverView(selectedSpotifyItem, true)}
								variants={fadeInRight}
								variant={'button button-secondary'}>
								<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/></svg>
							</Button>
							<Button
								call={() => handleOpenTrackView(selectedSpotifyItem, getTrackPreviewDetails)}
								variants={fadeInRight}
								variant={'button button-secondary'}
							>
								<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/></svg>
								<span className='text-inherit'>Preview</span>
							</Button>
						</motion.div>
					)}
				</div>

				<Menu 
					menuList={trackMenuList}
					renderMenu={renderMenu}
					itemVariants={slideInRight}
					structure='max-xl:hidden flex flex-col gap-8 self-center'
				/>

				<Button
					name={selectedMenuLabel}
					call={() => handleOpenSidebarView()}
					variant='xl:hidden relative button button-secondary self-center gap-1'
				>
					<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor"><path d="m480-340 180-180-57-56-123 123-123-123-57 56 180 180Zm0 260q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
				</Button>
				<Sidebar structure='sidebar xl:hidden fixed flex flex-col'>
					<h3>Navigation</h3>
					<hr/>
					<Menu 
						menuList={trackMenuList}
						renderMenu={renderMenu}
						structure='flex flex-col gap-2 mt-2'
					/>
				</Sidebar>

			</div>

			<div className='order-4 col-span-2 h-22 flex gap-4 justify-between items-center mt-auto'>
				<ThemeToggle/>
				<hr className='border-accent-light grow'/>
				<Button
					call={logout}
					variant='button button-secondary'
				>
					<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
				</Button>
			</div>

		</div>
	)
}