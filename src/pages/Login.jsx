import { useEffect } from 'react'
import Form from '../components/form'
import Button from '../components/button'
import useUserAuthStore from '../stores/userAuthStore'
import userAuth from '../services/userAuth'


export default function Login() {
	useEffect(() => {
		userAuth.verify
	})

	const userAuthStore = useUserAuthStore()

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
			updateState: (value) => {
				userAuthStore.setPassword(value)
			}
		}
	]

	const handleLoginSubmit = async () => {
        return userAuth.login(userAuthStore.email, userAuthStore.password);
    };

	return(
		<div>
			<h1>Login</h1>
			<Form 
				inputs = {loginInputs}
				call = {handleLoginSubmit}
			/>
			<Button
				name = {"Login"}
			/>
		</div>
	)
}