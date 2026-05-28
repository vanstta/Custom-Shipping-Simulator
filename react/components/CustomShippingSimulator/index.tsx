import React, { useState } from "react"
import { useIntl } from "react-intl"
import { useCssHandles } from "vtex.css-handles"
import { useProduct } from "vtex.product-context"
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
  "shippingSimulatorGroupTitlePickup",
  "shippingSimulator",
  "shippingSimulatorColumnType",
  "shippingSimulatorColumnTime",
  "shippingSimulatorColumnPrice",
] as const

const CustomShippingSimulator: React.FC = () => {
  const intl = useIntl()

  const handles = useCssHandles(CSS_HANDLES)
  const productContext = useProduct()

  const [isOpen, setIsOpen] = useState(false)
  const [postalCode, setPostalCode] = useState("")

  const { loading, simulation, error, runSimulation, resetSimulation } =
    useShippingSimulation()

  const selectedItem = productContext?.selectedItem
  const seller = selectedItem?.sellers?.[0]

  const slas = simulation?.logisticsInfo?.[0]?.slas || []
  const hasSimulation = simulation !== null

  const handleClose = () => {
    setIsOpen(false)
    setPostalCode("")
    resetSimulation()
  }

  const handleSubmit = async () => {
    if (!selectedItem?.itemId || !seller?.sellerId) {
      return
    }

    try {
      await runSimulation({
        items: [
          {
            id: selectedItem.itemId,
            quantity: 1,
            seller: seller.sellerId,
          },
        ],
        postalCode,
        country: "ARG",
      })
    } catch (err) {
      console.error("shipping simulation error", err)
    }
  }

  return (
    <>
      <button
        type="button"
        className={handles.shippingSimulatorTrigger}
        onClick={() => setIsOpen(true)}
      >
        {intl.formatMessage({
          id: "store/shipping.trigger",
        })}
      </button>

      {isOpen && (
        <div
          className={handles.shippingSimulatorOverlay}
          onClick={handleClose}
        >
          <div
            className={handles.shippingSimulatorModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={handles.shippingSimulatorHeader}>
              <span className={handles.shippingSimulatorTitle}>
                {intl.formatMessage({
                  id: "store/shipping.modal.title",
                })}
              </span>

              <button
                type="button"
                className={handles.shippingSimulatorClose}
                onClick={handleClose}
              >
                ×
              </button>
            </div>

            <div className={handles.shippingSimulatorContent}>
           {slas.length === 0 && (
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
                    {intl.formatMessage({
                      id: "store/shipping.input.label",
                    })}
                  </label>

                  <div className={handles.shippingSimulatorInputWrapper}>
                    <input
                      id="postalCode"
                      type="text"
                      className={handles.shippingSimulatorInput}
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder={intl.formatMessage({
                        id: "store/shipping.input.placeholder",
                      })}
                    />

                    <button
                      type="submit"
                      className={handles.shippingSimulatorSubmit}
                      disabled={
                        loading ||
                        !postalCode ||
                        !selectedItem?.itemId
                      }
                    >
                      {loading
                        ? intl.formatMessage({
                            id: "store/shipping.submit.loading",
                          })
                        : intl.formatMessage({
                            id: "store/shipping.submit.default",
                          })}
                    </button>
                  </div>

                  <a
                    href="https://www.correoargentino.com.ar/formularios/cpa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      handles.shippingSimulatorUnknownPostalCode
                    }
                  >
                    {intl.formatMessage({
                      id: "store/shipping.help.postalCode",
                    })}
                  </a>
                    {error && (
                <p className={handles.shippingSimulatorError}>
                  {intl.formatMessage({
                    id: "store/shipping.error.default",
                  })}
                </p>
              )}

              {hasSimulation && !slas.length && !error && (
                <p className={handles.shippingSimulatorError}>
                  No hay opciones de entrega disponibles para esta ubicación.
                </p>
              )}

                </form>
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