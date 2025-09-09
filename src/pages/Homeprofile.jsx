import React from 'react'
import useTracksStore from '../stores/tracksStore'

import useAuth from '../hooks/authHooks'
import useSpotifyAuth from '../hooks/spotifyAuthHooks'
import useSpotifyApi from '../hooks/spotifyApiHooks'
import usePopover from '../hooks/popoverHooks'
import useRating from '../hooks/ratingHooks'

import Form from '../components/form'
import Button from '../components/button'
import Placeholder from '../components/Placeholder'
import Collection from '../components/collection'
import Popover from '../components/popover'
import Rating from '../components/rating'

export default function Homeprofile() {
	const { logout } = useAuth()
	const { authenticate, isAuthorized, isAuthLoading } = useSpotifyAuth()
	const { isLoading, recentlyPlayedTracks, rateTrack } = useSpotifyApi()
	const { handleOpenPopoverView, isPopoverOpen, popoverItem } = usePopover()
	const { handleCloseRating } = useRating()

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
				>
					<Popover close={handleCloseRating}>
						<Rating 
							item={popoverItem}
							call={rateTrack}
						/>
					</Popover>
				</Collection>
			</Placeholder>

		</div>
	)
}