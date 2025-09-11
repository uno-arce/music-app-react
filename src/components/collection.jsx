import React from 'react'

export default function Collection({ items, isSelectable, openCollection, isOpen, renderItem, children }) {

	const dataCollection = items.map((item, index) => {
		return(
			<div 
				key={index}
				onClick={() => openCollection(item, isSelectable)} 
			>
				{renderItem(item)}
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