import React from 'react'
import useMenu from '../hooks/menuHooks'
import { menuStyle } from '../styles/style'
import { motion } from 'framer-motion'
import { staggerContainer, slideInRight } from '../styles/motion'

export default function Menu({menuList, renderMenu, structure, itemVariants, ...motionProps}) {
	const { handleSelectMenuCategory, selectedMenuCategory } = useMenu()

	const menu = menuList.map((category, index) => {
		const { menuCategoryName } = menuStyle(selectedMenuCategory === category.activeCategoryKey)
		return (
			<motion.div
				className={menuCategoryName}
				variants={itemVariants} 
				key={index}
				onClick={() => handleSelectMenuCategory(category)}
			>
				{renderMenu(category, index)}
			</motion.div>
		)
	})

	return(
		<motion.div 
			className={structure}
			variants={staggerContainer}
			initial='hidden'
			animate='show'
			{...motionProps}
		>
			{menu}
		</motion.div>
	)
}