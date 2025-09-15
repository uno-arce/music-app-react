import React from 'react';
import Form from '../components/form'
import Button from '../components/button'
import useUserAuthStore from '../stores/userAuthStore'
import useAuth from '../hooks/authHooks'
import useForm from '../hooks/formHooks'


export default function Login() {
	const { login, loginInputs, isLoginButtonDisabled } = useAuth()
	const { validate } = useForm()
	const userAuthStore = useUserAuthStore()

	return(
		<div>
			<h1>Login</h1>
			<Form 
				inputs = {loginInputs}
				call = {login}
				isDisabled = {userAuthStore.isFormDisabled}
			>
			<Button
				name = {"Login"}
				isDisabled = {isLoginButtonDisabled}
			/>
			</Form>
		</div>
	)
}