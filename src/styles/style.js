
// Buttons
export const buttonStyle = (isDisabled) => {
	const enabled = 'cursor-pointer'
	const disabled = 'cursor-default'
	return isDisabled ? `${disabled}` : `${enabled}`
}

// Container
export const containerStyle = () => {
	const flex = 'flex gap-4'
	const flexColumn = 'flex flex-col'
	return {
		flex,
		flexColumn,
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
	const popoverButton = 'fill-neutral-200 hover:fill-neutral-300'
	const popoverDefault = 'relative min-h-fit min-w-fit p-4 bg-neutral-100'
	return {
		popoverBackground,
		popoverButton,
		popoverDefault
	}
}

// Rating
export const ratingStyle = (clickedIndex) => {
	const ratingSymbolFifth= `peer/fifth ${clickedIndex >= 5 ? 'fill-blue-200' : 'fill-blue-100'} hover:fill-blue-200 transition-all`
	const ratingSymbolFourth= `peer/fourth ${clickedIndex >= 4 ? 'fill-blue-200' : 'fill-blue-100'} hover:fill-blue-200 peer-hover/fifth:fill-blue-200 transition-all`
	const ratingSymbolThird= `peer/third ${clickedIndex >= 3 ? 'fill-blue-200' : 'fill-blue-100'} hover:fill-blue-200 peer-hover/fifth:fill-blue-200 peer-hover/fourth:fill-blue-200 transition-all`
	const ratingSymbolSecond= `peer/second ${clickedIndex >= 2 ? 'fill-blue-200' : 'fill-blue-100'} hover:fill-blue-200 peer-hover/fifth:fill-blue-200 peer-hover/fourth:fill-blue-200 peer-hover/third:fill-blue-200 transition-all`
	const ratingSymbolFirst= `peer/first ${clickedIndex >= 1 ? 'fill-blue-200' : 'fill-blue-100'} hover:fill-blue-200 peer-hover/fifth:fill-blue-200 peer-hover/fourth:fill-blue-200 peer-hover/third:fill-blue-200 peer-hover/second:fill-blue-200 transition-all`
	const ratingGroup = 'flex flex-col items-start w-2xs'
	const ratingTitle = 'grow text-left text-pretty'
	const ratingSubtitle = 'text-left'
	const ratingDefault = 'flex flex-row-reverse'
	return {
		ratingGroup,
		ratingSymbolFifth,
		ratingSymbolFourth,
		ratingSymbolThird,
		ratingSymbolSecond,
		ratingSymbolFirst,
		ratingTitle,
		ratingSubtitle,
		ratingDefault
	}
}

// Alert 
export const alertStyle = (status) => {
	const alertPosition = 'fixed z-10 inset-0 flex flex-col justify-center items-center'
	const alertGroup = 'absolute top-0 flex min-h-fit min-w-fit p-4 mt-4 gap-4 bg-neutral-100'
	const alertIcon = 'fill-blue-200'
	const alertDescription = 'text-left'
	return {
		alertPosition,
		alertGroup,
		alertIcon,
		alertDescription
	}
}

// Menu
export const menuStyle = () => {
	const menuCategoryName = 'cursor-pointer select-none'

	return{
		menuCategoryName
	}
}

// Texts 
export const textStyle = () => {
	const textDefault = 'neutral-700'
	return textDefault
}

// Collection - Tracks
export const collectionTrackStyle = () => {
	const trackGroup = 'grid grid-cols-5'
	const trackSubtitleGroup = 'grid grid-cols-2'
	const trackSubtitle = 'text-left'
	const trackSubtitleInfo = 'text-right'

	return {
		trackGroup,
		trackSubtitleGroup,
		trackSubtitle,
		trackSubtitleInfo
	}
} 
