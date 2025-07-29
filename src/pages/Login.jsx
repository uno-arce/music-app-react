import Form from '../components/form'
import useUserAuthStore from '../stores/userAuthStore'
import userAuth from '../services/userAuth'


export default function Login() {

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
		</div>
	)
}