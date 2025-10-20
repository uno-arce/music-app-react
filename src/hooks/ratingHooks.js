import useComponentStore from '../stores/componentStore'

const useRating = () => {
	const componentStore = useComponentStore()

	const handleHoverRating = (index) => {
		componentStore.setHoveredIndex(index)
		componentStore.setClickedIndex(-1)
	}

	const handleLeaveRating = () => {
		const lastClickedIndex = componentStore.lastClickedIndex

		componentStore.setHoveredIndex(-1)
		componentStore.setClickedIndex(lastClickedIndex)
	}

	const handleRatingPath = (index) => {
		const filledPath = "m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z";
		const emptyPath = "m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z";

		const activeIndex = componentStore.clickedIndex !== -1 ? componentStore.clickedIndex : componentStore.hoveredIndex

		return index <= activeIndex > 0 ? filledPath : emptyPath
	}

	const handleCloseRating = () => {
		componentStore.resetRatingState()
	}

	const handleRatingSubmit = async (index, call) => {
		componentStore.setClickedIndex(index)
		componentStore.setLastClickedIndex(index)
		const item = componentStore.popoverItem

		const track = {
			name: item.track,
			artist: item.artist,
			rating: index
		}

		await call(track)
	}

	return {
		handleHoverRating,
		handleLeaveRating,
		handleRatingPath,
		handleCloseRating,
		handleRatingSubmit,
		lastClickedIndex: componentStore.lastClickedIndex
	}
}

export default useRating