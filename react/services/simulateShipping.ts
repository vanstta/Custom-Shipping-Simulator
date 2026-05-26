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

export async function simulateShipping(body: SimulationBody) {
  const response = await fetch("/api/checkout/pub/orderForms/simulation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error("Error simulating shipping")
  }

  return response.json()
}