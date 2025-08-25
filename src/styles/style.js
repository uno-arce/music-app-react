
// Buttons
export const buttonStyle = (isDisabled) => {
	const enabled = 'cursor-pointer'
	const disabled = 'cursor-default'
	return isDisabled ? `${disabled}` : `${enabled}`
}

// Container
export const containerStyle = () => {
	const flex = 'flex'
	const flexColumn = 'flex flex-col'
	return {
		flex,
		flexColumn
	}
}

// Images
export const imageStyle = () => {
	const imgDefault = 'w-64 h-64'
	return imgDefault
}

// Texts 
export const textStyle = () => {
	const textDefault = 'neutral-700'
	return textDefault
}
