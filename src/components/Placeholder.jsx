import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeOut } from '../styles/motion'

export default function Placeholder({ isLoading, isEmpty, skeletonNumbers, structure, emptyView, children, ...motionProps}) {
	const skeleton = [...Array(skeletonNumbers)].map((_, index) => (
		<div key={index} className={`${structure.skeleton} animate-pulse`}/>
	))

	console.log('Is Placeholder empty?: ', isEmpty)

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
			) : isEmpty ? (
				emptyView ? (
					<motion.div
						key='empty'
						className='relative z-1'>
						{emptyView}
					</motion.div>
				) : null
			) : (
				<motion.div {...motionProps}>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	)
}