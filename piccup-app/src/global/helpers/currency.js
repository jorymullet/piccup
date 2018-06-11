export const toDollars = (amount) => {
  const dollars = Math.floor( amount / 100 )
  let cents = amount % 100
  cents = cents < 10 ? '0' + cents : cents
  return '$' + dollars + '.' + cents
}

export const getOrdersTotal = (orders) => {
  if(!orders.length) return 0
  return orders.map((order) => {
    return (order.variation.amount +
      (order.modifiers.length ? order.modifiers.map((modif) => modif.amount).reduce((a,b) => a + b) : 0))
      * order.quantity
  }).reduce((a,b) => a + b)
}

export const getOrdersCount = (orders) => {
  if(!orders.length) return 0
  return orders.map((order) => order.quantity).reduce((a,b) => a + b)
}