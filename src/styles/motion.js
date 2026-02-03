
// 1. Container Staggers
export const staggerContainer = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2
		}
	}
}


// 2. Item Entrances
export const slideInLeft = {
	hidden: { opacity: 0, x: -20 },
	show: {
		opacity: 1,
		x: 0,
		transition: { type: 'spring', stiffness: 260, damping: 20 }
	}
}

export const slideInRight = {
	hidden: { opacity: 0, x: 20 },
	show: {
		opacity: 1,
		x: 0,
		transition: { type: 'spring', stiffness: 260, damping: 20 }
	}
}

export const slideInTop = {
	hidden: { opacity: 0, y: -20 },
	show: {
		opacity: 1,
		y: 0,
		transition: { type: 'spring', stiffness: 260, damping: 20 }
	}
}

export const slideInBottom = {
	hidden: { opacity: 0, y: 20 },
	show: {
		opacity: 1,
		y: 0,
		transition: { type: 'spring', stiffness: 260, damping: 20 }
	}
}

export const fadeInLeft = {
	hidden: { opacity: 0, x: -20 },
	show: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.5 }
	 }
}

export const fadeInRight = {
	hidden: { opacity: 0, x: 20 },
	show: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.5 }
	 }
}

export const fadeInTop = {
	hidden: { opacity: 0, y: -20 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5 }
	 }
}

export const fadeInBottom = {
	hidden: { opacity: 0, y: 20 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5 }
	 }
}

// 3. Hover & Tap Micro-interaction
export const clickScale = {
	whileHover: { scale: 1.02 },
	whileTap: { scale: 0.98 }
}

// 4. Layout Transitions 
export const springTransition = {
	type: 'spring',
	stiffness: 360,
	damping: 30
}