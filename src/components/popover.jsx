import React from 'react'
import { popoverStyle, containerStyle } from '../styles/style'

export default function Popover({ close, children }) {
	const { popoverBackground, popoverDefault, popoverButton } = popoverStyle()
	const { flexColumn } = containerStyle()
	return(
		<div className={popoverBackground}>
			<div className={flexColumn}>
				<svg
					className={popoverButton}
					xmlns="http://www.w3.org/2000/svg" 
					height="32px" 
					viewBox="0 -960 960 960" 
					width="32px" 
					fill="currentColor"
					onClick={close}
				>
					<path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/>
				</svg>
				<div className={popoverDefault}>
					{children}
				</div>
			</div>
		</div>
	)
}