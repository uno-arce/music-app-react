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
import { staggerContainer, fadeIn, fadeInLeft, fadeInRight, fadeInTop, fadeInBottom, slideInLeft, slideInRight, slideInBottom, slideInTop, scaleIn, scaleOut } from '../styles/motion'

export default function Homeprofile() {
	const { logout } = useAuth()
	const { authenticate, isAuthorized, isAuthLoading } = useSpotifyAuth()
	const { isLoading, likedTracks, ratedTracks, spotifyCollectionItems, selectedSpotifyItem, rateTrack, getTrackPreviewDetails } = useSpotifyApi()
	const { collectionItem, collectionSelectedIndex, collectionSelectedGroup, isCollectionOpen, handleOpenCollectionView, handlePreviousCollectionGroup, handleNextCollectionGroup } = useCollection()
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

	const renderSidebarMenu = (category) => (
		<div>{category.label}</div>
	)
	
	const renderTracks = (item, index) => {
	    return (
	        <img 
	        	className='max-sm:h-fit image image-item h-26 w-26'
	            src={item.image} 
	        />
	    );
	}

	const renderPopoverRatingView = (children) => (
		<motion.div 
			className={popoverBackground}
			variants={scaleOut}
			initial='hidden'
			animate='show'
			exit='exit'>
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
		</motion.div>
	)

	const renderRatingView = (item, ratingButton) => (
		<div className='max-md:flex max-md:flex-col grid grid-cols-[auto_400px]'>
			<img src={item.image}/>
			<div className={ratingGroup}>
				<p className={ratingTitle}>Your rating to <span className='text-accent'>{item.track}</span> by <span className='text-accent'>{item.artist}</span> </p>
				<div className={ratingDefault}>
					{ratingButton}
				</div>
				<p className={ratingSubtitle}>Rated tracks will be saved in your favorites</p>
			</div>
		</div>
	) 

	const renderTracksView = () => {
		const outbound = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m356-300 204-204v90h80v-226H414v80h89L300-357l56 57ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>

		return(
		<div className='max-2xl:order-3 order-2 col-span-1 row-span-2 flex flex-col'>
			<div className='max-sm:h-auto max-sm:mt-4 relative h-32 mt-14'>
				<motion.div className='max-lg:hidden absolute h-55 w-55 left-0 bottom-[-45px] z-0 bg-[image:var(--asset-star)] bg-contain bg-no-repeat'
					variants={fadeInLeft}
					initial='hidden'
					animate='show'>
				</motion.div>
				<Placeholder
					isLoading={isLoading}
					isEmpty={isLoading === false && spotifyCollectionItems.length === 0}
					skeletonNumbers={1}
					structure={{
						skeleton: 'w-80 h-15 bg-base-light/40'
					}}
					emptyView={
						<h2 className='text-center'>Your Rated Tracks is Empty</h2>
					}>
						<motion.h1 
							className='max-sm:text-3xl max-lg:text-center relative z-1'
							key={[selectedMenuCategory, selectedSpotifyItem?.track]}
							variants={slideInLeft}
							initial='hidden'
							animate='show'
							>
						{collectionSelectedIndex + 1}. {selectedSpotifyItem?.track}
						</motion.h1>
				</Placeholder>
			</div>

			<Placeholder
				isLoading={isLoading}
				isEmpty={isLoading === false && spotifyCollectionItems.length === 0}
				skeletonNumbers={7}
				structure={{
					parent: 'grid grid-cols-[auto_1fr] gap-8 grow justify-items-end',
					skeleton: 'w-20 h-4 bg-base-light/40 justify-center'
				}}
				variants={fadeInTop}
				initial='hidden'
				animate='show'>
				{['recentlyPlayed', 'likedTracks'].includes(selectedMenuCategory) ? (
					<motion.div 
						className='max-sm:mt-4 mt-10'
						key={`${selectedMenuCategory}-${selectedSpotifyItem?.track}`}
						variants={fadeInTop}
						initial='hidden'
						animate='show'>
					<div className={trackSubtitleGroup}>
						<p className={trackSubtitle}>Album</p>
						<p className={trackSubtitleInfo}>{selectedSpotifyItem?.album}</p>
					</div>
					<div className={trackSubtitleGroup}>
						<p className={trackSubtitle}>Artist</p>
						<p className={trackSubtitleInfo}>{selectedSpotifyItem?.artist}</p>
					</div>
					<div className={trackSubtitleGroup}>
						<p className={trackSubtitle}>Release Date</p>
						<p className={trackSubtitleInfo}>{selectedSpotifyItem?.releaseDate}</p>
					</div>
					<span className={trackSubtitleButtonGroup}>{outbound} Play <a href= {selectedSpotifyItem?.reference} target='_blank'>{selectedSpotifyItem?.track}</a> On Spotify</span>
					</motion.div>
				) : selectedMenuCategory === 'mostlyPlayed' ? (
					<motion.div
						className='mt-10'
						key={`${selectedMenuCategory}-${selectedSpotifyItem?.track}`}
						variants={fadeInTop}
						initial='hidden'
						animate='show'>
					<div className={trackSubtitleGroup}>
						<p className={trackSubtitle}>Album</p>
						<p className={trackSubtitleInfo}>{selectedSpotifyItem?.album}</p>
					</div>
					<div className={trackSubtitleGroup}>
						<p className={trackSubtitle}>Artist</p>
						<p className={trackSubtitleInfo}>{selectedSpotifyItem?.artist}</p>
					</div>
					<span className={trackSubtitleButtonGroup}>{outbound} Play <a href= {selectedSpotifyItem?.reference} target='_blank'>{selectedSpotifyItem?.track}</a> On Spotify</span>
					</motion.div>
				) : selectedMenuCategory === 'ratedTracks' ? (
					<motion.div
						className='mt-10'
						key={`${selectedMenuCategory}-${selectedSpotifyItem?.track}`}
						variants={fadeInTop}
						initial='hidden'
						animate='show'>
					<div className={trackSubtitleGroup}>
						<p className={trackSubtitle}>Album</p>
						<p className={trackSubtitleInfo}>{selectedSpotifyItem?.album}</p>
					</div>
					<div className={trackSubtitleGroup}>
						<p className={trackSubtitle}>Artist</p>
						<p className={trackSubtitleInfo}>{selectedSpotifyItem?.artist}</p>
					</div>
					<div className={trackSubtitleGroup}>
						<p className={trackSubtitle}>Rating</p>
						<p className={trackSubtitleInfo}>{selectedSpotifyItem?.rating}</p>
					</div>
					<span className={trackSubtitleButtonGroup}>{outbound} Play <a href= {selectedSpotifyItem?.reference} target='_blank'>{selectedSpotifyItem?.track}</a> On Spotify</span>
					</motion.div>
				) : null}
				
			</Placeholder>

			<div className='flex mt-auto'>
				<Placeholder
					isLoading={isLoading}
					isEmpty={isLoading === false && spotifyCollectionItems.length === 0}
					skeletonNumbers={10}
					structure={{
						parent: 'z-1 relative max-xl:h-auto max-lg:grid-cols-4 max-sm:grid-cols-3 grid grid-cols-5 gap-1 content-start',
						skeleton: 'h-26 w-26 bg-base-light/40'
					}}
					>
					<Collection 
						items={spotifyCollectionItems}
						isSelectable={true}
						openCollection={handleOpenCollectionView}
						isOpen={isPopoverOpen}
						renderItem={renderTracks}
						structure='z-1 relative max-xl:h-auto grid grid-cols-5 content-start'
						key={`${selectedMenuCategory}-${collectionSelectedGroup}`}
						variants={slideInLeft}
						initial='hidden'
						animate='show'
					>
						<Popover 
							isOpen={isPopoverOpen}
							renderPopover={renderPopoverRatingView}
							key='track-popover'>
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
							<Button call={() => handlePreviousCollectionGroup()} variant='button button-tertiary'>
								<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
							</Button>
							<Button call={() => handleNextCollectionGroup(likedTracks)} variant='button button-tertiary'>
								<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
							</Button>
						</div>
					) : selectedMenuCategory === 'ratedTracks' ? (
						<div className={trackButtonGroup}>
							<Button call={() => handlePreviousCollectionGroup()} variant='button button-tertiary'>
								<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
							</Button>
							<Button call={() => handleNextCollectionGroup(ratedTracks)} variant='button button-tertiary'>
								<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
							</Button>
						</div>
					) : null }
				</Placeholder>
			</div>
		</div>
		)
	}

	return(
		<div className='max-2xl:grid-cols-[1.8fr_1fr] max-lg:flex max-lg:flex-col max-lg:p-[0_1rem] grid grid-cols-[1.8fr_2fr] grid-rows-[auto_1fr_auto] gap-4 p-[0_3rem] min-h-dvh overflow-y-clip'>
			<Alert/>
			<motion.div 
				className='order-1 col-span-2 row-span-1 h-20 flex items-center'
				variants={slideInTop}
				initial='hidden'
				animate='show'
				>
				<Track
				trackName={selectedSpotifyItem?.track}
				artistName={selectedSpotifyItem?.artist}
				structure='max-sm:grid-cols-[1fr_auto] max-2xl:grow grid grid-cols-[1fr_3.5fr_1fr] items-center '
				itemVariants={fadeInTop}/>
				<Button
					name={isAuthorized ? "Connected to Spotify" : "Connect to spotify"}
					call={authenticate}
					isDisabled={isAuthorized}
					variant={'max-2xl:hidden button button-primary ms-auto'}
					variants={fadeInTop}
					initial='hidden'
					animate='show'
				/>	
			</motion.div>

			{renderTracksView()}

			<div 
				className='max-2xl:justify-between max-lg:order-2 max-lg:gap-4 relative order-3 col-span-1 flex flex-col'
			>	
				<div className='max-2xl:flex-col-reverse max-2xl:self-center relative flex gap-4 self-end'>
					<motion.div
					className='max-2xl:flex max-2xl:flex-row flex flex-col gap-1 justify-center'
					variants={staggerContainer}
					initial='hidden'
					animate='show'>
						<Button
							call={() => handleOpenPopoverView(selectedSpotifyItem, true)}
							variants={fadeInRight}
							variant={`button button-primary ${spotifyCollectionItems.length === 0 ? 'hidden' : 'block' }`}>
							<svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/></svg>
						</Button>
						<Button
							call={() => handleOpenTrackView(selectedSpotifyItem, getTrackPreviewDetails)}
							variants={fadeInRight}
							variant={`button button-primary ${spotifyCollectionItems.length === 0 ? 'hidden' : 'block' }`}
						>
							<svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/></svg>
						</Button>
						<Button
							call={() => handleOpenSidebarView()}
							variant='xl:hidden relative button button-primary self-center gap-1'
						>
							<svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor"><path d="m480-340 180-180-57-56-123 123-123-123-57 56 180 180Zm0 260q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
						</Button>
					</motion.div>
					<Placeholder
						isLoading={isLoading}
						isEmpty={isLoading === false && spotifyCollectionItems.length === 0}
						skeletonNumbers={1}
						structure={{
							skeleton: 'max-sm:w-full max-sm:h-full max-2xl:h-100 max-2xl:w-100 w-[550px] h-[550px] rounded-sm bg-base-light/40'}}>
						<motion.img 
							className='max-sm:w-full max-sm:h-full max-2xl:h-70 max-2xl:w-70 w-[550px] h-[550px] rounded-sm shadow-2xl'
							src={selectedSpotifyItem?.image}
							variants={fadeIn}
							initial='hidden'
							animate='show'/>
					</Placeholder>
				</div>
				<Sidebar 
					structure='max-lg:w-fit max-md:p-[1rem_2rem_1rem_1rem] sidebar fixed flex flex-col gap-4 justify-between w-[500px]'
					variants={slideInLeft}
					initial='hidden'
					animate='show'
					exit='exit'>
					<Menu 
						menuList={trackMenuList}
						renderMenu={renderSidebarMenu}
						itemVariants={slideInLeft}
						structure='flex flex-col gap-6'
					/>
					<h2>Navigation</h2>
				</Sidebar>
			</div>

			<motion.div 
				className='max-lg:justify-between order-4 col-span-1 flex flex-col gap-4 mb-1 mt-auto'
				variants={slideInBottom}
				initial='hidden'
				animate='show'>
				<Button
					call={() => handleOpenSidebarView()}
					className='max-xl:hidden button flex gap-3 items-center self-end mb-10'>
					<svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M9.23144 1.39047C9.57511 -0.463453 12.2315 -0.463454 12.5752 1.39046C12.821 2.71663 14.4391 3.24237 15.4175 2.31398C16.7852 1.01614 18.9343 2.57754 18.1227 4.2794C17.542 5.49679 18.5421 6.87319 19.8793 6.69719C21.7487 6.45115 22.5695 8.97756 20.9126 9.8773C19.7273 10.5209 19.7273 12.2222 20.9126 12.8659C22.5695 13.7656 21.7487 16.292 19.8793 16.046C18.5421 15.87 17.542 17.2464 18.1227 18.4638C18.9343 20.1656 16.7852 21.727 15.4175 20.4292C14.4391 19.5008 12.821 20.0265 12.5752 21.3527C12.2315 23.2066 9.57511 23.2066 9.23144 21.3527C8.9856 20.0265 7.36754 19.5008 6.38915 20.4292C5.02141 21.727 2.87232 20.1656 3.68399 18.4638C4.2646 17.2464 3.26458 15.87 1.92735 16.046C0.057972 16.292 -0.762907 13.7656 0.894074 12.8659C2.07936 12.2222 2.07936 10.5209 0.894074 9.8773C-0.762907 8.97756 0.057972 6.45115 1.92735 6.69719C3.26458 6.87319 4.2646 5.49679 3.68399 4.2794C2.87232 2.57754 5.02141 1.01613 6.38915 2.31398C7.36754 3.24237 8.9856 2.71663 9.23144 1.39047Z" fill="#C49CCA"/>
					</svg>
					<h2>{selectedMenuLabel}</h2>
				</Button>
				<div className='max-lg:justify-between flex gap-4 w-full justify-end'>
					<ThemeToggle
						variants={fadeInBottom}
						initial='hidden'
						animate='show'
					/>
					<Button
						call={logout}
						variant='button button-secondary'
						variants={fadeInBottom}
						initial='hidden'
						animate='show'
					>
						<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
					</Button>
				</div>
			</motion.div>

		</div>
	)
}