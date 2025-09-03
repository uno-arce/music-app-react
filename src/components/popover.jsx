import React from 'react'
import { popoverStyle } from '../styles/style'

export default function Popover({ children }) {
	const { popoverBackground, popoverDefault } = popoverStyle()
	return(
		<div className={popoverBackground}>
			<div className={popoverDefault}>
				{children}
			</div>
		</div>
	)
}