import React from 'react';
import { buttonStyle } from '../styles/style'

export default function Button({name, id, call, isDisabled, children}) {
	const buttonClasses = buttonStyle(isDisabled)

	return(
		<div>
			<button className={buttonClasses} type='submit' disabled={isDisabled} onClick={call}>{name}{children}</button>
		</div>
	)
}