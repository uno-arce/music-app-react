import React from 'react';

export default function Form({ inputs, call, submit, disabled, children }) {

	const formInputs = inputs.map(field => {
		return (
			<div key={field.name}>
				<label htmlFor={field.name}>{field.name}</label>
				<input
				name={field.name}
				type={field.type || 'text'}
				onChange={event => field.updateState(event.target.value)}
				value={field.value}
				disabled={disabled}
				/>
			</div>
		)
	})

	return (
		<form onSubmit={event => submit(event, call)}>
			{formInputs}
			{children}
		</form>
	)

}