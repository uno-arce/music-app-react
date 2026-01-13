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
		<div className='grid grid-cols-[350px_1fr] grid-rows-[auto_600px] gap-8 content-center h-screen'>
			<h2 className='col-span-2'>Login your Account</h2>
			<div className='flex flex-col'>
				<Form 
					inputs = {loginInputs}
					call = {login}
					isDisabled = {userAuthStore.isFormDisabled}
					structure='grid gap-6'
				>
					<Button
						name = {"Login"}
						isDisabled = {isLoginButtonDisabled}
						variant='button button-secondary justify-self-end'
					/>
				</Form>
				<div className='mt-auto self-center'>
					<span>Don't have an account? </span>
					<NavLink to='/register'>Register</NavLink>
				</div>
			</div>

			<div className='flex flex-col justify-center bg-accent'>
				<div className='grid grid-cols-6 grow items-end justify-items-center'>
					<h1 className='font-display text-white text-[128px]'>M</h1>
					<h1 className='font-display text-white text-[128px]'>U</h1>
					<h1 className='font-display text-white text-[128px]'>S</h1>
					<h1 className='font-display text-white text-[128px]'>I</h1>
					<h1 className='font-display text-white text-[128px]'>C</h1>
					<svg className='self-center' width="118" height="118" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
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
					<h1 className='font-display text-white text-[128px]'></h1>
					<h1 className='font-display text-white text-[128px]'></h1>
					<h1 className='font-display text-white text-[128px]'>L</h1>
					<h1 className='font-display text-white text-[128px]'>A</h1>
					<h1 className='font-display text-white text-[128px]'>N</h1>
					<h1 className='font-display text-white text-[128px]'>E</h1>
				</div>
			</div>
		</div>
	)
}