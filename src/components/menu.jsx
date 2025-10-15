import React from 'react'
import useMenu from '../hooks/menuHooks'

export default function Menu({menuList, renderMenu}) {
	const { handleSelectMenuCategory } = useMenu()

	const menu = menuList.map((category, index) => {
		return (
			<div
				key={index}
				onClick={() => handleSelectMenuCategory(category)}
			>
				{renderMenu(category, index)}
			</div>
		)
	})

	return(
		<>
			{menu}
		</>
	)
}