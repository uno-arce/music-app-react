import React from 'react'
import Form from '../components/form'
import Button from '../components/button'

import useAuth from '../hooks/authHooks'
import useForm from '../hooks/formHooks'

import { containerStyle } from '../styles/style'

export default function Register() {
	const { 
		registerInputs, register, isFormDisabled, isRegisterButtonDisabled,
		isUsernameLengthCorrect, isUsernameCharactersCorrect, isEmailFormatCorrect
	} = useAuth()

	const { flex } = containerStyle()

	const renderRegisterFormValidatorView = (field) => {
		const validSymbol = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#CCDAF5"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
		const invalidSymbol = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#CCDAF5"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>

		if(field == 'Username')  {
			return (
				<div>
					<div className={flex}>
						{ isUsernameCharactersCorrect ? validSymbol : invalidSymbol }
						<p>Only letters with numbers or symbols</p>
					</div>
					<div className={flex}>
						{ isUsernameLengthCorrect ? validSymbol : invalidSymbol }
						<p>At least 6 characters and maximum of 20 characters</p>
					</div>
				</div>
			)
		}

		if(field == 'Email') {
			return (
				<div>
					<div className={flex}>
						{ isEmailFormatCorrect ? validSymbol : invalidSymbol }
						<p>Email format is valid</p>
					</div>
					<div>
						
					</div>
				</div>
			)
		}

		if(field == 'Password') {
			return (
				<div>

				</div>
			)
		}
	}

	return(
		<div>
			<p>Register to be a member</p>
			<Form
				inputs={registerInputs}
				call={register}
				isDisabled={isFormDisabled}
				formValidator={renderRegisterFormValidatorView}
			>
			<Button
				name={'Register'}
				isDisabled={isRegisterButtonDisabled}
			/>
			</Form>
		</div>
	)
}