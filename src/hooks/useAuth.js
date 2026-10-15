import { useState } from 'react'

const ACCOUNTS_KEY = 'beauty-store-accounts'
const SESSION_KEY = 'beauty-store-session'

function readStoredValue(key, fallback) {
  try {
    return JSON.parse(window.localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

export function useAuth() {
  const [user, setUser] = useState(() => readStoredValue(SESSION_KEY, null))

  const register = ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()
    const accounts = readStoredValue(ACCOUNTS_KEY, [])

    if (accounts.some((account) => account.email === normalizedEmail)) {
      return { error: 'Ya existe una cuenta con este correo.' }
    }

    const account = { name: name.trim(), email: normalizedEmail, password }
    const session = { name: account.name, email: account.email }
    window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]))
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
    return { user: session }
  }

  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()
    const accounts = readStoredValue(ACCOUNTS_KEY, [])
    const account = accounts.find(
      (storedAccount) => storedAccount.email === normalizedEmail && storedAccount.password === password,
    )

    if (!account) return { error: 'El correo o la contraseña no son correctos.' }

    const session = { name: account.name, email: account.email }
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
    return { user: session }
  }

  const logout = () => {
    window.localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  return { user, register, login, logout }
}
