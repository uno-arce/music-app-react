import React from 'react';
import { NavLink } from 'react-router-dom'
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
			<h1>Login your Account</h1>
			<Form 
				inputs = {loginInputs}
				call = {login}
				isDisabled = {userAuthStore.isFormDisabled}
			>
			<Button
				name = {"Login"}
				isDisabled = {isLoginButtonDisabled}
			/>
			
				<span>Don't have an account? </span>
				<NavLink to='/register'>Register</NavLink>
			</Form>
		</div>
	)
}