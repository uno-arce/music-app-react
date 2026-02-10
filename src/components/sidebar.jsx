import React from 'react'
import useSidebar from '../hooks/sidebarHooks'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeOut } from '../styles/motion'

export default function Sidebar ({structure, children, ...motionProps }) {
	const { handleCloseSidebarView, isSidebarOpen } = useSidebar()

	return (
		<AnimatePresence>
			{isSidebarOpen && (
				<>
					<motion.div
						className='fixed inset-0 backdrop-blur-xs z-4'
						onClick={handleCloseSidebarView}
						variants={fadeOut}
						initial='hidden'
						animate='show'
						exit='remove'
					/>
					<motion.div className={structure} {...motionProps}>
						{children}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}