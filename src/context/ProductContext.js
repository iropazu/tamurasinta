import React, { createContext, useState } from 'react'

// Contextの作成
export const ProductContext = createContext()

// Providerの作成
export const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState(null)

  return (
    <ProductContext.Provider value={{ productData, setProductData }}>
      {children}
    </ProductContext.Provider>
  )
}
