import React from 'react';
import useForm from '../hooks/formHooks'

export default function Form({ inputs, call, isDisabled, formValidator, children }) {
	const { handleFormSubmit } = useForm()

	const formInputs = inputs.map(field => {
		return (
			<div key={field.name}>
				<label htmlFor={field.name}>{field.name}</label>
				<input
				name={field.name}
				type={field.type || 'text'}
				onChange={event => {
					field.updateState(event.target.value)
					field.validateState && field.validateState(event.target.value)
				}}
				value={field.value}
				disabled={isDisabled}
				/>
				{formValidator && formValidator(field.name)}
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