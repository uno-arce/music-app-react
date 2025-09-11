import React from 'react';
import useForm from '../hooks/formHooks'

export default function Form({ inputs, call, isDisabled, children }) {
	const { handleFormSubmit } = useForm()

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
		<form onSubmit={event => handleFormSubmit(event, call)}>
			{formInputs}
			{children}
		</form>
	)

}