import useComponentStore from '../stores/componentStore'

const useRating = () => {
	const componentStore = useComponentStore()

	const handleHoverRating = (index) => {
		componentStore.setHoveredIndex(index)
	}

	const handleLeaveRating = () => {
		componentStore.setHoveredIndex(-1)
	}

	const handleRatingPath = (index) => {
		const filledPath = "m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z";
		const emptyPath = "m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z";

		return index <= componentStore.hoveredIndex > 0 ? filledPath : emptyPath
	}

	const handleRatingSubmit = async (call) => {
		await call()
	}

	return {
		handleHoverRating,
		handleLeaveRating,
		handleRatingPath,
		handleRatingSubmit
	}
}

export default useRating