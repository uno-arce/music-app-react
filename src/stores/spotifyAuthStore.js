import { create } from 'zustand'

const useSpotifyAuthStore = create((set) => ({
	isAuthorized: false,
	isTokenExpired: true,

	setAccessToken: (accessToken) => set({ accessToken: accessToken }),
	setRefreshToken: (refreshToken) => set({ refreshToken: refreshToken }),
}))

export default useSpotifyAuthStore