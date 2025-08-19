import React from 'react'
import useTracksStore from '../stores/tracksStore'
import useAuth from '../hooks/authHooks'
import useSpotifyAuth from '../hooks/spotifyAuthHooks'
import useSpotifyApi from '../hooks/spotifyApiHooks'
import Form from '../components/form'
import Button from '../components/button'
import Placeholder from '../components/Placeholder'

export default function Homeprofile() {
	const { logout } = useAuth()
	const { authenticate, isAuthorized, isAuthLoading } = useSpotifyAuth()
	const { isLoading, recentlyPlayedTracks } = useSpotifyApi()

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
		</div>
	)
}