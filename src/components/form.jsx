import React from 'react';
import useForm from '../hooks/formHooks'

export default function Form({ inputs, call, isDisabled, isStepForm, formValidator, structure, children }) {
	const { currentFormStep, handleFormSubmit } = useForm()

	const formInputs = inputs.map(field => {
		return (
			(currentFormStep == field.name || !isStepForm) &&
			<div
				className='flex flex-col gap-2'
				key={field.name}
			>
				<label>{field.name}</label>
				<input
				name={field.name}
				type={field.type || 'text'}
				onChange={event => {
					field.updateState(event.target.value)
					field.validateState && field.validateState(event.target.value)
				}}
				value={field.value}
				disabled={isDisabled}
				className={`input`}
				/>
				{formValidator && formValidator(field.name)}
			</div>
		)
	})

	return (
		<form 
			onSubmit={event => handleFormSubmit(event, call)}
			className={structure}
		>
			{formInputs}
			{children}
		</form>
	)

}