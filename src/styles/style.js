
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
	const popoverBackground = 'fixed w-screen h-screen inset-0 backdrop-blur-xs flex flex-col justify-center items-center'
	const popoverButton = 'flex justify-end'
	const popoverDefault = 'relative min-h-fit min-w-fit p-4 bg-neutral-100'
	return {
		popoverBackground,
		popoverDefault
	}
}

// Rating
export const ratingStyle = () => {
	const ratingSymbol= 'fill-blue-300 hover:fill-blue-300 transition-all'
	const ratingSymbolFourth= 'peer/fourth fill-blue-100 hover:fill-blue-200 peer-hover/fifth:fill-blue-200 transition-all'
	const ratingSymbolThird= 'peer/third fill-blue-100 hover:fill-blue-200 peer-hover/fifth:fill-blue-200 peer-hover/fourth:fill-blue-200 transition-all'
	const ratingSymbolSecond= 'peer/second fill-blue-100 hover:fill-blue-200 peer-hover/fifth:fill-blue-200 peer-hover/fourth:fill-blue-200 peer-hover/third:fill-blue-200 transition-all'
	const ratingSymbolFirst= 'peer/first fill-blue-100 hover:fill-blue-200 peer-hover/fifth:fill-blue-200 peer-hover/fourth:fill-blue-200 peer-hover/third:fill-blue-200 peer-hover/second:fill-blue-200 transition-all'
	const ratingDefault = 'flex flex-row-reverse mx-auto'
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
