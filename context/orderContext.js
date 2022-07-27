import { createContext, useContext, useState } from "react"

const orderContext = createContext()

export default function OrderProvider({ children }) {
  const [user, setUser] = useState({ name: 'Guest' })

  return <orderContext.Provider value={{ user, setUser }}>{children}</orderContext.Provider>;
}

export function useOrderContext() {
  return useContext(orderContext)
}