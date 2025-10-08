import useComponentStore from '../stores/componentStore'

const useCollection = () => {
	const componentStore = useComponentStore()

	const handleOpenCollectionView = (item, index, isSelectable) => {
		if(!isSelectable) {
			return
		}

		componentStore.setCollectionSelectedIndex(index)
		componentStore.setCollectionItem(item)
		componentStore.setIsCollectionOpen(true)
	}

	return {
		handleOpenCollectionView,
		isCollectionOpen: componentStore.isCollectionOpen,
		collectionSelectedIndex: componentStore.collectionSelectedIndex
	}
}

export default useCollection