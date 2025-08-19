import { create } from 'zustand'

const useSpotifyAuthStore = create((set) => ({
	isAuthorized: false,
	isTokenExpired: true,
	isAuthLoading: true,


	setIsAuthorized: (authorization) => set({ isAuthorized: authorization }),
	setIsTokenExpired: (expiration) => set({ isTokenExpired: expiration }),
	setIsAuthLoading: (loading) => set({ isAuthLoading: loading })
}))

export default useSpotifyAuthStore