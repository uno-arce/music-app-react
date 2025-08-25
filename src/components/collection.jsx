import React from 'react'
import { containerStyle, imageStyle, textStyle } from '../styles/style'

export default function Collection({ items, isLoading }) {
	const { flex } = containerStyle()
	const imageClasses = imageStyle()
	const textClasses = textStyle()

	const dataCollection = items.map(item => {
		return(
			<div className={flex} key={item.track.id}>
				<img className={imageClasses} src={item.track.album.images[0].url}/>
				<div>
					<p className={textClasses}>{item.track.name}</p>
					<p className={textClasses}>{item.track.artists[0].name}</p>
				</div>
			</div>
		)
	})
	return(
		<>
			{dataCollection}
		</>
	)
}