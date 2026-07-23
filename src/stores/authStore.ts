import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {

  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<any | null>(JSON.parse(localStorage.getItem('user') || 'null'))
  const savedUsersKey = 'registeredUsers'

  const isLoggedIn = computed(() => Boolean(token.value))

  const getSavedUsers = () => {
    return JSON.parse(localStorage.getItem(savedUsersKey) || '[]')
  }

  const saveRegisteredUser = (registeredUser: any) => {
    const users = getSavedUsers()
    const existingIndex = users.findIndex((item: any) => item.username.toLowerCase() === registeredUser.username.toLowerCase())

    if (existingIndex >= 0) {
      users[existingIndex] = registeredUser
    } else {
      users.push(registeredUser)
    }

    localStorage.setItem(savedUsersKey, JSON.stringify(users))
  }

  const login = async (username: string, password: string) => {
    const savedUser = getSavedUsers().find((item: any) => item.username.toLowerCase() === username.toLowerCase())

    if (savedUser) {
      if (savedUser.password !== password) throw new Error('Invalid credentials')

      const authToken = 'local-login-token-' + savedUser.id
      token.value = authToken
      user.value = savedUser
      localStorage.setItem('token', authToken)
      localStorage.setItem('user', JSON.stringify(savedUser))
      return
    }

    const response = await fetch('https://dummyjson.com/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, expiresInMins: 30 })
    })

    if (!response.ok) throw new Error('Invalid credentials')

    const data = await response.json()
    saveRegisteredUser({ ...data, password })

    const authToken = data.accessToken || data.token
    if (!authToken) throw new Error('Login token missing')

    token.value = authToken
    user.value = data
    localStorage.setItem('token', authToken)
    localStorage.setItem('user', JSON.stringify(data))
  }

  const signup = async (firstName: string, lastName: string, username: string, password: string) => {
    const response = await fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, username, password })
    })

    if (!response.ok) throw new Error('Signup failed')

    const data = await response.json()
    const registeredUser = { ...data, firstName, lastName, username, password }

    saveRegisteredUser(registeredUser)
    user.value = registeredUser
    token.value = 'signup-token-' + data.id
    localStorage.setItem('token', token.value)
    localStorage.setItem('user', JSON.stringify(registeredUser))
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return { token, user, isLoggedIn, login, signup, logout }
})
