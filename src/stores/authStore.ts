import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {

  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<any | null>(JSON.parse(localStorage.getItem('user') || 'null'))

  const isLoggedIn = computed(() => token.value !== null)

  const login = async (username: string, password: string) => {
    const response = await fetch('https://dummyjson.com/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, expiresInMins: 30 })
    })

    if (!response.ok) throw new Error('Invalid credentials')

    const data = await response.json()
    token.value = data.token
    user.value = data
    localStorage.setItem('token', data.token)
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
    user.value = data
    token.value = 'signup-token-' + data.id
    localStorage.setItem('token', token.value)
    localStorage.setItem('user', JSON.stringify(data))
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return { token, user, isLoggedIn, login, signup, logout }
})