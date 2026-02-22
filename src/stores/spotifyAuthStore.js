import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useSpotifyAuthStore = create((set) => ({
	isAuthorized: false,
	isTokenExpired: true,
	isAuthLoading: true,


	actions: {
		setIsAuthorized: (authorization) => set({ isAuthorized: authorization }),
		setIsTokenExpired: (expiration) => set({ isTokenExpired: expiration }),
		setIsAuthLoading: (loading) => set({ isAuthLoading: loading })
	}
}))

export default useSpotifyAuthStore


export const useSpotifyAuthData = () => useSpotifyAuthStore(useShallow((state) => {
	return {
		isAuthorized: state.isAuthorized,
		isTokenExpired: state.isTokenExpired,
		isAuthLoading: state.isAuthLoading
	}
}))

export const useSpotifyAuthActions = () => useSpotifyAuthStore((state) => state.actions)