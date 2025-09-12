import React from 'react'

export default function Popover({ renderPopover, close, children }) {
	return(
		<>
			{renderPopover(children)}
		</>
	)
}