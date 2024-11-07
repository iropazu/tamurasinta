import React, { createContext, useState } from 'react'

// Contextの作成
export const UserContext = createContext()

// Providerの作成
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}
