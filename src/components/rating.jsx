import React from 'react'
import { containerStyle, imageStyle, ratingStyle } from '../styles/style'

export default function Rating({ item, call }) {
	const { flex, flexColumn } = containerStyle()
	const imageClasses = imageStyle()

	const symbol = (
		<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/></svg>
	)

	const filledSymbol = (
		<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#AAC1F0"><path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/></svg>
	)

	const rating = (
		<div>
			<div>{symbol}</div>
		</div>
	)

	return(
		<div className={flex}>
			<img className={imageClasses} src={item.track.album.images[0].url}/>
			<div className={flexColumn}>
				<p>Your rating to {item.track.name} by {item.track.artists[0].name}</p>
				{rating}
			</div>
		</div>
	)
}