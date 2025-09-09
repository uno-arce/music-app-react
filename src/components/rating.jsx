import React from 'react'
import useRating from '../hooks/ratingHooks'
import { containerStyle, imageStyle, ratingStyle } from '../styles/style'

export default function Rating({ item, call }) {
	const { handleHoverRating, handleLeaveRating, handleRatingPath, handleRatingSubmit, lastClickedIndex } = useRating()
	const { flex, flexColumn } = containerStyle()
	const imageClasses = imageStyle()
	const { 
		ratingDefault, 
		ratingGroup, 
		ratingSymbolFifth,
		ratingSymbolFourth,
		ratingSymbolThird,
		ratingSymbolSecond,
		ratingSymbolFirst,
		ratingTitle, 
		ratingSubtitle
	} = ratingStyle(lastClickedIndex)

	const symbols = [
		{
			index: 5,
			style: ratingSymbolFifth
		},
		{
			index: 4,
			style: ratingSymbolFourth
		},
		{
			index: 3,
			style: ratingSymbolThird
		},
		{
			index: 2,
			style: ratingSymbolSecond
		},
		{
			index: 1,
			style: ratingSymbolFirst
		}
	]

	const rating = symbols.map(symbol => {
		return(
			<svg 
				key={symbol.index}
				className={symbol.style} 
				xmlns="http://www.w3.org/2000/svg" 
				height="48px"
				viewBox="0 -960 960 960"
				width="48px" 
				fill="currentColor"
				onMouseEnter={() => handleHoverRating(symbol.index)}
				onMouseLeave={() => handleLeaveRating()}
				onClick={() => handleRatingSubmit(symbol.index, call)}
			>
				<path d={handleRatingPath(symbol.index)}/>
			</svg>
		)
	})

	return(
		<div className={flex}>
			<img className={imageClasses} src={item.track.album.images[0].url}/>
			<div className={ratingGroup}>
				<p className={ratingTitle}>Your rating to {item.track.name} by {item.track.artists[0].name}</p>
				<div className={ratingDefault}>
					{rating}
				</div>
				<p className={ratingSubtitle}>Rated tracks will be saved in your favorites</p>
			</div>
		</div>
	)
}