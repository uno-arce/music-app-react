import React from 'react';

export default function Button({name, id, call, isDisabled}) {
	return(
		<div>
			<button type='submit' disabled={isDisabled} onClick={call}>{name}</button>
		</div>
	)
}