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
			activeCategoryKey: 'likedTracks',
			label: 'Liked Tracks'
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
		componentStore.setSelectedMenuLabel(category.label)
		componentStore.setCollectionSelectedIndex(0)
		componentStore.setCollectionSelectedGroup(1)

		console.log('Active category: ', category.activeCategoryKey)
	}

	return {
		trackMenuList,
		handleSelectMenuCategory,
		selectedMenuCategory: componentStore.selectedMenuCategory,
		selectedMenuLabel: componentStore.selectedMenuLabel
	}
}

export default useMenu