# Shipping Simulator

Custom VTEX IO app that allows users to simulate shipping options directly from the PDP using their postal code.

The app retrieves available logistics options for the selected SKU and displays information such as:

- Shipping type
- Estimated delivery time
- Price
- Pickup points
- Custom empty state messages


## Installation

```bash
vtex install piercecommercepartnerar.custom-shipping-simulator@0.x
```



Then include it in the product template:

## Example

```json 
 "flex-layout.col#right-col": {
    "props": {
      "preventVerticalStretch": true,
      "rowGap": 0
    },
    "children": [
      "flex-layout.row#product-name",
      "product-rating-summary",
      "flex-layout.row#list-price-savings",
      "flex-layout.row#selling-price",
      "product-installments",
      "product-separator",
      "product-identifier.product",
      "sku-selector",
      "product-quantity",
      "product-assembly-options",
      "product-gifts",
      "flex-layout.row#buy-button",
      "custom-shipping-simulator",
      "availability-subscriber",
      "share#default"
    ]
  },

```

## Behavior

- The simulator automatically detects the selected SKU.
- When the product variant changes, the simulation runs again automatically.
- If no SLAs are configured, an empty state message is displayed.

## Styling

The app supports customization through CSS Handles.



## Notes

- Shipping simulation depends on the SKU logistics configuration.
- If the product has no available SLAs, no shipping methods will be displayed.
```