import React from 'react'

export default function Collection({ items, isLoading }) {

	const dataCollection = items.map(item => {
		return(
			<div key={item.track.name}>
				<p>{item.track.name}</p>
			</div>
		)
	})
	return(
		{dataCollection}
	)
}