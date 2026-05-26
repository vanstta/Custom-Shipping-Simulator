import React, { useState } from "react"
import { useCssHandles } from "vtex.css-handles"
import "./styles.css"

import { useShippingSimulation } from "../../hooks/useShippingSimulation"
import ShippingResults from "./ShippingResults"

const CSS_HANDLES = [
  "shippingSimulatorTrigger",
  "shippingSimulatorOverlay",
  "shippingSimulatorModal",
  "shippingSimulatorHeader",
  "shippingSimulatorClose",
  "shippingSimulatorTitle",
  "shippingSimulatorContent",
  "shippingSimulatorForm",
  "shippingSimulatorLabel",
  "shippingSimulatorInputWrapper",
  "shippingSimulatorInput",
  "shippingSimulatorSubmit",
  "shippingSimulatorUnknownPostalCode",
  "shippingSimulatorError",
  "shippingSimulatorResults",
  "shippingSimulatorResultType",
  "shippingSimulatorResultTime",
  "shippingSimulatorResultPrice",
  "shippingSimulatorTable",
  "shippingSimulatorGroupTitle",
  "shippingSimulatorGroupTitleDelivery",
  "shippingSimulatorGroupTitlePickup"
] as const

const CustomShippingSimulator: React.FC = () => {
  const handles = useCssHandles(CSS_HANDLES)

  const [isOpen, setIsOpen] = useState(false)
  const [postalCode, setPostalCode] = useState("")

  const { loading, simulation, error, runSimulation } =
    useShippingSimulation()

  const slas = simulation?.logisticsInfo?.[0]?.slas || []

  const handleSubmit = async () => {
    await runSimulation({
      items: [
        {
          id: "1222222558",
          quantity: 1,
          seller: "1",
        },
      ],
      postalCode,
      country: "ARG",
    })
  }

  return (
    <>
      <button
        type="button"
        className={handles.shippingSimulatorTrigger}
        onClick={() => setIsOpen(true)}
      >
        Calcular costo de envío
      </button>

      {isOpen && (
        <div
          className={handles.shippingSimulatorOverlay}
          onClick={() => setIsOpen(false)}
        >
          <div
            className={handles.shippingSimulatorModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={handles.shippingSimulatorHeader}>
              <span className={handles.shippingSimulatorTitle}>
                Calcular el costo de envío
              </span>

              <button
                type="button"
                className={handles.shippingSimulatorClose}
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>

            <div className={handles.shippingSimulatorContent}>
              {!slas.length && (
                <form
                  className={handles.shippingSimulatorForm}
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                  }}
                >
                  <label
                    className={handles.shippingSimulatorLabel}
                    htmlFor="postalCode"
                  >
                    Ingresa el código postal
                  </label>

                  <div className={handles.shippingSimulatorInputWrapper}>
                    <input
                      id="postalCode"
                      type="text"
                      className={handles.shippingSimulatorInput}
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="Código Postal"
                    />

                    <button
                      type="submit"
                      className={handles.shippingSimulatorSubmit}
                      disabled={loading || !postalCode}
                    >
                      {loading ? "Calculando..." : "Calcular envío"}
                    </button>
                  </div>

                  <a
                    href="https://www.correoargentino.com.ar/formularios/cpa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={handles.shippingSimulatorUnknownPostalCode}
                  >
                    No sé mi código postal
                  </a>
                </form>
              )}

              {error && (
                <p className={handles.shippingSimulatorError}>
                  {error}
                </p>
              )}

              {slas.length > 0 && (
                <ShippingResults
                  slas={slas}
                  handles={handles}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CustomShippingSimulator