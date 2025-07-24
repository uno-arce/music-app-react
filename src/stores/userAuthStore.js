import { create } from 'zustand'

const userAuthStore = create((set) => ({
	username: null,
	email: null,
	password: null,
	isAuthenticated: false,

	setUsername: (username) => ({ username: username }),
	setEmail: (email) => ({ email: email }),
	setPassword: (password) => ({ password: password }),
	setIsAuthenticated: (status) => ({ isAuthenticated: status })
}))

export default userAuthStore