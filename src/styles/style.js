
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

// Popover
export const popoverStyle = () => {
	const popoverBackground = 'fixed w-screen h-screen inset-0 backdrop-blur-xs flex justify-center items-center'
	const popoverDefault = 'relative min-h-fit min-w-fit p-4 bg-neutral-100'
	return {
		popoverBackground,
		popoverDefault
	}
}

// Rating
export const ratingStyle = () => {
	const ratingSymbol= ''
	const ratingDefault = 'flex'
	return {
		ratingSymbol,
		ratingDefault
	}
}

// Texts 
export const textStyle = () => {
	const textDefault = 'neutral-700'
	return textDefault
}
