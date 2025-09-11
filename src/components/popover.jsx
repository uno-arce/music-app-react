import React from 'react'
import usePopover from '../hooks/popoverHooks'
import { popoverStyle, containerStyle } from '../styles/style'

export default function Popover({ renderPopover, close, children }) {
	const { handleClosePopoverView } = usePopover()
	const { popoverBackground, popoverDefault, popoverButton } = popoverStyle()
	const { flexColumn } = containerStyle()
	return(
		<>
			{renderPopover(children)}
		</>
	)
}