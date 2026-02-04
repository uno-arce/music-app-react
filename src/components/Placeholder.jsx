import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeOut } from '../styles/motion'

export default function Placeholder({ isLoading, skeletonNumbers, structure, children }) {
	const skeleton = [...Array(skeletonNumbers)].map((_, index) => (
		<div key={index} className={`${structure.skeleton} animate-pulse`}/>
	))
	return (
		<AnimatePresence mode='wait'>
			{isLoading ? (
				<motion.div
					key='skeleton'
					variants={fadeOut}
					initial='hidden'
					animate='show'
					exit='remove'
					className={structure.parent}>
					{skeleton}
				</motion.div>
			) : (
				children
			)}
		</AnimatePresence>
	)
}