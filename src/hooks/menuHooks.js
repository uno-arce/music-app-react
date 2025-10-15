import useComponentStore from '../stores/componentStore'

const useMenu = () => {
	const componentStore = useComponentStore()

	const trackMenuList = [
		'Recently Played',
		'Mostly Listened',
		'Mostly Played',
		'Saved Tracks',
		'Rated Tracks',
		'Playlists'
	]

	const handleSelectMenuCategory = (category) => {
		componentStore.setSelectedMenuCategory(category)
	}

	return {
		trackMenuList,
		handleSelectMenuCategory
	}
}

export default useMenu