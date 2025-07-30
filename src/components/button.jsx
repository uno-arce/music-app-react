import { useFormStatus } from 'react-dom'

export default function Button({name, id}) {
	const status = useFormStatus()
	
	return(
		<div>
			<button type='submit' disabled={status.pending}>{name}</button>
		</div>
	)
}