import React from 'react';
import Form from '../components/form'
import Button from '../components/button'
import useUserAuthStore from '../stores/userAuthStore'
import userAuth from '../services/userAuth'
import { useNavigate } from 'react-router'


export default function Login() {
	const userAuthStore = useUserAuthStore()
	let navigate = useNavigate()

	const isButtonDisabled = !userAuthStore.email || !userAuthStore.password

	const loginInputs = [
		{
			name: 'email',
			email: userAuthStore.email,
			updateState: (value) => {
				userAuthStore.setEmail(value)
			} 
		},
		{
			name: 'password',
			password: userAuthStore.password,
			type: 'password',
			updateState: (value) => {
				userAuthStore.setPassword(value)
			}
		}
	]

	const handleLoginSubmit = async () => {
		userAuthStore.setIsFormDisabled(true)

        userAuth.login(userAuthStore.email, userAuthStore.password).
        then(response => {
        	if(response.status !== 200) {
        		return response.body.error
        	} 

        	userAuthStore.setEmail(null)
        	userAuthStore.setPassword(null)
        	userAuthStore.setIsFormDisabled(false)
        	navigate('/')
        })
    };

	return(
		<div>
			<h1>Login</h1>
			<Form 
				inputs = {loginInputs}
				call = {handleLoginSubmit}
				isDisabled = {userAuthStore.isFormDisabled}
			>
			<Button
				name = {"Login"}
				isDisabled = {isButtonDisabled}
			/>
			</Form>
		</div>
	)
}