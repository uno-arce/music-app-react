import React from 'react'
import { popoverStyle } from '../styles/style'

export default function Popover({ close, children }) {
	const { popoverBackground, popoverDefault, popoverButton } = popoverStyle()
	return(
		<div className={popoverBackground}>
			<div className={popoverButton}>close</div>
			<div className={popoverDefault}>
				{children}
			</div>
		</div>
	)
}