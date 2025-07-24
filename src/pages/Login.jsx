import Form from '../components/form'
import userAuthStore from '../stores/userAuthStore'
import userAuth from '../services/userAuth'


export default function Login() {

	return(
		<Form 
			input = {['email', 'password']}
			call = {userAuth.login}
			store = {userAuthStore}
		/>
	)
}