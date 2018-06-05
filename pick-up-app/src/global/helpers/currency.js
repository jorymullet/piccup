export const toDollars = (amount) => {
  const dollars = Math.floor( amount / 100 )
  let cents = amount % 100
  cents = cents < 10 ? '0' + cents : cents
  return '$' + dollars + '.' + cents
}