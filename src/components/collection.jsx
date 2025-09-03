import React from 'react'
import { containerStyle, imageStyle, textStyle } from '../styles/style'

export default function Collection({ items, isSelectable, openPopover, isOpen, children }) {
	const { flex } = containerStyle()
	const imageClasses = imageStyle()
	const textClasses = textStyle()

	const dataCollection = items.map(item => {
		return(
			<div onClick={() => openPopover(item, isSelectable)} className={flex} key={item.track.id}>
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
			{isOpen && children}
		</>
	)
}