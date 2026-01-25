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

	const letterDisplay = 'font-display text-white text-[128px] max-xl:text-[88px]'

	return(
		<div className='max-lg:flex max-lg:flex-col grid grid-cols-[1fr_3fr] grid-rows-[auto_600px] gap-8 content-center justify-center h-dvh'>
			<h2 className='col-span-2 max-lg:text-center'>Login your Account</h2>
			<div className='flex flex-col max-lg:items-center'>
				<Form 
					inputs = {loginInputs}
					call = {login}
					isDisabled = {userAuthStore.isFormDisabled}
					structure='grid gap-6 w-[350px]'
				>
					<Button
						name = {"Login"}
						isDisabled = {isLoginButtonDisabled}
						variant='button button-secondary justify-self-end'
					/>
				</Form>
				<div className='mt-auto self-center max-lg:mt-6'>
					<span>Don't have an account? </span>
					<NavLink to='/register'>Register</NavLink>
				</div>
			</div>

			<div className='flex flex-col justify-center bg-accent max-lg:hidden'>
				<div className='grid grid-cols-6 grow items-end justify-items-center'>
					<h1 className={letterDisplay}>M</h1>
					<h1 className={letterDisplay}>U</h1>
					<h1 className={letterDisplay}>S</h1>
					<h1 className={letterDisplay}>I</h1>
					<h1 className={letterDisplay}>C</h1>
					<svg className='self-center w-[118px] h-[118px] max-xl:w-[88px] max-xl:h-[88px]'  viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
					<rect width="128" height="128" fill="url(#pattern0_69_37)"/>
					<defs>
					<pattern id="pattern0_69_37" patternContentUnits="objectBoundingBox" width="1" height="1">
					<use href="#image0_69_37" transform="scale(0.015625)"/>
					</pattern>
					<image id="image0_69_37" width="64" height="64" preserveAspectRatio="none" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAf0lEQVR4nO3QsRHAQAzDMO6/tFK7dpHTmxgBIEmSJP0iS7SLATu0iwE7tIsBO7SLARPXxICJa2LAxDUxYOKaGDBxTQyYuCYGTFwTAyauiQET18SAiWvyWkCWaBcDdmgXA3ZoFwN2aBcDdmgXA3ZoFwN2aBcDdmiX6wGSJEmiwwcoXjkqBfGE5gAAAABJRU5ErkJggg=="/>
					</defs>
					</svg>
				</div>
				<div className='grid grid-cols-6 grow justify-items-center bg-[#00D492]'>
					<h1></h1>
					<h1></h1>
					<h1 className={letterDisplay}>L</h1>
					<h1 className={letterDisplay}>A</h1>
					<h1 className={letterDisplay}>N</h1>
					<h1 className={letterDisplay}>E</h1>
				</div>
			</div>
		</div>
	)
}