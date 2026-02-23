import { useMenuData, useMenuActions, useCollectionActions } from '../stores/componentStore'

const useMenu = () => {
	const menuData = useMenuData()
	const actionsMenu = useMenuActions()
	const actionsCollection = useCollectionActions()

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
		actionsMenu.setSelectedMenuCategory(category.activeCategoryKey)
		actionsMenu.setSelectedMenuLabel(category.label)
		actionsCollection.setCollectionSelectedIndex(0)
		actionsCollection.setCollectionSelectedGroup(1)
	}

	return {
		trackMenuList,
		handleSelectMenuCategory,
		selectedMenuCategory: menuData.selectedMenuCategory,
		selectedMenuLabel: menuData.selectedMenuLabel
	}
}

export default useMenu