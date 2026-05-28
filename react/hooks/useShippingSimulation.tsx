import { useState } from "react"
import { simulateShipping } from "../services/simulateShipping"

type SimulationItem = {
  id: string
  quantity: number
  seller: string
}

type SimulationBody = {
  items: SimulationItem[]
  postalCode: string
  country: string
}

export function useShippingSimulation() {
  const [loading, setLoading] = useState(false)
  const [simulation, setSimulation] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const runSimulation = async (body: SimulationBody) => {
    try {
      setLoading(true)
      setError(null)

      const data = await simulateShipping(body)

      setSimulation(data)

      return data
    } catch (err) {
      console.error("shipping simulation error", {
        body,
        err,
      })

      setError("Error simulating shipping")

      return null
    } finally {
      setLoading(false)
    }
  }

  const resetSimulation = () => {
    setSimulation(null)
    setError(null)
  }

  return {
    loading,
    simulation,
    error,
    runSimulation,
    resetSimulation,
  }
}