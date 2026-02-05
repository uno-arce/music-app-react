import React from 'react'
import { AnimatePresence } from 'framer-motion'

export default function Popover({ isOpen, renderPopover, children }) {
	return(
		isOpen && renderPopover(children)
	)
}