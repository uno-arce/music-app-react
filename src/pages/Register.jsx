import React from 'react'
import Form from '../components/form'
import Button from '../components/button'

import useAuth from '../hooks/authHooks'
import useForm from '../hooks/formHooks'

export default function Register() {
	const { registerInputs, register, isFormDisabled, isRegisterButtonDisabled } = useAuth()

	const formValidator = () => (
		<div>
			<p>username</p>
			<div>

			</div>
			<p>email</p>
			<div>

			</div>
			<p>password</p>
			<div>
				
			</div>
		</div>
	)

	return(
		<div>
			<p>Register to be a member</p>
			<Form
				inputs={registerInputs}
				call={register}
				isDisabled={isFormDisabled}
			>
			<Button
				name={'Register'}
				isDisabled={isRegisterButtonDisabled}
			/>
			</Form>
		</div>
	)
}