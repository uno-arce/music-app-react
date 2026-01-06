import React from 'react'
import useMenu from '../hooks/menuHooks'
import {menuStyle} from '../styles/style'

export default function Menu({menuList, renderMenu, structure}) {
	const { handleSelectMenuCategory } = useMenu()
	const { menuCategoryName } = menuStyle()

	const menu = menuList.map((category, index) => {
		return (
			<div
				className={menuCategoryName} 
				key={index}
				onClick={() => handleSelectMenuCategory(category)}
			>
				{renderMenu(category, index)}
			</div>
		)
	})

	return(
		<div className={structure}>
			{menu}
		</div>
	)
}