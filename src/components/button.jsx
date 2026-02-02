import React from 'react';
import { buttonStyle } from '../styles/style'
import { motion } from 'framer-motion'

export default function Button({name, id, call, isDisabled, variant, children, ...motionProps}) {
	const buttonClasses = buttonStyle(isDisabled)

	return(
		<motion.button 
			className={`${buttonClasses} ${variant || ''}`} 
			type='submit' 
			disabled={isDisabled} 
			onClick={call}
			{...motionProps}
		>
			{name} {children}
		</motion.button>
	)
}