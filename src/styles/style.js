
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
	const imgDefault = 'aspect-square object-cover'
	return imgDefault
}

// Popover
export const popoverStyle = () => {
	const popoverBackground = 'fixed w-screen h-screen inset-0 backdrop-blur-xs flex flex-col justify-center items-center z-5'
	const popoverButton = 'fill-neutral-400 hover:fill-accent-light'
	const popoverDefault = 'relative min-h-fit min-w-fit p-4 bg-neutral-100'
	return {
		popoverBackground,
		popoverButton,
		popoverDefault
	}
}

// Rating
export const ratingStyle = (clickedIndex) => {
	const ratingSymbolFifth= `peer/fifth ${clickedIndex >= 5 ? 'fill-accent' : 'fill-accent-light'} hover:fill-accent transition-all`
	const ratingSymbolFourth= `peer/fourth ${clickedIndex >= 4 ? 'fill-accent' : 'fill-accent-light'} hover:fill-accent peer-hover/fifth:fill-accent transition-all`
	const ratingSymbolThird= `peer/third ${clickedIndex >= 3 ? 'fill-accent' : 'fill-accent-light'} hover:fill-accent peer-hover/fifth:fill-accent peer-hover/fourth:fill-accent transition-all`
	const ratingSymbolSecond= `peer/second ${clickedIndex >= 2 ? 'fill-accent' : 'fill-accent-light'} hover:fill-accent peer-hover/fifth:fill-accent peer-hover/fourth:fill-accent peer-hover/third:fill-accent transition-all`
	const ratingSymbolFirst= `peer/first ${clickedIndex >= 1 ? 'fill-accent' : 'fill-accent-light'} hover:fill-accent peer-hover/fifth:fill-accent peer-hover/fourth:fill-accent peer-hover/third:fill-accent peer-hover/second:fill-accent transition-all`
	const ratingGroup = 'flex flex-col items-start bg-[image:var(--background-main)] p-2'
	const ratingTitle = 'text-2xl text-left text-pretty grow'
	const ratingSubtitle = 'text-sm text-base-light'
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
export const menuStyle = (isActive) => {
	const menuCategoryName = `max-md:text-2xl text-5xl text-left whitespace-nowrap cursor-pointer select-none hover:text-accent
		${isActive ? 'text-accent' : 'text-base-light'}`

	return{
		menuCategoryName
	}
}

// Texts 
export const textStyle = () => {
	const textDefault = 'neutral-700'
	return textDefault
}

// Tracks
export const trackStyle = () => {
	const trackControlGroup = 'max-sm:order-2 flex gap-2'
	const trackInfoGroup = 'max-sm:order-1 flex flex-col items-center text-sm text-base-light'
	const trackInfoName = 'text-base text-center'
	const trackInfoArtist = 'text-base-light text-center'
	const trackVolumeGroup = 'flex gap-4'
	const trackButton = 'text-accent hover:'

	return {
		trackControlGroup,
		trackInfoGroup,
		trackInfoName,
		trackInfoArtist,
		trackVolumeGroup
	}
}

// Collection - Tracks
export const collectionTrackStyle = () => {
	const trackGroup = 'grid grid-cols-5'
	const trackSubtitleGroup = 'max-sm:text-lg grid grid-cols-[auto_1fr] gap-8 text-2xl mb-5'
	const trackSubtitle = 'text-left text-accent-light'
	const trackSubtitleInfo = 'text-right text-accent'
	const trackButtonGroup = 'flex justify-between'
	const trackSubtitleButtonGroup = 'max-sm:text-lg max-sm:items-start text-2xl mt-26'

	return {
		trackGroup,
		trackSubtitleGroup,
		trackSubtitle,
		trackSubtitleInfo,
		trackButtonGroup,
		trackSubtitleButtonGroup
	}
} 
