import React from "react"

type ShippingResultsProps = {
    slas: any[]
    handles: Record<string, string>
}

const formatShippingEstimate = (estimate: string) => {
    const days = parseInt(estimate, 10)

    if (days === 0) return "Disponible para entrega en el día"
    if (days === 1) return "Disponible para entrega mañana"

    return `Hasta ${days} días hábiles`
}

const ShippingResults: React.FC<ShippingResultsProps> = ({ slas, handles }) => {
    const deliverySlas = slas.filter(
        (sla: any) => sla.deliveryChannel === "delivery"
    )

    const pickupSlas = slas.filter(
        (sla: any) => sla.deliveryChannel === "pickup-in-point"
    )

    return (
        <div className={handles.shippingSimulatorResults}>
            <table className={handles.shippingSimulatorTable}>
                <thead>
                    <tr>
                        <th>Tipo de envío</th>
                        <th>Tiempo estimado</th>
                        <th>Costo</th>
                    </tr>
                </thead>

                <tbody>
                    {deliverySlas.length > 0 && (
                        <>
                            <tr>
                                <td
                                    colSpan={3}
                                    className={handles.shippingSimulatorGroupTitle}
                                >
                                    <div className={handles.shippingSimulatorGroupTitleDelivery}>
                                        Envío a domicilio
                                    </div>
                                </td>
                            </tr>

                            {deliverySlas.map((sla: any) => (
                                <tr key={sla.id}>
                                    <td className={handles.shippingSimulatorResultType}>
                                        {sla.name || sla.id}
                                    </td>

                                    <td className={handles.shippingSimulatorResultTime}>
                                        {formatShippingEstimate(sla.shippingEstimate)}
                                    </td>

                                    <td className={handles.shippingSimulatorResultPrice}>
                                        ${(sla.price / 100).toLocaleString("es-AR")}
                                    </td>
                                </tr>
                            ))}
                        </>
                    )}

                    {pickupSlas.length > 0 && (
                        <>
                            <tr>
                                <td
                                    colSpan={3}
                                    className={handles.shippingSimulatorGroupTitle}
                                >
                                    <div className={handles.shippingSimulatorGroupTitlePickup}>
                                        Punto de retiro
                                    </div>
                                </td>
                            </tr>

                            {pickupSlas.map((sla: any) => (
                                <tr key={sla.id}>
                                    <td className={handles.shippingSimulatorResultType}>
                                        {sla.name || sla.id}
                                    </td>

                                    <td className={handles.shippingSimulatorResultTime}>
                                        {formatShippingEstimate(sla.shippingEstimate)}
                                    </td>

                                    <td className={handles.shippingSimulatorResultPrice}>
                                        ${(sla.price / 100).toLocaleString("es-AR")}
                                    </td>
                                </tr>
                            ))}
                        </>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ShippingResults