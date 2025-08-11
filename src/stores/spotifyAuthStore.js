import { create } from 'zustand'

const useSpotifyAuthStore = create((set) => ({
	isAuthorized: false,
	isTokenExpired: true,


	setIsAuthorized: (authorization) => set({ isAuthorized: authorization }),
	setIsTokenExpired: (expiration) => set({ isTokenExpired: expiration }),
}))

export default useSpotifyAuthStore