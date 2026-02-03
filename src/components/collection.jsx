import React from 'react'
import { motion } from 'framer-motion'
import useCollection from '../hooks/collectionHooks'

export default function Collection({ items, isSelectable, openCollection, isOpen, renderItem, structure, itemVariants, children, ...motionProps }) {

	const { collectionSelectedIndex } = useCollection()

	const dataCollection = items.map((item, index) => {
		return(
			<motion.div 
				className={collectionSelectedIndex === index ? 'collection-item-active' : null }
				key={index}
				onClick={() => openCollection(item, index, isSelectable)} 
				variants={itemVariants}
			>
				{renderItem(item, index)}
			</motion.div>
		)
	})
	return(
		<motion.div 
			className={structure} 
			{...motionProps}>
			{dataCollection}
			{isOpen && children}
		</motion.div>
	)
}