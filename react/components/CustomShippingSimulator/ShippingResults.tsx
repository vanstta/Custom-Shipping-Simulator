import React from "react"
import { useIntl } from "react-intl"

type ShippingResultsProps = {
  slas: any[]
  handles: Record<string, string>
}

const ShippingResults: React.FC<ShippingResultsProps> = ({
  slas,
  handles,
}) => {
  const intl = useIntl()

  const formatShippingEstimate = (estimate: string) => {
    const days = parseInt(estimate, 10)

    if (days === 0) {
      return intl.formatMessage({
        id: "store/shipping.sameDay",
      })
    }

    if (days === 1) {
      return intl.formatMessage({
        id: "store/shipping.nextDay",
      })
    }

    return intl.formatMessage(
      {
        id: "store/shipping.untilDays",
      },
      {
        days,
      }
    )
  }

  const formatPrice = (price: number) => {
    if (price === 0) {
      return intl.formatMessage({
        id: "store/shipping.free",
      })
    }

    return `$${(price / 100).toLocaleString("es-AR")}`
  }

  const renderRows = (items: any[]) => {
    return items.map((sla: any) => (
      <tr key={sla.id}>
        <td className={handles.shippingSimulatorResultType}>
          {sla.name || sla.id}
        </td>

        <td className={handles.shippingSimulatorResultTime}>
          {formatShippingEstimate(sla.shippingEstimate)}
        </td>

        <td className={handles.shippingSimulatorResultPrice}>
          {formatPrice(sla.price)}
        </td>
      </tr>
    ))
  }

  const deliverySlas = slas.filter(
    (sla: any) => sla.deliveryChannel === "delivery"
  )

  const pickupSlas = slas.filter(
    (sla: any) => sla.deliveryChannel === "pickup-in-point"
  )

  return (
    <div className={handles.shippingSimulatorResults}>
      {deliverySlas.length > 0 && (
        <table className={handles.shippingSimulatorTable}>
          <colgroup>
            <col className={handles.shippingSimulatorColumnType} />
            <col className={handles.shippingSimulatorColumnTime} />
            <col className={handles.shippingSimulatorColumnPrice} />
          </colgroup>

          <thead>
            <tr>
              <th>
                {intl.formatMessage({
                  id: "store/shipping.table.type",
                })}
              </th>

              <th>
                {intl.formatMessage({
                  id: "store/shipping.table.time",
                })}
              </th>

              <th>
                {intl.formatMessage({
                  id: "store/shipping.table.price",
                })}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td
                colSpan={3}
                className={handles.shippingSimulatorGroupTitle}
              >
                <div
                  className={
                    handles.shippingSimulatorGroupTitleDelivery
                  }
                >
                  {intl.formatMessage({
                    id: "store/shipping.group.delivery",
                  })}
                </div>
              </td>
            </tr>

            {renderRows(deliverySlas)}
          </tbody>
        </table>
      )}

      {pickupSlas.length > 0 && (
        <table className={handles.shippingSimulatorTable}>
          <colgroup>
            <col className={handles.shippingSimulatorColumnType} />
            <col className={handles.shippingSimulatorColumnTime} />
            <col className={handles.shippingSimulatorColumnPrice} />
          </colgroup>

          <tbody>
            <tr>
              <td
                colSpan={3}
                className={handles.shippingSimulatorGroupTitle}
              >
                <div
                  className={
                    handles.shippingSimulatorGroupTitlePickup
                  }
                >
                  {intl.formatMessage({
                    id: "store/shipping.group.pickup",
                  })}
                </div>
              </td>
            </tr>

            {renderRows(pickupSlas)}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ShippingResults