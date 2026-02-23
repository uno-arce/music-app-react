import { useRatingData, usePopoverData, useRatingActions } from '../stores/componentStore'

const useRating = () => {
	const ratingData = useRatingData()
	const actionsRating = useRatingActions()
	const popoverData = usePopoverData()

	const handleHoverRating = (index) => {
		actionsRating.setHoveredIndex(index)
		actionsRating.setClickedIndex(-1)
	}

	const handleLeaveRating = () => {
		const lastClickedIndex = ratingData.lastClickedIndex

		actionsRating.setHoveredIndex(-1)
		actionsRating.setClickedIndex(lastClickedIndex)
	}

	const handleRatingPath = (index) => {
		const filledPath = "m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z";
		const emptyPath = "m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z";

		const activeIndex = ratingData.clickedIndex !== -1 ? ratingData.clickedIndex : ratingData.hoveredIndex

		return index <= activeIndex > 0 ? filledPath : emptyPath
	}

	const handleCloseRating = () => {
		actionsRating.resetRatingState()
	}

	const handleRatingSubmit = async (index, call) => {
		actionsRating.setClickedIndex(index)
		actionsRating.setLastClickedIndex(index)
		const item = popoverData.popoverItem

		const track = {
			track: item.track,
			image: item.image,
			album: item.album,
			artist: item.artist,
			reference: item.reference,
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
		lastClickedIndex: ratingData.lastClickedIndex
	}
}

export default useRating