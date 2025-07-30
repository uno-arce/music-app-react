
export default function Form({ inputs, call }) {

	const handleSubmit = async(event) => {
		event.preventDefault();

		try {
			let response
			response = await call();

			return response
		} catch(error) {
			console.error(error)
		}
		
	}

	const formInputs = inputs.map(field => {
		return (
			<div key={field.name}>
				<label htmlFor={field.name}>{field.name}</label>
				<input
				name={field.name}
				onChange={event => field.updateState(event.target.value)}
				/>
			</div>
		)
	})

	return (
		<form onSubmit={handleSubmit}>
			{formInputs}
		</form>
	)

}