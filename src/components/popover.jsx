import React from 'react'
import { AnimatePresence } from 'framer-motion'

export default function Popover({ renderPopover, close, children }) {
	return(
		<AnimatePresence>
			{renderPopover(children)}
		</AnimatePresence>
	)
}