import React from 'react'
import useTracksStore from '../stores/tracksStore'
import useAuth from '../hooks/authHooks'
import useSpotifyAuth from '../hooks/spotifyAuthHooks'
import useSpotifyApi from '../hooks/spotifyApiHooks'
import usePopover from '../hooks/popoverHooks'
import Form from '../components/form'
import Button from '../components/button'
import Placeholder from '../components/Placeholder'
import Collection from '../components/collection'
import Popover from '../components/popover'
import Rating from '../components/rating'

export default function Homeprofile() {
	const { logout } = useAuth()
	const { authenticate, isAuthorized, isAuthLoading } = useSpotifyAuth()
	const { isLoading, recentlyPlayedTracks } = useSpotifyApi()
	const { handleOpenPopoverView, isPopoverOpen, popoverItem } = usePopover()

	return(
		<div>
			<Placeholder isLoading={isAuthLoading}>
				<Button
					name={isAuthorized ? "Connected to Spotify" : "Connect to spotify"}
					call={authenticate}
					isDisabled={isAuthorized}
				/>
			</Placeholder>
			<Button
				name={"Logout"}
				call={logout}
			/>

			<Placeholder isLoading={isLoading}>
				<Collection 
					items={recentlyPlayedTracks}
					isSelectable={true}
					openPopover={handleOpenPopoverView}
					isOpen={isPopoverOpen}
				>
					<Popover>
						<Rating item={popoverItem}/>
					</Popover>
				</Collection>
			</Placeholder>

		</div>
	)
}