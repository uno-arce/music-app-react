import React from 'react';
import { NavLink } from 'react-router-dom'
import Form from '../components/form'
import Button from '../components/button'
import Alert from '../components/alert'
import useUserAuthStore from '../stores/userAuthStore'
import useAuth from '../hooks/authHooks'
import useForm from '../hooks/formHooks'


export default function Login() {
	const { login, loginInputs, isLoginButtonDisabled } = useAuth()
	const { validate } = useForm()
	const userAuthStore = useUserAuthStore()

	return(
		<div className='max-xl:flex max-xl:flex-col max-xl:gap-4 max-xl:p-[0.5rem] max-2xl:grid-cols-[1fr_1fr] grid grid-cols-[1.5fr_3fr] gap-8 p-[0_12rem] content-center justify-center min-h-dvh'>
			<div className='max-xl:order-2 max-xl:self-center max-xl:border-none flex flex-col gap-10 row-span-2 border-r border-base-light'>
				<h2 className='max-sm:text-center'>Login your Account</h2>
				<Form 
					id='loginForm'
					inputs={loginInputs}
					call={login}
					isDisabled={userAuthStore.isFormDisabled}
					structure='grid gap-6 max-w-[350px] min-w-[330px]'

				>
					<Alert/>
				</Form>
			</div>

			<div className='max-xl:order-1 max-xl:self-center max-xl:h-40 max-xl:w-40 flex flex-col items-start justify-self-end image bg-[image:var(--asset-logo-backdrop)] bg-contain h-90 w-90'>
				<h1 className='max-xl:text-2xl max-xl:top-6 relative top-12 right-12 font-display bg-[#E12AFB] text-7xl text-white tracking-[1rem] p-[3px_0_3px_1rem] rounded-sm'>MUSIC</h1>
				<h1 className='max-xl:text-2xl max-xl:top-12 max-xl:left-12 relative top-24 left-24 font-display bg-[#566B5D] text-7xl text-white tracking-[1rem] p-[3px_0_3px_1rem] rounded-sm'>LANE</h1>
			</div>

			<div className='max-xl:order-3 max-xl:self-center flex flex-col gap-4 justify-self-end max-xl:mt-6'>
				<Button
					name='Login'
					form='loginForm'
					isDisabled={isLoginButtonDisabled}
					variant='max-xl:text-[14px] button button-primary text-2xl self-start max-xl:self-center'
				/>
				<span>Don't have an account? <NavLink to='/register'> Register</NavLink> </span>
			</div>
		</div>
	)
}