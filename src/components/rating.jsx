import React from 'react'
import useRating from '../hooks/ratingHooks'
import { containerStyle, imageStyle, ratingStyle } from '../styles/style'

export default function Rating({ item, call, renderRatingView }) {
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

	const ratingButton = symbols.map(symbol => {
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
		<>
			{renderRatingView(ratingButton)}
		</>
	)
}