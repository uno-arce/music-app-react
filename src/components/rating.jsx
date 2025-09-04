import React from 'react'
import { containerStyle, imageStyle, ratingStyle } from '../styles/style'

export default function Rating({ item, handleOnHover, handleOnLeave, handleFillRating, call }) {
	const { flex, flexColumn } = containerStyle()
	const imageClasses = imageStyle()
	const { ratingDefault, ratingSymbol} = ratingStyle()

	const symbols = [5, 4, 3, 2, 1]

	const rating = symbols.map(symbol => {
		return(
			<svg 
				key={symbol}
				className={ratingSymbol} 
				xmlns="http://www.w3.org/2000/svg" 
				height="48px"
				viewBox="0 -960 960 960"
				width="48px" 
				fill="currentColor"
				onMouseEnter={() => handleOnHover(symbol)}
				onMouseLeave={() => handleOnLeave()}
			>
				<path d={handleFillRating(symbol)}/>
			</svg>
		)
	})

	return(
		<div className={flex}>
			<img className={imageClasses} src={item.track.album.images[0].url}/>
			<div className={flexColumn}>
				<p>Your rating to {item.track.name} by {item.track.artists[0].name}</p>
				<div className={ratingDefault}>
					{rating}
				</div>
			</div>
		</div>
	)
}