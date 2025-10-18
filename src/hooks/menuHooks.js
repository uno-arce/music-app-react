import useComponentStore from '../stores/componentStore'

const useMenu = () => {
	const componentStore = useComponentStore()

	const trackMenuList = [
		{
			activeCategoryKey: 'recentlyPlayed',
			label: 'Recently Played' 
		},
		{
			activeCategoryKey: 'mostlyListened',
			label: 'Mostly Listened'
		},
		{
			activeCategoryKey: 'mostlyPlayed',
			label: 'Mostly Played'
		},
		{
			activeCategoryKey: 'savedTracks',
			label: 'Saved Tracks'
		},
		{
			activeCategoryKey: 'ratedTracks',
			label: 'Rated Tracks'
		},
		{
			activeCategoryKey: 'playlists',
			label: 'Playlists'
		}
	]

	const handleSelectMenuCategory = (category) => {
		componentStore.setSelectedMenuCategory(category.activeCategoryKey)
		componentStore.setCollectionSelectedIndex(0)

		console.log('Active category: ', category.activeCategoryKey)
	}

	return {
		trackMenuList,
		handleSelectMenuCategory
	}
}

export default useMenu