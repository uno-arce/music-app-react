import React from 'react'
import useTracksStore from '../stores/tracksStore'
import useAuth from '../hooks/authHooks'
import useSpotifyAuth from '../hooks/spotifyAuthHooks'
import useSpotifyApi from '../hooks/spotifyApiHooks'
import Form from '../components/form'
import Button from '../components/button'

export default function Homeprofile() {
	const { logout } = useAuth()
	const { authenticate } = useSpotifyAuth()
	const { isLoading, recentlyPlayedTracks } = useSpotifyApi()

	return(
		<div>
			<Button
				name={"Connect to spotify"}
				call={authenticate}
			/>
			<Button
				name={"Logout"}
				call={logout}
			/>
		</div>
	)
}