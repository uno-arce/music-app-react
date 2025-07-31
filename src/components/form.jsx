import React from 'react';

export default function Form({ inputs, call, disabled, children }) {

	const handleSubmit = async(event) => {
		event.preventDefault();

		await call()	
	}

	const formInputs = inputs.map(field => {
		return (
			<div key={field.name}>
				<label htmlFor={field.name}>{field.name}</label>
				<input
				name={field.name}
				type={field.type || 'text'}
				onChange={event => field.updateState(event.target.value)}
				disabled={disabled}  
				/>
			</div>
		)
	})

	return (
		<form onSubmit={handleSubmit}>
			{formInputs}
			{children}
		</form>
	)

}