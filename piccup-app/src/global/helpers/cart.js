export const addToCart = (order) => {
  let currentOrder = getOrder()
  currentOrder.push(order)
  saveOrder(currentOrder)
}



const saveOrder = (order) => {
  localStorage.setItem('order', JSON.stringify(order))
}

export const changeQuantity = (amount, idx) => {
  let currentOrder = getOrder()
  const newAmount = currentOrder[idx].quantity + amount
  if(newAmount < 1) {return}
  currentOrder[idx].quantity = newAmount
  saveOrder(currentOrder)
}

export const deleteOrder = (idx) => {
  let currentOrder = getOrder()
  currentOrder.splice(idx, 1)
  saveOrder(currentOrder)
}

export const getOrder = () => {
  let currentOrder = localStorage.getItem('order')
  if (currentOrder === null) {
    currentOrder = '[]'
  }
  try {
    currentOrder = JSON.parse(currentOrder)
  } catch (err) {
    currentOrder = []
  }
  return currentOrder
}

export const clearOrders = () => {
  saveOrder([])
}