import React from 'react'
import useTracksStore from '../stores/tracksStore'
import useAuth from '../hooks/authHooks'
import Form from '../components/form'
import Button from '../components/button'

export default function Homeprofile() {
	const { logout } = useAuth()

	const handleSpotifyConnect = () => {
	    // This is the correct way to trigger the server-side redirect
	    // Ensure your server's base URL is correct
	    window.location.href = 'http://localhost:4000/auth/spotify/';
	}

	return(
		<div>
			<Button
				name={"Connect to spotify"}
				call={handleSpotifyConnect}
			/>
			<Button
				name={"Logout"}
				call={logout}
			/>
		</div>
	)
}