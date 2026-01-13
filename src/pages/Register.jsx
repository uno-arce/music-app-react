import React from 'react'
import { NavLink } from 'react-router-dom'
import Form from '../components/form'
import Button from '../components/button'

import useAuth from '../hooks/authHooks'
import useForm from '../hooks/formHooks'

export default function Register() {
	const { username, email, registerInputs, register, toggleShowPassword, isFormDisabled, isRegisterButtonDisabled, isUsernameIncorrect, isEmailIncorrect, isPasswordIncorrect, isUsernameLengthCorrect, isUsernameCharactersCorrect, isEmailFormatCorrect, isEmailAvailable, isPasswordCharactersCorrect, isPasswordTextCaseCorrect, isPasswordLengthCorrect, isPasswordVisible
	} = useAuth()

	const { handleNextStepForm, currentFormStep } = useForm()

	console.log('Is email available: ', isEmailAvailable)

	const renderRegisterFormValidatorView = (field) => {
		const validSymbol = <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" className='fill-interactive'><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
		const invalidSymbol = <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" className='fill-base-light'><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
		const showPassword = <svg onClick={toggleShowPassword} xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" className='fill-base-light'><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
		const hidePassword = <svg onClick={toggleShowPassword} xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" className='fill-interactive'><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>

		if(field == 'Username' )  {
			return (
				<div>
					<div className='flex gap-1 items-center'>
						{ isUsernameCharactersCorrect ? validSymbol : invalidSymbol }
						<h3>Only letters with numbers or special characters</h3>
					</div>

					<div className='flex gap-1 items-center'>
						{ isUsernameLengthCorrect ? validSymbol : invalidSymbol }
						<h3>At least 6 characters and maximum of 20 characters</h3>
					</div>
					<Button
						name={'Next'}
						call={() => handleNextStepForm('Email')}
						isDisabled={isUsernameIncorrect}
						variant='button button-secondary mt-6 justify-self-end'
					/>
				</div>
			)
		}

		if(field == 'Email') {
			return (
				<div>
					<div className='flex gap-1 items-center'>
						{ isEmailFormatCorrect ? validSymbol : invalidSymbol }
						<h3>Email format is valid</h3>
					</div>
					<div className='flex gap-1 items-center'>
						{ isEmailAvailable ? validSymbol : invalidSymbol }
						<h3>Email is unique and available</h3>
					</div>
					<div className='flex gap-1 mt-6 justify-between'>
						<Button
							name={'Back'}
							call={() => handleNextStepForm('Username')}
							variant='button button-secondary'
						/>
						<Button
							name={'Next'}
							call={() => handleNextStepForm('Password')}
							isDisabled={isEmailIncorrect}
							variant='button button-secondary'
						/>
					</div>
				</div>
			)
		}

		if(field == 'Password') {
			return (
				<div>
					<div className='flex gap-1 items-center'>
						{ isPasswordVisible ? hidePassword : showPassword }
						<h3>{ isPasswordVisible ? 'Hide password' : 'Show password' }</h3>
					</div>
					<div className='flex gap-1 items-center'>
						{ isPasswordCharactersCorrect ? validSymbol : invalidSymbol}
						<h3>Composed of letters, numbers, and special characters</h3>
					</div>
					<div className='flex gap-1 items-center'>
						{ isPasswordTextCaseCorrect ? validSymbol : invalidSymbol}
						<h3>Atleast 1 uppercase and lowercase letter</h3>
					</div>
					<div className='flex gap-1 items-center'>
						{ isPasswordLengthCorrect ? validSymbol : invalidSymbol}
						<h3>Atleast 6 characters and maximum of 20 characters</h3>
					</div>
					<div className='flex gap-1 mt-6 justify-between'>
						<Button
							name={'Back'}
							call={() => handleNextStepForm('Email')}
							variant='button button-secondary'
						/>
						<Button
							name={'Next'}
							call={() => handleNextStepForm('Confirm Details')}
							isDisabled={isPasswordIncorrect}
							variant='button button-secondary'
						/>
					</div>
				</div>
			)
		}
	}

	const renderFinalStepValidatorView = () => {
		if(currentFormStep == 'Confirm Details') {
			return(
				<div>
					<p className='text-accent-light'>Account Details</p>
					<div className='flex justify-between mt-2'>
						<label>Username</label>
						<p>{username}</p>
					</div>
					<div className='flex justify-between'>
						<label>Email</label>
						<p>{email}</p>
					</div>
					<div className='flex justify-between mt-6'>
						<Button
							name={'Go Back'}
							call={() => handleNextStepForm('Password')}
							variant='button button-secondary'
						/>
						<Button
							name={'Register'}
							variant='button button-secondary'
						/>
					</div>
				</div>
			)
		}
		return null
	}

	return(
		<div className='grid grid-cols-[350px_1fr] grid-rows-[auto_600px] gap-8 content-center h-screen'>
			<h2 className='col-span-2'>Register an Account</h2>
			<div className='flex flex-col'>
				<Form
					inputs={registerInputs}
					call={register}
					isDisabled={isFormDisabled}
					isStepForm={true}
					formValidator={renderRegisterFormValidatorView}
					structure='grid gap-6'
				>
					{renderFinalStepValidatorView()}
				</Form>
				<div className='mt-auto self-center'>
					<span>Already have an account? </span>
					<NavLink to='/login'>Login</NavLink>
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