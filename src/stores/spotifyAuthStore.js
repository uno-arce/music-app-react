import { create } from 'zustand'

const useSpotifyAuthStore = create((set) => ({
	isAuthorized: false,
	isTokenExpired: true,

	setIsAuthorized: (authorized) => set({ isAuthorized: authorized }),
	setIsTokenExpired: (expiration) => set({ isTokenExpired: expiration })
}))