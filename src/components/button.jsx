import React from 'react';

export default function Button({name, id, isDisabled}) {
	return(
		<div>
			<button type='submit' disabled={isDisabled}>{name}</button>
		</div>
	)
}