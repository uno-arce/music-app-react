import useComponentStore from '../stores/componentStore'

const useCollection = () => {
	const componentStore = useComponentStore()

	let collectionSelectedGroup = componentStore.collectionSelectedGroup

	const handleOpenCollectionView = (item, index, isSelectable) => {
		if(!isSelectable) {
			return
		}

		componentStore.setCollectionSelectedIndex(index)
		componentStore.setCollectionItem(item)
		componentStore.setIsCollectionOpen(true)
	}

	const handlePreviousCollectionGroup = () => {
		if(collectionSelectedGroup == 1) {
			return
		}

		componentStore.setCollectionSelectedGroup(collectionSelectedGroup - 1)
		componentStore.setCollectionSelectedIndex(0)
	}

	const handleNextCollectionGroup = (collection) => {
		const collectionGroupLength = Object.keys(collection).length
		if(collectionSelectedGroup == collectionGroupLength) {
			return
		}

		componentStore.setCollectionSelectedGroup(collectionSelectedGroup + 1)
		componentStore.setCollectionSelectedIndex(0)
	}

	return {
		handleOpenCollectionView,
		handlePreviousCollectionGroup,
		handleNextCollectionGroup,
		isCollectionOpen: componentStore.isCollectionOpen,
		collectionSelectedIndex: componentStore.collectionSelectedIndex
	}
}

export default useCollection